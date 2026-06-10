// ==============================
// SCRIPT PRINCIPAL - CONHEÇA BH
// ==============================

document.addEventListener("DOMContentLoaded", function () {

  // ==============================
  // USUÁRIO
  // ==============================
  const areaUsuario = document.getElementById("areaUsuario");

  function getUsuario() {
    try {
      return JSON.parse(sessionStorage.getItem("usuarioCorrente"));
    } catch {
      return null;
    }
  }

  function renderUsuario() {

    const usuario = getUsuario();

    console.log(JSON.stringify(usuario));

    console.log("Admin:", usuario?.admin);

    const secaoCadastro = document.getElementById("cadastro");

if (secaoCadastro) {
  secaoCadastro.style.display =
   usuario ? "block" : "none";
}

    if (!areaUsuario) return;

    if (usuario) {

      areaUsuario.innerHTML = `
        <span>Olá, ${usuario.nome}</span> |
        <a href="#" id="btnSair">Sair</a>
      `;

      document.getElementById("btnSair")?.addEventListener("click", (e) => {
        e.preventDefault();
        sessionStorage.removeItem("usuarioCorrente");
        location.href = "index.html";
      });

    } else {

      areaUsuario.innerHTML = `
        <a href="modulos/login/index.html">Entrar</a>
      `;

    }
  }

  renderUsuario();

  // ==============================
  // DADOS INICIAIS
  // ==============================
  function inicializarDados() {

    if (!localStorage.getItem("locaisBH")) {
      const dadosIniciais = [
        { id: 1, nome: "Praça da Liberdade", descricao: "Centro cultural e histórico de BH", imagem: "assets/imagem/destaque1.png", categoria: "museu" },
        { id: 2, nome: "Parque das Mangabeiras", descricao: "Vista panorâmica da cidade", imagem: "assets/imagem/destaque2.png", categoria: "parque" },
        { id: 3, nome: "Feira Hippie", descricao: "Cultura e gastronomia", imagem: "assets/imagem/destaque3.png", categoria: "bar" }
      ];
      localStorage.setItem("locaisBH", JSON.stringify(dadosIniciais));
    }
  }

  inicializarDados();

  // ==============================
  // LOCAIS
  // ==============================
  window.getLocais = function () {
    return JSON.parse(localStorage.getItem("locaisBH") || "[]");
  };

  window.getUsuario = getUsuario;

  // ==============================
  // FAVORITOS
  // ==============================
  window.getFavoritos = function () {
    const usuario = getUsuario();
    if (!usuario) return [];

    return JSON.parse(localStorage.getItem(`favoritos_${usuario.id}`) || "[]");
  };

  window.salvarFavoritos = function (lista) {
    const usuario = getUsuario();
    if (!usuario) return;

    localStorage.setItem(`favoritos_${usuario.id}`, JSON.stringify(lista));
  };

  window.toggleFavorito = function (id) {

    const usuario = getUsuario();

    if (!usuario) {
      alert("Você precisa estar logado!");
      location.href = "modulos/login/index.html";
      return;
    }

    id = Number(id);

    let favoritos = window.getFavoritos();

    if (favoritos.includes(id)) {
      favoritos = favoritos.filter(f => f !== id);
    } else {
      favoritos.push(id);
    }

    window.salvarFavoritos(favoritos);

    window.carregarLocais();
    window.renderFavoritos();
  };

  // ==============================
  // CARDS DESTINOS
  // ==============================
  window.carregarLocais = function () {

    const container = document.getElementById("destinosContainer");

    if (!container) return;

    const locais = window.getLocais();
    const favoritos = window.getFavoritos();

    container.innerHTML = locais.map(local => {

      const fav = favoritos.includes(local.id);

      return `
        <div class="col-md-4 mb-3">

          <div
            class="card h-100 shadow-sm"
            style="cursor:pointer"
            onclick="abrirDetalhes(${local.id})">

            <img
              src="${local.imagem}"
              class="card-img-top"
              alt="${local.nome}">

            <div class="card-body text-center">

              <h5>${local.nome}</h5>

              <p>${local.descricao}</p>

              <button
                class="btn btn-sm ${fav ? 'btn-danger' : 'btn-outline-danger'}"
                onclick="event.stopPropagation(); toggleFavorito(${local.id})">

                ${fav ? '❤️ Favoritado' : '🤍 Favoritar'}

              </button>

            </div>

          </div>

        </div>
      `;

    }).join("");

  };

  document.addEventListener("DOMContentLoaded", function () {
  carregarLocais();
});


  // ==============================
// FAVORITOS PAGE
// ==============================
window.renderFavoritos = function () {

  const container = document.getElementById("favoritosContainer");
  if (!container) return;

  const usuario = getUsuario();

  if (!usuario) {
    container.innerHTML = "<p>Faça login para ver favoritos.</p>";
    return;
  }

  const favoritos = window.getFavoritos();
  const locais = window.getLocais();

  const filtrados = locais.filter(l => favoritos.includes(l.id));

  if (filtrados.length === 0) {
    container.innerHTML = "<p>Nenhum favorito ainda.</p>";
    return;
  }

  container.innerHTML = filtrados.map(local => `
    <div class="col-md-4 mb-3">
      <div class="card h-100 shadow-sm">

        <img src="${local.imagem}" class="card-img-top">

        <div class="card-body text-center">

          <h5>${local.nome}</h5>
          <p>${local.descricao}</p>

          <button class="btn btn-danger btn-sm"
            onclick="toggleFavorito(${local.id})">
            ❤️ Remover
          </button>

        </div>
      </div>
    </div>
  `).join("");
};


// ==============================
// INIT SEGURO
// ==============================
function initApp() {

  try {
    inicializarDados();
    window.carregarLocais();
    window.renderFavoritos();
  } catch (e) {
    console.warn("Erro no init:", e);
  }

}


// ==============================
// PESQUISA
// ==============================
window.pesquisarLocais = function () {

  let texto = document
    .getElementById("campoBusca")
    ?.value
    ?.toLowerCase()
    .trim();

  if (texto === "museus") texto = "museu";
  if (texto === "parques") texto = "parque";
  if (texto === "bares") texto = "bar";

  const locais = window.getLocais();

  if (!texto) {
    window.carregarLocais();
    return;
  }

  const filtrados = locais.filter(local =>
    local.nome.toLowerCase().includes(texto) ||
    local.descricao.toLowerCase().includes(texto) ||
    local.categoria.toLowerCase().includes(texto)
  );

  const container = document.getElementById("destinosContainer");
  if (!container) return;

  const favoritos = window.getFavoritos();

  if (filtrados.length === 0) {
    container.innerHTML = `<p class="text-center">Nenhum local encontrado.</p>`;
    return;
  }

  container.innerHTML = filtrados.map(local => {

    const fav = favoritos.includes(local.id);

    return `
      <div class="col-md-4 mb-3">
        <div class="card h-100 shadow-sm">

          <img src="${local.imagem}" class="card-img-top">

          <div class="card-body text-center">

            <h5>${local.nome}</h5>
            <p>${local.descricao}</p>

            <button
              class="btn btn-sm ${fav ? 'btn-danger' : 'btn-outline-danger'}"
              onclick="toggleFavorito(${local.id})">

              ${fav ? '❤️ Favoritado' : '🤍 Favoritar'}
            </button>

          </div>
        </div>
      </div>
    `;
  }).join("");
};


// ==============================
// EVENTOS (SEGUROS)
// ==============================
document.addEventListener("DOMContentLoaded", function () {

  const btnBuscar = document.getElementById("btnBuscar");
  const campoBusca = document.getElementById("campoBusca");

  btnBuscar?.addEventListener("click", window.pesquisarLocais);

  campoBusca?.addEventListener("keyup", function (e) {

    if (e.key === "Enter") {
      window.pesquisarLocais();
    }

    if (this.value.trim() === "") {
      window.carregarLocais();
    }

  });

});


// ==============================
// FILTRO POR CATEGORIA
// ==============================
window.filtrarCategoria = function (categoria) {

  const locais = window.getLocais();
  const favoritos = window.getFavoritos();

  const filtrados = locais.filter(local =>
    local.categoria === categoria
  );

  const container = document.getElementById("destinosContainer");
  if (!container) return;

  container.innerHTML = filtrados.map(local => {

    const fav = favoritos.includes(local.id);

    return `
      <div class="col-md-4 mb-3">

        <div class="card h-100 shadow-sm"
          style="cursor:pointer"
          onclick="abrirDetalhes(${local.id})">

          <img src="${local.imagem}" class="card-img-top">

          <div class="card-body text-center">

            <h5>${local.nome}</h5>
            <p>${local.descricao}</p>

            <button
              class="btn btn-sm ${fav ? 'btn-danger' : 'btn-outline-danger'}"
              onclick="event.stopPropagation(); toggleFavorito(${local.id})">

              ${fav ? '❤️ Favoritado' : '🤍 Favoritar'}
            </button>

          </div>
        </div>

      </div>
    `;
  }).join("");
};


// ==============================
// DETALHES
// ==============================
window.abrirDetalhes = function (id) {

  localStorage.setItem("localSelecionado", id);

  window.location.href = "modulos/detalhes/index.html";

};


// ==============================
// START
// ==============================
initApp();

});


// ==============================
// CADASTRO DE DESTINOS
// ==============================

const btnAdicionar = document.getElementById("btnAdicionar");

if (btnAdicionar) {

  btnAdicionar.addEventListener("click", () => {

    const nome = document.getElementById("novoNome").value.trim();
    const categoria = document.getElementById("novaCategoria").value;
    const bairro = document.getElementById("novoBairro").value.trim();

    if (!nome || !categoria || !bairro) {
      alert("Preencha todos os campos.");
      return;
    }

    const locais = window.getLocais();

    const novoLocal = {
      id: Date.now(),
      nome: nome,
      descricao: `Local turístico em ${bairro}`,
      categoria: categoria,
      imagem: "assets/imagem/destaque1.png"
    };

    locais.push(novoLocal);

    localStorage.setItem(
      "locaisBH",
      JSON.stringify(locais)
    );

    alert("Destino cadastrado com sucesso!");

    document.getElementById("novoNome").value = "";
    document.getElementById("novaCategoria").value = "";
    document.getElementById("novoBairro").value = "";

    window.carregarLocais();

  });

}
// ====================================
// SCRIPT PRINCIPAL - CONHEÇA BH
// ====================================

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
  // DADOS INICIAIS (GARANTIDO)
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
          <div class="card h-100 shadow-sm">

            <img src="${local.imagem}" class="card-img-top">

            <div class="card-body text-center">

              <h5>${local.nome}</h5>
              <p>${local.descricao}</p>

              <button class="btn btn-sm ${fav ? 'btn-danger' : 'btn-outline-danger'}"
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
  // INIT
  // ==============================
  try {
    inicializarDados();
    window.carregarLocais();
    window.renderFavoritos();
  } catch (e) {
    console.warn(e);
  }

});
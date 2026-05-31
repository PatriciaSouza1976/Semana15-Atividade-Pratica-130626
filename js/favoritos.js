document.addEventListener("DOMContentLoaded", function () {

  // ==============================
  // USUÁRIO
  // ==============================
  function getUsuario() {
    try {
      return JSON.parse(sessionStorage.getItem("usuarioCorrente"));
    } catch {
      return null;
    }
  }

  // ==============================
  // FAVORITOS
  // ==============================
  function getFavoritos() {
    const usuario = getUsuario();
    if (!usuario) return [];

    const dados = localStorage.getItem(`favoritos_${usuario.id}`);
    return dados ? JSON.parse(dados) : [];
  }

  function salvarFavoritos(lista) {
    const usuario = getUsuario();
    if (!usuario) return;

    localStorage.setItem(
      `favoritos_${usuario.id}`,
      JSON.stringify(lista)
    );
  }

  // ==============================
  // TOGGLE FAVORITO
  // ==============================
  window.toggleFavorito = function (id) {

    const usuario = getUsuario();

    if (!usuario) {
      alert("Você precisa estar logado para favoritar!");
      location.href = "modulos/login/index.html";
      return;
    }

    id = Number(id);

    let favoritos = getFavoritos();

    if (favoritos.includes(id)) {
      favoritos = favoritos.filter(item => item !== id);
    } else {
      favoritos.push(id);
    }

    salvarFavoritos(favoritos);

    // atualiza telas
    if (typeof window.renderFavoritos === "function") {
      window.renderFavoritos();
    }

    if (typeof window.carregarLocais === "function") {
      window.carregarLocais(window.locais || []);
    }
  };

  // ==============================
  // RENDER FAVORITOS
  // ==============================
  window.renderFavoritos = function () {

    const container = document.getElementById("favoritosContainer");
    if (!container) return;

    const usuario = getUsuario();

    if (!usuario) {
      container.innerHTML = "<p>Você precisa estar logado.</p>";
      return;
    }

    const favoritos = getFavoritos();
    const locais = window.locais || [];

    const filtrados = locais.filter(local =>
      favoritos.includes(local.id)
    );

    if (filtrados.length === 0) {
      container.innerHTML = "<p>Nenhum favorito ainda.</p>";
      return;
    }

    container.innerHTML = filtrados.map(local => `
      <div class="col-md-4 mb-3">
        <div class="card shadow-sm h-100">

          <img src="${local.imagem}" class="card-img-top" alt="${local.nome}">

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
  if (document.getElementById("favoritosContainer")) {
    window.renderFavoritos();
  }

});
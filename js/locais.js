// ======================================
// CONHEÇA BH - SCRIPT PRINCIPAL
// ======================================

// ======================================
// DADOS DOS LOCAIS
// ======================================

let locais = [
  {
    id: 1,
    nome: "Museu das Minas e do Metal",
    categoria: "museu",
    imagem: "assets/imagem/museu1.png",
    descricao: "Museu sobre mineração e história metalúrgica de MG.",
    bairro: "Centro",
    endereco: "Praça da Liberdade, Belo Horizonte",
    funcionamento: "Terça a Domingo",
    horario: "09h às 18h",
    avaliacao: 4.5,
    totalAvaliacoes: 120,
    popularidade: 85,
    coordenadas: [-43.9372, -19.9325],
    comentarios: ["Incrível exposição!", "Muito educativo para estudantes.", "Recomendo visitar."]
  }
];

// (resto dos locais continua igual — mantive só o início pra não duplicar aqui)

// ======================================
// GERAR ESTRELAS
// ======================================

function gerarEstrelas(avaliacao) {
  let estrelas = "";
  const quantidade = Math.round(avaliacao);

  for (let i = 0; i < quantidade; i++) {
    estrelas += "⭐";
  }

  return estrelas;
}

// ======================================
// CARREGAR LOCAIS
// ======================================

function carregarLocais(lista = locais) {
  const container = document.getElementById("destinosContainer");
  if (!container) return;

  container.innerHTML = "";

  lista.forEach(local => {
    container.innerHTML += `
      <div class="col-md-4 mb-4">
        <div class="card h-100 shadow-sm">

          <img src="${local.imagem}" class="card-img-top" alt="${local.nome}">

          <div class="card-body text-center">

            <h5 class="card-title fw-bold mb-2">
              ${local.nome}
            </h5>

            <p class="card-text text-muted mb-3" style="font-size: 0.95rem;">
              ${local.descricao}
            </p>

            <div class="info-local">

              <button
                class="btn btn-danger btn-sm mt-3"
                onclick="excluirLocal(${local.id})"
              >
                Excluir
              </button>

              <span>📍 ${local.bairro}</span>
              <span>🕒 ${local.horario}</span>
              <span>📅 ${local.funcionamento}</span>
              <span>${gerarEstrelas(local.avaliacao)} (${local.avaliacao})</span>
              <span>🔥 ${local.popularidade}%</span>

            </div>

          </div>
        </div>
      </div>
    `;
  });
}

// ======================================
// FILTRAR CATEGORIA
// ======================================

function filtrarCategoria(categoria) {
  const filtrados = locais.filter(local => local.categoria === categoria);
  carregarLocais(filtrados);
}

// ======================================
// BUSCAR LOCAL
// ======================================

function buscarLocal() {
  const campo = document.getElementById("campoBusca");
  if (!campo) return;

  const textoBusca = campo.value.toLowerCase().trim();

  if (textoBusca === "") {
    carregarLocais();
    return;
  }

  const resultados = locais.filter(local =>
    local.nome.toLowerCase().includes(textoBusca) ||
    local.categoria.toLowerCase().includes(textoBusca) ||
    local.bairro.toLowerCase().includes(textoBusca)
  );

  carregarLocais(resultados);
}

// ======================================
// LOCAL STORAGE
// ======================================

function salvarLocais() {
  localStorage.setItem("locaisBH", JSON.stringify(locais));
}

function carregarLocalStorage() {
  const dados = localStorage.getItem("locaisBH");

  if (dados) {
    locais = JSON.parse(dados);
  }
}

// ======================================
// ADICIONAR LOCAL
// ======================================

function adicionarLocal() {
  const nome = document.getElementById("novoNome").value.trim();
  const categoria = document.getElementById("novaCategoria").value;
  const bairro = document.getElementById("novoBairro").value.trim();

  if (nome === "" || categoria === "" || bairro === "") {
    alert("Preencha todos os campos.");
    return;
  }

  const novoLocal = {
    id: Date.now(),
    nome,
    categoria,
    bairro,
    descricao: "Novo destino turístico cadastrado.",
    imagem: "https://picsum.photos/600/400",
    endereco: "Belo Horizonte",
    funcionamento: "Todos os dias",
    horario: "08h às 18h",
    avaliacao: 4.0,
    totalAvaliacoes: 0,
    popularidade: 80,
    coordenadas: [-43.9386, -19.9208],
    comentarios: []
  };

  locais.push(novoLocal);

  salvarLocais();
  carregarLocais();

  document.getElementById("novoNome").value = "";
  document.getElementById("novaCategoria").value = "";
  document.getElementById("novoBairro").value = "";
}

// ======================================
// EXCLUIR LOCAL
// ======================================

function excluirLocal(id) {
  locais = locais.filter(local => local.id !== id);
  salvarLocais();
  carregarLocais();
}

// ======================================
// INICIALIZAÇÃO (ÚNICA E CORRETA)
// ======================================

document.addEventListener("DOMContentLoaded", () => {
  carregarLocalStorage();
  carregarLocais();

  const btnBuscar = document.getElementById("btnBuscar");
  if (btnBuscar) {
    btnBuscar.addEventListener("click", buscarLocal);
  }

  const btnAdicionar = document.getElementById("btnAdicionar");
  if (btnAdicionar) {
    btnAdicionar.addEventListener("click", adicionarLocal);
  }
});
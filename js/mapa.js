// ====================================
// MAPA TURÍSTICO - CONHEÇA BH
// ====================================

document.addEventListener("DOMContentLoaded", function () {

  const mapaContainer = document.getElementById("mapaBH");

  if (!mapaContainer) return;

  // ==============================
  // EVITA DUPLICAÇÃO DO LEAFLET
  // ==============================
  if (mapaContainer._leaflet_id) {
    mapaContainer._leaflet_id = null;
    mapaContainer.innerHTML = "";
  }

  // ==============================
  // CRIA MAPA
  // ==============================
  const mapa = L.map(mapaContainer).setView(
    [-19.9208, -43.9386],
    12
  );

  L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      attribution: "&copy; OpenStreetMap"
    }
  ).addTo(mapa);

  // ==============================
  // PONTOS TURÍSTICOS
  // ==============================
  const pontosTuristicos = [
    {
      nome: "Praça da Liberdade",
      descricao: "Centro cultural e histórico de Belo Horizonte.",
      endereco: "Praça da Liberdade - Funcionários",
      coordenadas: [-19.9321, -43.9378],
      avaliacao: 4.9
    },
    {
      nome: "Museu das Minas e do Metal",
      descricao: "Museu dedicado à mineração e história de Minas Gerais.",
      endereco: "Praça da Liberdade",
      coordenadas: [-19.9325, -43.9372],
      avaliacao: 4.5
    },
    {
      nome: "Mercado Central",
      descricao: "Ponto gastronômico e cultural tradicional de BH.",
      endereco: "Av. Augusto de Lima - Centro",
      coordenadas: [-19.9230, -43.9445],
      avaliacao: 4.8
    },
    {
      nome: "Parque Municipal",
      descricao: "Área verde tradicional no centro da cidade.",
      endereco: "Av. Afonso Pena",
      coordenadas: [-19.9202, -43.9345],
      avaliacao: 4.4
    },
    {
      nome: "Mineirão",
      descricao: "Estádio turístico e palco de grandes eventos.",
      endereco: "Pampulha",
      coordenadas: [-19.8659, -43.9710],
      avaliacao: 4.8
    },
    {
      nome: "Museu da Pampulha",
      descricao: "Museu de arte moderna da Pampulha.",
      endereco: "Av. Otacílio Negrão de Lima",
      coordenadas: [-19.8597, -43.9803],
      avaliacao: 4.7
    },
    {
      nome: "Parque das Mangabeiras",
      descricao: "Vista panorâmica e trilhas ecológicas.",
      endereco: "Mangabeiras",
      coordenadas: [-19.9527, -43.9152],
      avaliacao: 4.9
    },
    {
      nome: "Feira Hippie",
      descricao: "Feira tradicional de artesanato e gastronomia.",
      endereco: "Av. Afonso Pena",
      coordenadas: [-19.9195, -43.9342],
      avaliacao: 4.6
    },
    {
      nome: "Savassi",
      descricao: "Região famosa por bares e vida noturna.",
      endereco: "Savassi",
      coordenadas: [-19.9367, -43.9330],
      avaliacao: 4.7
    }
  ];

  // ==============================
  // MARCADORES
  // ==============================
  pontosTuristicos.forEach(local => {

    L.marker(local.coordenadas)
      .addTo(mapa)
      .bindPopup(`
        <div style="width:220px;">
          <h5 style="color:#0d6efd; margin-bottom:6px;">
            ${local.nome}
          </h5>
          <p style="margin:0 0 6px 0;">
            ${local.descricao}
          </p>
          <p style="margin:0;">
            <strong>📍</strong> ${local.endereco}
          </p>
          <p style="margin:0;">
            ⭐ ${local.avaliacao}
          </p>
        </div>
      `);

  });

});
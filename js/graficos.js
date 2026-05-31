document.addEventListener("DOMContentLoaded", () => {

  // ==============================
  // DADOS DO LOCALSTORAGE
  // ==============================
  const dados = localStorage.getItem("locaisBH");
  const locais = dados ? JSON.parse(dados) : [];

  // ==============================
  // CONTADORES
  // ==============================
  let totalMuseus = 0;
  let totalParques = 0;
  let totalBares = 0;

  locais.forEach(local => {

    if (local.categoria === "museu") totalMuseus++;
    if (local.categoria === "parque") totalParques++;
    if (local.categoria === "bar") totalBares++;

  });

  // ==============================
  // CANVAS
  // ==============================
  const canvas = document.getElementById("graficoCategorias");

  if (!canvas) return;

  if (typeof Chart === "undefined") {
    console.warn("Chart.js não carregado");
    return;
  }

  // ==============================
  // EVITA DUPLICAÇÃO DE GRÁFICO
  // ==============================
  if (window.graficoBH instanceof Chart) {
    window.graficoBH.destroy();
  }

  // ==============================
  // GRÁFICO
  // ==============================
  window.graficoBH = new Chart(canvas, {
    type: "bar",

    data: {
      labels: ["Museus", "Parques", "Bares"],
      datasets: [{
        label: "Locais turísticos",

        data: [
          totalMuseus,
          totalParques,
          totalBares
        ]
      }]
    },

    options: {
      responsive: true,

      plugins: {
        legend: {
          display: false
        },

        title: {
          display: true,
          text: "Categorias Turísticas de Belo Horizonte"
        }
      },

      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1
          }
        }
      }
    }
  });

});
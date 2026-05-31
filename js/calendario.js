// ====================================
// CALENDÁRIO - CONHEÇA BH (VERSÃO SEGURA)
// ====================================

document.addEventListener('DOMContentLoaded', function () {

  const calendarioEl = document.getElementById('calendarioBH');
  if (!calendarioEl || typeof FullCalendar === "undefined") return;

  const eventosTuristicos = [
    {
      title: 'Museu das Minas e do Metal',
      start: '2026-05-10',
      color: '#0d6efd',
      extendedProps: {
        descricao: 'Exposição sobre mineração e história de Minas Gerais.',
        local: 'Praça da Liberdade'
      }
    },
    {
      title: 'Festival Gastronômico Mineiro',
      start: '2026-05-15',
      color: '#dc3545',
      extendedProps: {
        descricao: 'Festival com comidas típicas mineiras.',
        local: 'Mercado Central'
      }
    },
    {
      title: 'Passeio Cultural Pampulha',
      start: '2026-05-22',
      color: '#6610f2',
      extendedProps: {
        descricao: 'Tour pela arquitetura da Pampulha.',
        local: 'Pampulha'
      }
    },
    {
      title: 'Parque das Mangabeiras',
      start: '2026-06-12',
      color: '#198754',
      extendedProps: {
        descricao: 'Trilhas e vista panorâmica.',
        local: 'Mangabeiras'
      }
    },
    {
      title: 'Noite de Jazz em BH',
      start: '2026-06-18',
      color: '#fd7e14',
      extendedProps: {
        descricao: 'Evento musical fictício.',
        local: 'Savassi'
      }
    },
    {
      title: 'Feira Hippie Especial',
      start: '2026-06-26',
      color: '#20c997',
      extendedProps: {
        descricao: 'Artesanato e gastronomia.',
        local: 'Av. Afonso Pena'
      }
    },
    {
      title: 'Museu da Pampulha',
      start: '2026-07-15',
      color: '#6f42c1',
      extendedProps: {
        descricao: 'Arte moderna.',
        local: 'Pampulha'
      }
    },
    {
      title: 'Festival de Inverno BH',
      start: '2026-07-19',
      color: '#0dcaf0',
      extendedProps: {
        descricao: 'Música e cultura.',
        local: 'Centro'
      }
    },
    {
      title: 'Bar do Zé - Música ao Vivo',
      start: '2026-07-25',
      color: '#dc3545',
      extendedProps: {
        descricao: 'Música ao vivo.',
        local: 'Savassi'
      }
    }
  ];

  const calendario = new FullCalendar.Calendar(calendarioEl, {
    initialView: 'multiMonthThree',
    locale: 'pt-br',
    height: 'auto',

    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'multiMonthThree,dayGridMonth'
    },

    views: {
      multiMonthThree: {
        type: 'multiMonth',
        duration: { months: 3 },
        buttonText: '3 Meses'
      }
    },

    events: eventosTuristicos,
    dayMaxEvents: true,

    eventClick: function (info) {
      alert(
        '📍 ' + info.event.title +
        '\n\n📝 ' + info.event.extendedProps.descricao +
        '\n\n📌 Local: ' + info.event.extendedProps.local
      );
    }
  });

  calendario.render();
});
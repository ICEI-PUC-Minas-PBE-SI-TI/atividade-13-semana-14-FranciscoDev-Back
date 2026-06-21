window.onload = async () => {
  try {
    const res = await fetch("http://localhost:3001/noticias");
    const dados = await res.json();

    const canvas = document.getElementById("graficoNoticias");

    if (!canvas) {
      console.log("Canvas não encontrado");
      return;
    }

    // destrói gráfico anterior
    if (window.meuGrafico) {
      window.meuGrafico.destroy();
    }

    window.meuGrafico = new Chart(canvas, {
      type: "bar",
      data: {
        labels: dados.map(n => n.titulo.slice(0, 20)),
        datasets: [{
          label: "Notícias",
          data: dados.map(() => 1),
          backgroundColor: "blue",
          borderWidth: 1
        }]
      },

      // 🔥 OPTIONS AGORA ESTÁ NO LUGAR CERTO
      options: {
        responsive: true,
        maintainAspectRatio: false,
        devicePixelRatio: 2,

        scales: {
          x: {
            ticks: {
              maxRotation: 0,
              minRotation: 0,
              autoSkip: true
            }
          },
          y: {
            beginAtZero: true
          }
        },

        layout: {
          padding: 10
        }
      }
    });

  } catch (err) {
    console.log("Erro no gráfico:", err);
  }
};
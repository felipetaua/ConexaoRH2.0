// Lógica para o Gráfico
const ctx = document.getElementById('statsChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
        datasets: [{
            label: 'Novos Candidatos',
            data: [20, 35, 45, 30],
            backgroundColor: [
                '#dcd8fd',
                '#dcd8fd',
                '#6a5af9', // Cor primária para a barra de maior valor
                '#dcd8fd',
            ],
            borderRadius: 8,
            borderSkipped: false,
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    display: false
                },
                ticks: {
                    display: false
                }
            },
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    font: {
                        family: "'Poppins', sans-serif",
                    }
                }
            }
        }
    }
});
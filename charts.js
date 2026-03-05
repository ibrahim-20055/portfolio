// Global Chart Configuration for Dark Theme
Chart.defaults.color = '#9e9ea7';
Chart.defaults.font.family = "'Inter', sans-serif";
Chart.defaults.scale.grid.color = 'rgba(255, 255, 255, 0.05)';
Chart.defaults.scale.grid.borderColor = 'rgba(255, 255, 255, 0.1)';
Chart.defaults.plugins.tooltip.backgroundColor = '#18181c';
Chart.defaults.plugins.tooltip.titleColor = '#fff';
Chart.defaults.plugins.tooltip.borderColor = '#2a2a35';
Chart.defaults.plugins.tooltip.borderWidth = 1;
Chart.defaults.plugins.tooltip.padding = 10;
Chart.defaults.plugins.tooltip.displayColors = false;

document.addEventListener('DOMContentLoaded', () => {

    // 1. HERO CHART (Abstract Growth Chart)
    const ctxHero = document.getElementById('heroChart').getContext('2d');

    // Gradient for Hero Chart
    const gradientHero = ctxHero.createLinearGradient(0, 0, 0, 300);
    gradientHero.addColorStop(0, 'rgba(99, 102, 241, 0.5)');
    gradientHero.addColorStop(1, 'rgba(99, 102, 241, 0.0)');

    new Chart(ctxHero, {
        type: 'line',
        data: {
            labels: ['M1', 'M2', 'M3', 'M4', 'M5', 'M6'],
            datasets: [{
                label: 'Growth Index',
                data: [10, 25, 30, 60, 85, 120],
                borderColor: '#6366f1',
                backgroundColor: gradientHero,
                borderWidth: 3,
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#18181c',
                pointBorderColor: '#6366f1',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { display: false },
                y: { display: false }
            },
            interaction: {
                intersect: false,
                mode: 'index',
            },
        }
    });

    // 2. NOVA ARABIA - Followers Growth Chart (50 Days)
    const ctxNova = document.getElementById('novaFollowersChart').getContext('2d');
    const gradientNova = ctxNova.createLinearGradient(0, 0, 0, 300);
    gradientNova.addColorStop(0, 'rgba(6, 182, 212, 0.5)'); // Cyan
    gradientNova.addColorStop(1, 'rgba(6, 182, 212, 0.0)');

    new Chart(ctxNova, {
        type: 'line',
        data: {
            labels: ['Day 1', 'Day 8', 'Day 15', 'Day 25', 'Day 35', 'Day 50'],
            datasets: [{
                label: 'Followers',
                data: [0, 1000, 2500, 5000, 7800, 10000],
                borderColor: '#06b6d4',
                backgroundColor: gradientNova,
                borderWidth: 3,
                tension: 0.3,
                fill: true,
                pointBackgroundColor: '#06b6d4',
                pointRadius: 3
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function (value) {
                            return value >= 1000 ? (value / 1000) + 'k' : value;
                        }
                    }
                }
            }
        }
    });

    // 3. AON - Funnel Conversion Chart
    // Simulating a Funnel using a horizontal bar chart
const funnelCanvas = document.getElementById('aonFunnelChart');

if (funnelCanvas) {
    const ctxFunnel = funnelCanvas.getContext('2d');

    new Chart(ctxFunnel, {
        type: 'bar',
        data: {
            labels: ['Views', 'Profile Visits', 'Link Clicks', 'Registrations', 'Paid Students'],
            datasets: [{
                label: 'Funnel Progression',
                data: [328000, 15000, 124, 78, 28],
                backgroundColor: [
                    '#2a2a35',
                    '#3f3f4e',
                    '#6366f1',
                    '#8b5cf6',
                    '#fbbf24'
                ],
                borderRadius: 4
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    type: 'linear', // تم تغييره من logarithmic لتجنب مشاكل GitHub
                    beginAtZero: true,
                    ticks: {
                        callback: function (value) {
                            if (value >= 1000) {
                                return value / 1000 + 'k';
                            }
                            return value;
                        }
                    }
                },
                y: {
                    grid: { display: false }
                }
            }
        }
    });
}

    // 4. AON - 8 Month Impact (Views & Link Clicks)
    const ctxAonImpact = document.getElementById('aonImpactChart').getContext('2d');
    new Chart(ctxAonImpact, {
        type: 'line',
        data: {
            labels: ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7'],
            datasets: [
                {
                    label: 'Monthly Views',
                    data: [191000, 208500, 254800, 193200, 201700, 209900, 61400],
                    borderColor: '#6366f1',
                    backgroundColor: 'transparent',
                    borderWidth: 2,
                    tension: 0.4,
                    yAxisID: 'y'
                },
                {
                    label: 'Link Clicks',
                    data: [94, 30, 178, 178, 349, 250, 96],
                    borderColor: '#10b981', // Emerald
                    backgroundColor: 'transparent',
                    borderWidth: 2,
                    tension: 0.4,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: { position: 'top' }
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: { display: true, text: 'Views' },
                    ticks: {
                        callback: function (value) { return value / 1000 + 'k'; }
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: { display: true, text: 'Link Clicks' },
                    grid: { drawOnChartArea: false } // only want the grid lines for one axis
                }
            }
        }
    });

    // 5. FULL STACK BATCH 2 - Source Pie Chart
    const ctxSource = document.getElementById('batch2SourceChart').getContext('2d');
    new Chart(ctxSource, {
        type: 'doughnut',
        data: {
            labels: ['Influencer Strategy', 'IG Organic', 'Referrals', 'Prev. Exposure', 'Misc.'],
            datasets: [{
                data: [17, 11, 5, 2, 7], // Adjusted misc vs others to total 42 (17+11+5+2+x = 42 => x=7)
                backgroundColor: [
                    '#6366f1', // Influencer
                    '#06b6d4', // IG Organic
                    '#10b981', // Referrals
                    '#fbbf24', // Prev Exposure
                    '#2a2a35'  // Misc
                ],
                borderWidth: 0,
                cutout: '70%'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right',
                    labels: { color: '#f5f5f5', font: { size: 12 } }
                }
            }
        }
    });

    // 6. AI COURSE LAUNCH - Session Impact Graphic
    const ctxSession = document.getElementById('aiSessionChart').getContext('2d');
    new Chart(ctxSession, {
        type: 'bar',
        data: {
            labels: ['Passive Content', 'Live Sessions'],
            datasets: [{
                label: 'Conversion Likelihood',
                data: [10, 85], // Illustrative relative index
                backgroundColor: [
                    '#3f3f4e', // Passive content
                    '#10b981'  // Sessions (Highlight)
                ],
                borderRadius: 4
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return context.raw + '% relative conversion efficiency';
                        }
                    }
                }
            },
            scales: {
                x: {
                    display: false,
                    beginAtZero: true
                },
                y: {
                    grid: { display: false },
                    ticks: { color: '#f5f5f5', font: { size: 13, family: "'Inter', sans-serif" } }
                }
            }
        }
    });

});


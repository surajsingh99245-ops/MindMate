const profile = document.querySelector(".profile");
const profileBtn = document.querySelector(".profile-btn");
const loggedUser = document.getElementById("loggedUser");

if (loggedUser) {
    loggedUser.textContent = localStorage.getItem("username");
}

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("username");
    });
}
const weeklyData = {

    summary: {
        averageMood: "Happy",

        checkins: "6 / 7 Days",

        streak: "12 Days",

        journalEntries: "18 Entries",
    },

    charts: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],

        moodTrend: [4, 3, 2, 4, 5, 4, 5],

        journalActivity: [2, 1, 3, 2, 4, 1, 3],
    },

    distribution: {

        happy: 45,

        calm: 25,

        neutral: 15,

        sad: 10,

        anxious: 5

    },

    insights: [

        "😊 Your mood has improved compared to last week.",

        "🔥 You completed 6 out of 7 daily check-ins.",

        "📖 You wrote 18 journal entries this week.",

        "💡 Keep maintaining your journaling streak."],

};

 
function renderMoodDistribution(distribution) {

    document.getElementById("happyPercent").textContent =
        distribution.happy + "%";

    document.getElementById("calmPercent").textContent =
        distribution.calm + "%";

    document.getElementById("neutralPercent").textContent =
        distribution.neutral + "%";

    document.getElementById("sadPercent").textContent =
        distribution.sad + "%";

    document.getElementById("anxiousPercent").textContent =
        distribution.anxious + "%";


    document.getElementById("happyBar").style.width =
        distribution.happy + "%";

    document.getElementById("calmBar").style.width =
        distribution.calm + "%";

    document.getElementById("neutralBar").style.width =
        distribution.neutral + "%";

    document.getElementById("sadBar").style.width =
        distribution.sad + "%";

    document.getElementById("anxiousBar").style.width =
        distribution.anxious + "%";

}


function updateReport(data) {

    // Summary Cards

    document.getElementById("avgMood").textContent =
        data.summary.averageMood;

    document.getElementById("checkins").textContent =
        data.summary.checkins;

    document.getElementById("streak").textContent =
        data.summary.streak;

    document.getElementById("journalEntries").textContent =
        data.summary.journalEntries;

    // Charts

    renderMoodChart(

        data.charts.labels,

        data.charts.moodTrend

    );

    renderJournalChart(

        data.charts.labels,

        data.charts.journalActivity

    );

    // Mood Distribution

    renderMoodDistribution(

        data.distribution

    );

    // AI Insights

    renderInsights(

        data.insights

    );

}

const weeklyBtn =
    document.getElementById("weeklyBtn");

const monthlyBtn =
    document.getElementById("monthlyBtn");

weeklyBtn.addEventListener("click", () => {

    weeklyBtn.classList.add("active");

    monthlyBtn.classList.remove("active");

    loadWeeklyReport();

});

monthlyBtn.addEventListener("click", () => {

    monthlyBtn.classList.add("active");

    weeklyBtn.classList.remove("active");

    loadMonthlyReport();

});



const ctx = document.getElementById("moodChart");

let moodChart;

function renderMoodChart(labels, data) {

    if (moodChart) {

        moodChart.destroy();

    }

    moodChart = new Chart(ctx, {

        type: "line",

        data: {

            labels: labels,

            datasets: [{

                label: "Mood",

                data: data,

                borderColor: "#4F8EF7",

                backgroundColor: "rgba(79,142,247,.12)",

                fill: true,

                tension: .4,

                pointRadius: 6,

                pointHoverRadius: 8,

                pointBackgroundColor: "#4F8EF7"

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

                    min: 1,

                    max: 5,

                    ticks: {

                        stepSize: 1,

                        callback: function (value) {

                            const moods = {

                                1: "😢",

                                2: "😔",

                                3: "😐",

                                4: "😊",

                                5: "😁"

                            };

                            return moods[value];

                        }

                    }

                }

            }

        }

    });

}
 
const journalCtx = document.getElementById("journalChart");

let journalChart;

function renderJournalChart(labels, data) {

    if (journalChart) {

        journalChart.destroy();

    }

    journalChart = new Chart(journalCtx, {

        type: "bar",

        data: {

            labels: labels,

            datasets: [{

                data: data,

                backgroundColor: "#4F8EF7",

                borderRadius: 8,

                borderSkipped: false

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

                x: {

                    grid: {

                        display: false

                    }

                },

                y: {

                    beginAtZero: true,

                    ticks: {

                        stepSize: 1

                    }

                }

            }

        }

    });

}
 
function renderInsights(insights) {

    const container = document.querySelector(".insight-list");

    container.innerHTML = "";

    insights.forEach((text) => {

        container.innerHTML += `

        <div class="insight-item">

            <i class="fa-solid fa-lightbulb"></i>

            <p>${text}</p>

        </div>

        `;

    });

}
async function loadWeeklyReport() {

    try {

        const username = localStorage.getItem("username");

        const response = await fetch(
            `http://localhost:3000/report/weekly/${username}`
        );

        const data = await response.json();

        updateReport(data);

    } catch (err) {

        console.log(err);

    }

}
loadWeeklyReport();
async function loadMonthlyReport() {

    try {

        const username = localStorage.getItem("username");

        const response = await fetch(
            `http://localhost:3000/report/monthly/${username}`
        );

        const data = await response.json();

        updateReport(data);

    } catch (err) {

        console.log(err);

    }

}
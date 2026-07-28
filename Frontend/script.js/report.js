const weeklyData = {

    averageMood: "Happy",

    checkins: "6 / 7 Days",

    streak: "12 Days",

    journalEntries: "18 Entries",

    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],

    moodTrend: [4, 3, 2, 4, 5, 4, 5],

    journalActivity: [2, 1, 3, 2, 4, 1, 3]

};

const monthlyData = {

    averageMood: "Calm",

    checkins: "26 / 30 Days",

    streak: "28 Days",

    journalEntries: "72 Entries",

    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],

    moodTrend: [3, 4, 4, 5],

    journalActivity: [18, 22, 15, 17]

};

function updateReport(data) {

    document.getElementById("avgMood").textContent =
        data.averageMood;

    document.getElementById("checkins").textContent =
        data.checkins;

    document.getElementById("streak").textContent =
        data.streak;

    document.getElementById("journalEntries").textContent =
        data.journalEntries;


    renderMoodChart(

        data.labels,

        data.moodTrend

    );

}

const weeklyBtn =
    document.getElementById("weeklyBtn");

const monthlyBtn =
    document.getElementById("monthlyBtn");

weeklyBtn.addEventListener("click", () => {

    weeklyBtn.classList.add("active");

    monthlyBtn.classList.remove("active");

    updateReport(weeklyData);

});

monthlyBtn.addEventListener("click", () => {

    monthlyBtn.classList.add("active");

    weeklyBtn.classList.remove("active");

    updateReport(monthlyData);

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

// new Chart(ctx, {

//     type: "line",

//     data: {

//         labels: [

//             "Mon",
//             "Tue",
//             "Wed",
//             "Thu",
//             "Fri",
//             "Sat",
//             "Sun"

//         ],

//         datasets: [

//             {

//                 label: "Mood",

//                 data: [4,3,2,4,5,4,5],

//                 borderColor:"#4F8EF7",

//                 backgroundColor:"rgba(79,142,247,.15)",

//                 fill:true,

//                 tension:.4,

//                 pointRadius:6,

//                 pointBackgroundColor:"#4F8EF7"

//             }

//         ]

//     },

//     options:{

//         responsive:true,

//         maintainAspectRatio:false,

//         plugins:{

//             legend:{

//                 display:false

//             }

//         },

//         scales:{

//             y:{

//                 min:1,

//                 max:5,

//                 ticks:{

//                     stepSize:1,

//                     callback:function(value){

//                         const moods={

//                             1:"😢",

//                             2:"😔",

//                             3:"😐",

//                             4:"😊",

//                             5:"😁"

//                         };

//                         return moods[value];

//                     }

//                 }

//             }

//         }

//     }

// });


const journalCtx = document.getElementById("journalChart");

new Chart(journalCtx, {

    type: "bar",

    data: {

        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],

        datasets: [{

            data: [2, 1, 3, 2, 4, 1, 3],

            backgroundColor: "#4F8EF7",

            borderRadius: 8

        }]

    },

    options: {

        responsive: true,

        plugins: {

            legend: {

                display: false

            }

        },

        scales: {

            y: {

                beginAtZero: true

            }

        }

    }

});









updateReport(weeklyData);
const moodHistory = [];

function logMood() {
    const moodCategorySelect = document.getElementById("moodCategory");
    const selectedMoodCategory = moodCategorySelect.value;
    const currentTime = new Date();

    moodHistory.push({
        moodCategory: selectedMoodCategory,
        date: currentTime.toLocaleDateString(),
        time: currentTime.toLocaleTimeString(),
    });

    updateMoodHistory();
    updateMoodChart();
}

function updateMoodHistory() {
    const moodHistoryDiv = document.querySelector(".mood-history");
    moodHistoryDiv.innerHTML = "<h3 class='text'>Mood History</h3>";

    if (moodHistory.length === 0) {
        moodHistoryDiv.innerHTML += "<p class='text'>No mood data available.</p>";
    } else {
        const ul = document.createElement("ul");

        moodHistory.forEach((entry, index) => {
            const li = document.createElement("li");
            li.innerHTML = `<strong>Date:</strong> ${entry.date}, <strong>Time:</strong> ${entry.time}, <strong>Mood Category:</strong> ${entry.moodCategory}`;
            ul.appendChild(li);
        });

        moodHistoryDiv.appendChild(ul);
    }
}

function updateMoodChart() {
    const moodCategoryCounts = {};
    moodHistory.forEach((entry) => {
        if (moodCategoryCounts[entry.moodCategory]) {
            moodCategoryCounts[entry.moodCategory]++;
        } else {
            moodCategoryCounts[entry.moodCategory] = 1;
        }
    });

    const moodLabels = Object.keys(moodCategoryCounts);
    const moodData = Object.values(moodCategoryCounts);

    const moodChartCanvas = document.getElementById("moodChart");
    const moodChartContext = moodChartCanvas.getContext("2d");

    const moodChart = new Chart(moodChartContext, {
        type: "pie",
        data: {
            labels: moodLabels,
            datasets: [
                {
                    data: moodData,
                    backgroundColor:   [
                        '#FF6B6B',
                        '#FFD166',
                        '#06D6A0',
                        '#118AB2',
                        '#073B4C',
                        '#E63946',
                        '#F4A261',
                        '#2A9D8F',
                        '#E76F51',
                        '#B5838D',
                        '#D6A2E8',
                    ]
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
        },
    });
}

document.getElementById('downloadPdfButton').addEventListener('click', generateAndDownloadPDF);

function generateAndDownloadPDF() {
    const doc = new jsPDF();

    doc.text('Mood Tracker Data', 10, 10);
    doc.text('Mood History:', 10, 20);

    moodHistory.forEach((entry, index) => {
        const yPos = 30 + index * 10;
        doc.text(`Date: ${entry.date}, Time: ${entry.time}, Mood Category: ${entry.moodCategory}`, 10, yPos);
    });

    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '');
    const pdfFileName = `mood_data_${timestamp}.pdf`;
    doc.save(pdfFileName);
}

updateMoodHistory();

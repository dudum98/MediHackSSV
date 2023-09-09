// Initialize mood and activity history arrays
const moodHistory = [];
const activityHistory = [];

// Function to log mood
function logMood() {
    const moodSelect = document.getElementById("mood");
    const customMoodInput = document.getElementById("customMood");
    const selectedMood = customMoodInput.value || moodSelect.value;
    const currentTime = new Date();

    // Store the mood, date, and time in the mood history
    moodHistory.push({
        mood: selectedMood,
        date: currentTime.toLocaleDateString(),
        time: currentTime.toLocaleTimeString(),
    });

    // Update the mood history visualization
    updateMoodHistory();
    updateMoodChart();
    customMoodInput.value = ""; // Clear the custom mood input
}

// Function to log activity
function logActivity() {
    const activitySelect = document.getElementById("activity");
    const customActivityInput = document.getElementById("customActivity");
    const selectedActivity = customActivityInput.value || activitySelect.value;
    const currentTime = new Date();

    // Store the activity, date, and time in the activity history
    activityHistory.push({
        activity: selectedActivity,
        date: currentTime.toLocaleDateString(),
        time: currentTime.toLocaleTimeString(),
    });

    // Update the activity history visualization
    updateActivityHistory();
    customActivityInput.value = ""; // Clear the custom activity input
}

// Function to delete a mood entry
function deleteMood(index) {
    moodHistory.splice(index, 1);
    updateMoodHistory();
    updateMoodChart();
}

// Function to delete an activity entry
function deleteActivity(index) {
    activityHistory.splice(index, 1);
    updateActivityHistory();
}

// Function to update mood history
function updateMoodHistory() {
    const moodHistoryDiv = document.querySelector(".mood-history");
    moodHistoryDiv.innerHTML = "<h3 class='text-lg font-semibold'>Mood History</h3>";

    if (moodHistory.length === 0) {
        moodHistoryDiv.innerHTML += "<p class='text-gray-600'>No mood data available.</p>";
    } else {
        const ul = document.createElement("ul");

        moodHistory.forEach((entry, index) => {
            const li = document.createElement("li");
            li.innerHTML = `<strong>Date:</strong> ${entry.date}, <strong>Time:</strong> ${entry.time}, <strong>Mood:</strong> ${entry.mood} <button onclick="deleteMood(${index})" class="text-red-500 ml-2">Delete</button>`;
            ul.appendChild(li);
        });

        moodHistoryDiv.appendChild(ul);
    }
}

// Function to update mood chart
function updateMoodChart() {
    const moodLabels = moodHistory.map((entry) => entry.date);
    const moodData = moodHistory.map((entry) => entry.mood);

    // Group mood entries by day, month, and year
    const moodDataByDay = groupDataByDay(moodHistory);
    const moodDataByMonth = groupDataByMonth(moodHistory);
    const moodDataByYear = groupDataByYear(moodHistory);

    // Update mood charts for day, month, and year
    updateMoodChartByPeriod("moodChartDay", moodDataByDay, "Day");
    updateMoodChartByPeriod("moodChartMonth", moodDataByMonth, "Month");
    updateMoodChartByPeriod("moodChartYear", moodDataByYear, "Year");
}

// Function to group data by day
function groupDataByDay(data) {
    const groupedData = {};

    data.forEach((entry) => {
        const date = entry.date;
        if (!groupedData[date]) {
            groupedData[date] = [];
        }
        groupedData[date].push(entry.mood);
    });

    return groupedData;
}

// Function to group data by month
function groupDataByMonth(data) {
    const groupedData = {};

    data.forEach((entry) => {
        const [month, year] = entry.date.split("/");
        const key = `${month}/${year}`;
        if (!groupedData[key]) {
            groupedData[key] = [];
        }
        groupedData[key].push(entry.mood);
    });

    return groupedData;
}

// Function to group data by year
function groupDataByYear(data) {
    const groupedData = {};

    data.forEach((entry) => {
        const [, year] = entry.date.split("/");
        if (!groupedData[year]) {
            groupedData[year] = [];
        }
        groupedData[year].push(entry.mood);
    });

    return groupedData;
}

// Function to update mood chart for a specific period
function updateMoodChartByPeriod(chartId, data, periodLabel) {
    const moodLabels = Object.keys(data);
    const moodData = moodLabels.map((label) => data[label].length);

    const moodChartCanvas = document.getElementById(chartId);
    const moodChartContext = moodChartCanvas.getContext("2d");

    const moodChart = new Chart(moodChartContext, {
        type: "bar",
        data: {
            labels: moodLabels,
            datasets: [
                {
                    label: `Mood by ${periodLabel}`,
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 1,
                    data: moodData,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    beginAtZero: true,
                },
            },
        },
    });
}

// Function to update activity history
function updateActivityHistory() {
    const activityHistoryDiv = document.querySelector(".activity-history");
    activityHistoryDiv.innerHTML = "<h3 class='text-lg font-semibold'>Activity History</h3>";

    if (activityHistory.length === 0) {
        activityHistoryDiv.innerHTML += "<p class='text-gray-600'>No activity data available.</p>";
    } else {
        const ul = document.createElement("ul");

        activityHistory.forEach((entry, index) => {
            const li = document.createElement("li");
            li.innerHTML = `<strong>Date:</strong> ${entry.date}, <strong>Time:</strong> ${entry.time}, <strong>Activity:</strong> ${entry.activity} <button onclick="deleteActivity(${index})" class="text-red-500 ml-2">Delete</button>`;
            ul.appendChild(li);
        });

        activityHistoryDiv.appendChild(ul);
    }
}

// Initial update of history sections and mood chart
updateMoodHistory();
updateActivityHistory();
updateMoodChart();


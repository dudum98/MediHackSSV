 // Initialize mood history array
 const moodHistory = [];
 var moodValue = 0;
 var moodAverage = 0;
 var anxi, calm, irri, depr, happ, mad, sad, emba, exci =0;
 // Function to log mood
 function logMood() {
     const moodCategorySelect = document.getElementById("moodCategory");
     const moodRatingSelect = document.getElementById("moodRating");
     const customMoodInput = document.getElementById("customMood");
     const selectedMoodCategory = moodCategorySelect.value;
     const selectedMoodRating = moodRatingSelect.value;
     const currentTime = new Date();

     // Store the mood category, mood rating, date, and time in the mood history
     moodHistory.push({
         moodCategory: selectedMoodCategory,
         moodRating: selectedMoodRating,
         date: currentTime.toLocaleDateString(),
         time: currentTime.toLocaleTimeString(),
     });

     // Update the mood history visualization
     updateMoodHistory();
     updateMoodChart();
     customMoodInput.value = ""; // Clear the custom mood input
 }

 // Function to delete a mood entry
 function deleteMood(index) {
     moodHistory.splice(index, 1);
     updateMoodHistory();
     updateMoodChart();
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
             li.innerHTML = `<strong>Date:</strong> ${entry.date}, <strong>Time:</strong> ${entry.time}, <strong>Mood Category:</strong> ${entry.moodCategory}, <strong>Mood Rating:</strong> ${entry.moodRating} <button onclick="deleteMood(${index})" class="btn btn-danger btn-sm">Delete</button>`;
             ul.appendChild(li);
         });

         moodHistoryDiv.appendChild(ul);
     }
 }

 // Function to update mood chart
 function updateMoodChart() {
     const moodLabels = moodHistory.map((entry) => entry.date);
     const moodData = moodHistory.map((entry) => entry.moodRating);

     // Update mood chart
     const moodChartCanvas = document.getElementById("moodChart");
     const moodChartContext = moodChartCanvas.getContext("2d");

     const moodChart = new Chart(moodChartContext, {
         type: "line",
         data: {
             labels: moodLabels,
             datasets: [
                 {
                     label: "Mood Rating",
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
         },
     });
 }

 // Event listener for the download button
 document.getElementById('downloadPdfButton').addEventListener('click', generateAndDownloadPDF);

 // Function to generate and download PDF
 function generateAndDownloadPDF() {
     // Create a new jsPDF instance
     const doc = new jsPDF();

     // Add content to the PDF
     doc.text('Mood Tracker Data', 10, 10);
     doc.text('Mood History:', 10, 20);

     // Add mood data to the PDF
     moodHistory.forEach((entry, index) => {
         const yPos = 30 + index * 10;
         doc.text(`Date: ${entry.date}, Time: ${entry.time}, Mood Category: ${entry.moodCategory}, Mood Rating: ${entry.moodRating}`, 10, yPos);
     });

     // Save the PDF with a unique name (e.g., timestamp)
     const timestamp = new Date().toISOString().replace(/[^0-9]/g, '');
     const pdfFileName = `mood_data_${timestamp}.pdf`;
     doc.save(pdfFileName);
 }

 // Initial update of mood history and mood chart
 updateMoodHistory();
 updateMoodChart();


 function makeMoodSummary() {
    for(i = 0; i < moodHistory.length; i++){
        if(moodHistory[i].moodCategory = "A1"){
            moodValue = moodValue + 1;
            anxi++;
        }else if(moodHistory[i].moodCategory = "A2"){
            moodValue = moodValue + 3;
            calm++;
        }else if(moodHistory[i].moodCategory = "A3"){
            moodValue = moodValue + 2;
            irri++;
        }else if(moodHistory[i].moodCategory = "B1"){
            moodValue = moodValue + 1;
            depr++;
        }else if(moodHistory[i].moodCategory = "B2"){
            moodValue = moodValue + 3;
            happ++;
        }else if(moodHistory[i].moodCategory = "B3"){
            moodValue = moodValue + 2;
            mad++;
        }else if(moodHistory[i].moodCategory = "B4"){
            moodValue = moodValue + 2;
            sad++;
        }else if(moodHistory[i].moodCategory = "C1"){
            moodValue = moodValue + 1;
            embr++;
        }else if(moodHistory[i].moodCategory = "C2"){
            moodValue = moodValue + 2;
            exci++;
        }

    }
    console.log(moodValue);
    moodAverage = moodValue / moodHistory.length;
    console.log(moodAverage);
    console.log(anxi);
    console.log(calm);
    console.log(irri);
    console.log(depr);
    console.log(happ);
    console.log(mad);
    console.log(sad);
    console.log(embr);
    console.log(exci);

 }
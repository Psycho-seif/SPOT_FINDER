// Function to generate simulated heart rate data
function generateHeartRate() {
  // Simulate heart rate data between 60 and 100 BPM
  return Math.floor(Math.random() * (100 - 60 + 1)) + 60;
}

// Function to update the chart with simulated heart rate data
function updateChart() {
  const data = [];
  const ctx = document.getElementById('myChart').getContext('2d');
  let lastHeartRate;

  // Create a new chart using Chart.js
  const myChart = new Chart(ctx, {
    type: 'line', // Type of chart
    data: {
      labels: [], // X-axis labels (empty initially)
      datasets: [{
        label: 'Heart Rate (BPM)', // Label for the dataset
        data: data, // Empty data initially
        backgroundColor: 'rgba(54, 162, 235, 0.2)', // Background color
        borderColor: 'rgba(54, 162, 235, 1)', // Border color
        borderWidth: 1 // Border width
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: false,
          suggestedMin: 60, // Minimum value on y-axis
          suggestedMax: 100 // Maximum value on y-axis
        }
      }
    }
  });

  // Function to update the chart every 3 seconds with simulated heart rate data
  const interval = setInterval(() => {
    const newHeartRate = generateHeartRate(); // Simulated heart rate
    data.push(newHeartRate); // Add the new heart rate data point

    // Update labels (optional, can be removed if not needed)
    const currentLabels = myChart.data.labels;
    const newLabel = currentLabels.length === 0 ? 1 : currentLabels[currentLabels.length - 1] + 1;
    myChart.data.labels.push(newLabel);

    // Update the chart
    myChart.update();

    if (newLabel >= 20) { // Update this condition to match the duration (20 for 1 minute)
      clearInterval(interval); // Stop updating after 1 minute
      lastHeartRate = newHeartRate;
      displayLastHeartRate(lastHeartRate);
    }
  }, 3000); // Update every 3 seconds
}

// Function to display the last heart rate reading
function displayLastHeartRate(heartRate) {
  const heartRateText = document.getElementById('heartRateText');
  heartRateText.innerHTML = `Heart rate (BPM) is: ${heartRate}`;
}


// Call the function to update the chart with simulated heart rate data when the page loads
window.onload = function() {
  updateChart();
  // Prevent scrolling on number change
  document.getElementById('chartContainer').addEventListener('touchmove', function(e) {
    e.preventDefault();
  }, { passive: false });
};
// Function to generate simulated SpO2 data
function generateSpO2() {
  // Simulate SpO2 data between 95 and 100
  return Math.floor(Math.random() * (100 - 95 + 1)) + 95;
}

// Function to update the chart with simulated SpO2 data
function updateChart() {
  const data = [];
  const ctx = document.getElementById('myChart').getContext('2d');
  let lastSpO2;

  // Create a new chart using Chart.js
  const myChart = new Chart(ctx, {
    type: 'line', // Type of chart
    data: {
      labels: [], // X-axis labels (empty initially)
      datasets: [{
        label: 'SpO2 (%)', // Label for the dataset
        data: data, // Empty data initially
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Background color
        borderColor: 'rgba(75, 192, 192, 1)', // Border color
        borderWidth: 1 // Border width
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: false,
          suggestedMin: 95, // Minimum value on y-axis
          suggestedMax: 100 // Maximum value on y-axis
        }
      }
    }
  });

  // Function to update the chart every 3 seconds with simulated SpO2 data
  const interval = setInterval(() => {
    const newSpO2 = generateSpO2(); // Simulated SpO2
    data.push(newSpO2); // Add the new SpO2 data point

    // Update labels (optional, can be removed if not needed)
    const currentLabels = myChart.data.labels;
    const newLabel = currentLabels.length === 0 ? 1 : currentLabels[currentLabels.length - 1] + 1;
    myChart.data.labels.push(newLabel);

    // Update the chart
    myChart.update();

    if (newLabel >= 20) { // Update this condition to match the duration (20 for 1 minute)
      clearInterval(interval); // Stop updating after 1 minute
      lastSpO2 = newSpO2;
      displayLastSpO2(lastSpO2);
    }
  }, 3000); // Update every 3 seconds
}

// Function to display the last SpO2 reading
function displayLastSpO2(SpO2) {
  const spo2Text = document.getElementById('spo2Text');
  spo2Text.innerHTML = `SpO2 is: ${SpO2}%`;
}

// Call the function to update the chart with simulated SpO2 data when the page loads
window.onload = function() {
  updateChart();
  // Prevent scrolling on number change
  document.getElementById('chartContainer').addEventListener('touchmove', function(e) {
    e.preventDefault();
  }, { passive: false });
};
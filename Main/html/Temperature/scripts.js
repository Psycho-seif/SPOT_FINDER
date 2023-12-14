    // Function to generate simulated temperature data
    function generateTemperature() {
      // Simulate temperature data between 33.5 and 36.5
      return (Math.random() * (36.5 - 33.5) + 33.5).toFixed(1);
    }

    // Function to update the chart with simulated temperature data
    function updateChart(chartId) {
      const data = [];
      const ctx = document.getElementById(chartId).getContext('2d');

      const myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: [],
          datasets: [{
            label: 'Temperature (°C)',
            data: data,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: false,
              suggestedMin: 33.5,
              suggestedMax: 36.5
            }
          }
        }
      });

      let readingsCount = 0;
      const interval = setInterval(() => {
        const temperature = generateTemperature();
        data.push(temperature);

        const currentLabels = myChart.data.labels;
        const newLabel = currentLabels.length === 0 ? 1 : currentLabels[currentLabels.length - 1] + 1;
        myChart.data.labels.push(newLabel);

        myChart.update();

        readingsCount++;
        if (readingsCount >= 30) {
          clearInterval(interval);
          displayFinalResult(chartId, temperature);
        }
      }, 2000); // Update every 2 seconds for 1 minute
    }

    // Function to display final result and calculate the difference
    function displayFinalResult(chartId, finalReading) {
      setTimeout(() => {
        const finalResult = document.getElementById('finalResult');
        finalResult.innerHTML += `Final reading for Chart ${chartId}: ${finalReading}°C<br>`;

        if (chartId === 'chart2') {
          const chart1FinalReading = parseFloat(document.getElementById('chart1').getContext('2d')._meta[0].dataset[0].data.slice(-1)[0]);
          const chart2FinalReading = parseFloat(finalReading);
          const difference = Math.abs(chart1FinalReading - chart2FinalReading);
          finalResult.innerHTML += `Difference between readings: ${difference.toFixed(1)}°C`;
        }
      }, 2000); // Show result after 2 seconds
    }

    // Function to show/hide charts and start temperature readings
    window.onload = function() {
      setTimeout(() => {
        document.getElementById('userMessage').style.display = 'none';
        document.getElementById('chart1').style.display = 'block';
        updateChart('chart1');
      }, 5000); // Hide user message and show Chart 1 after 5 seconds

      setTimeout(() => {
        document.getElementById('userMessage').innerText = 'Change sensor position if needed...';
        document.getElementById('chart1').style.display = 'none';
        document.getElementById('chart2').style.display = 'block';
        updateChart('chart2');
      }, 67000); // Hide Chart 1 after 1 minute and show Chart 2 after 2 seconds
    };
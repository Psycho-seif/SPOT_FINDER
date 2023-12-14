    fetch('Heart rate test.html')
      .then(response => response.text())
      .then(html => {
        // Extract the number from the second page
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const numberFromSecondPage = doc.querySelector('#number').textContent;

        // Display the number in the counter
        const counterElement = document.getElementById('counter');
        counterElement.textContent = numberFromSecondPage;
      })
      .catch(error => {
        console.log('Error fetching data:', error);
      });
function getLocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showUV, showError);
  } else {
      alert("Geolocation is not supported by this browser.");
  }
}

function showUV(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  // Use an API to get UV data based on the location (you may need an API key)
  // Example using OpenUV API
  const apiKey = 'openuv-il0rlq49wt9c-io';
  const apiUrl = `https://api.openuv.io/api/v1/uv?lat=${latitude}&lng=${longitude}&appid=${apiKey}`;

  fetch(apiUrl, {
      headers: {
          'x-access-token': apiKey // Include the API key in the request header
      }
  })
      .then(response => response.json())
      .then(data => {
          const uvIndex = data.result.uv;
          document.getElementById("uvLevel").innerHTML = `UV Index: ${uvIndex}`;

          // Check UV level and show appropriate message
          if (uvIndex > 3 && uvIndex < 8) {
              showMessage("Caution: UV levels are relatively high. Consider taking precautions.");
          } else if (uvIndex >= 8) {
              showMessage("Warning: UV levels are very high. Extra precautions are strongly advised, especially for individuals with skin cancer.");
          } else {
              showMessage("UV levels are within the normal range. Enjoy the outdoors responsibly!");
          }
      })
      .catch(error => console.log('Error fetching UV data:', error));
}

function showError(error) {
  switch(error.code) {
      case error.PERMISSION_DENIED:
          alert("User denied the request for Geolocation.");
          break;
      case error.POSITION_UNAVAILABLE:
          alert("Location information is unavailable.");
          break;
      case error.TIMEOUT:
          alert("The request to get user location timed out.");
          break;
      case error.UNKNOWN_ERROR:
          alert("An unknown error occurred.");
          break;
  }
}

function showMessage(message) {
  const messageContainer = document.getElementById("messageContainer");
  messageContainer.innerHTML = `<p>${message}</p>`;
  setTimeout(() => {
      messageContainer.innerHTML = '';
  }, 5000); // Message will disappear after 5 seconds (5000 milliseconds)
}

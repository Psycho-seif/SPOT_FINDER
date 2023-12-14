const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const photo = document.getElementById('photo');
const captureButton = document.getElementById('captureButton');
const fileInput = document.getElementById('fileInput');

// Access the user's camera
navigator.mediaDevices.getUserMedia({ video: true })
  .then((stream) => {
    video.srcObject = stream;
  })
  .catch((err) => {
    console.error('Error accessing the camera: ', err);
  });

// Capture photo from camera
captureButton.addEventListener('click', () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
  video.style.display = 'none';
  captureButton.style.display = 'none';
  photo.src = canvas.toDataURL('image/png');
  photo.style.display = 'block';
  analyzeImage(photo.src); // Call function to analyze image
});

// Analyze uploaded image
fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    photo.src = e.target.result;
    photo.style.display = 'block';
    video.style.display = 'none';
    captureButton.style.display = 'none';
    analyzeImage(photo.src); // Call function to analyze image
  };
  reader.readAsDataURL(file);
});

// Function to analyze image (simulated)
function analyzeImage(imageData) {
  // Simulating the analysis result
  const isSkinCancer = imageData.includes('data:image/png;base64'); // Checking if the image was captured (not uploaded)
  if (isSkinCancer) {
    alert("This image does not contain anything that can be a skin cancer.");
    // Provide advice for healthy skin
  } else {
    alert("This image shows signs of skin cancer with 89.07% accuracy. Type: Nevus.");
    // Advice for skin cancer case
  }
}

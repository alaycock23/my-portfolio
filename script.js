// Display a greeting in the console (useful for testing or debugging)
console.log("Welcome to my portfolio site!");

// Select the necessary elements
const images = document.querySelectorAll('.carousel-slide');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');

let currentIndex = 0; // Keep track of the currently displayed image

// Function to show the image at the specified index
function showImage(index) {
  // Hide all images
  images.forEach(image => image.style.display = 'none');

  // Show the image at the current index
  images[index].style.display = 'block';
}

// Event listener for the "previous" button
prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length; // Wrap around to the last image
  showImage(currentIndex);
});

// Event listener for the "next" button
nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % images.length; // Wrap around to the first image
  showImage(currentIndex);
});

// Initial call to show the first image
showImage(currentIndex);
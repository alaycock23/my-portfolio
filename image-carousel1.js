/* image-carousel.js */
document.addEventListener("DOMContentLoaded", () => {
    // Select the carousel container
    const carousel = document.querySelector(".carousel");
    // Select all images inside the carousel
    const images = document.querySelectorAll(".carousel img");
    // Get the total number of images
    const totalImages = images.length;
    let index = 0; // Track the current image index
    let isTransitioning = false; // Prevent multiple clicks while animating
  
    // Add event listener for the left navigation button
    document.querySelector(".left").addEventListener("click", () => {
      if (isTransitioning) return; // Prevent multiple transitions at once
      isTransitioning = true;
      index = (index - 1 + totalImages) % totalImages; // Loop to the last image if at the first one
      updateCarousel();
    });
  
    // Add event listener for the right navigation button
    document.querySelector(".right").addEventListener("click", () => {
      if (isTransitioning) return; // Prevent multiple transitions at once
      isTransitioning = true;
      index = (index + 1) % totalImages; // Loop to the first image if at the last one
      updateCarousel();
    });
  
    // Function to update the carousel position
    function updateCarousel() {
      const imageWidth = images[0].clientWidth; // Get the width of a single image
      carousel.style.transition = "transform 0.5s ease-in-out";
      carousel.style.transform = `translateX(-${index * imageWidth}px)`;
      setTimeout(() => {
        isTransitioning = false;
      }, 300); // Match transition duration
    }
  });
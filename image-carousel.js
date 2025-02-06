document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector(".carousel");
    const images = Array.from(document.querySelectorAll(".carousel img"));
    const totalImages = images.length;
    let index = totalImages; // Start at first real image after clones
    let isTransitioning = false;

    // Function to calculate the average step size
    function getAverageImageWidth() {
        let totalWidth = 0;
        images.forEach(img => {
            const imageWidth = img.clientWidth;
            const style = window.getComputedStyle(img);
            const margin = (parseFloat(style.marginLeft) || 0) + (parseFloat(style.marginRight) || 0);
            totalWidth += imageWidth + margin;
        });
        return totalWidth / totalImages; // Average width per image
    }

    let stepSize = getAverageImageWidth(); // Use the average image width

    // Clone images for seamless effect
    images.forEach(img => {
        let cloneStart = img.cloneNode(true);
        let cloneEnd = img.cloneNode(true);
        carousel.appendChild(cloneStart);  // Append at the end
        carousel.insertBefore(cloneEnd, images[0]); // Prepend at the beginning
    });

    // Get updated list of images including clones
    const allImages = document.querySelectorAll(".carousel img");
    const totalSlides = allImages.length;

    // Set initial position
    carousel.style.transform = `translateX(-${index * stepSize}px)`;

    // Function to move carousel
    function moveCarousel(newIndex) {
        if (isTransitioning) return;
        isTransitioning = true;
        index = newIndex;

        carousel.style.transition = "transform 0.5s ease-in-out";
        carousel.style.transform = `translateX(-${index * stepSize}px)`;

        setTimeout(() => {
            // **Fix for Seamless Left Movement**
            if (index <= 0) {
                carousel.style.transition = "none";
                index = totalImages;
                carousel.style.transform = `translateX(-${index * stepSize}px)`;
            }
            // **Fix for Seamless Right Movement**
            if (index >= totalSlides - totalImages) {
                carousel.style.transition = "none";
                index = totalImages;
                carousel.style.transform = `translateX(-${index * stepSize}px)`;
            }

            isTransitioning = false;
        }, 500);
    }

    // Left & Right Button Events
    document.querySelector(".left").addEventListener("click", () => moveCarousel(index - 1));
    document.querySelector(".right").addEventListener("click", () => moveCarousel(index + 1));

    // Handle Resizing
    window.addEventListener("resize", () => {
        stepSize = getAverageImageWidth(); // Recalculate average width
        carousel.style.transition = "none";
        carousel.style.transform = `translateX(-${index * stepSize}px)`;
    });
});
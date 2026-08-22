document.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById("track");
    const originalImages = Array.from(track.querySelectorAll("img"));
    const btnLeft = document.getElementById("btnLeft");
    const btnRight = document.getElementById("btnRight");
    
    // 1. Set up the Infinite Loop Clones
    // Prepend a full copy of the images to the left
    originalImages.slice().reverse().forEach(img => {
        const clone = img.cloneNode(true);
        track.insertBefore(clone, track.firstChild);
    });
    
    // Append a full copy of the images to the right
    originalImages.forEach(img => {
        const clone = img.cloneNode(true);
        track.appendChild(clone);
    });

    // 2. Select all images (Originals + Clones)
    const allImages = Array.from(track.querySelectorAll("img"));
    const totalOriginal = originalImages.length;
    
    // Start the index at the first *original* image (the middle set)
    let currentIndex = totalOriginal;
    let isTransitioning = false;

    function centerImage(instant = false) {
        if (allImages.length === 0) return;
        
        const containerCenter = track.parentElement.clientWidth / 2;
        const currentImg = allImages[currentIndex];
        
        // Find the exact mathematical midpoint of the active image
        const imgCenter = currentImg.offsetLeft + (currentImg.clientWidth / 2);
        const shift = imgCenter - containerCenter;
        
        // Toggle CSS transitions depending on if we are animating or instantly snapping
        if (instant) {
            track.style.transition = "none";
        } else {
            track.style.transition = "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)";
        }
        
        track.style.transform = `translateX(-${shift}px)`;
        
        // Highlight active image, dim all others
        allImages.forEach((img, index) => {
            if (index === currentIndex) {
                img.style.opacity = "1";
                img.style.transform = "scale(1.03)";
            } else {
                img.style.opacity = "0.35";
                img.style.transform = "scale(0.95)";
            }
        });
    }

    // Initialize layout instantly without animation
    setTimeout(() => centerImage(true), 150);
    window.addEventListener("resize", () => centerImage(true));

    // 3. The Infinite Loop "Snap" Magic
    track.addEventListener("transitionend", () => {
        isTransitioning = false;
        
        // If we slid backwards into the left cloned set
        if (currentIndex < totalOriginal) {
            currentIndex += totalOriginal; // Snap to the exact same image in the original set
            centerImage(true); // 'true' means instant, no animation
        } 
        // If we slid forwards into the right cloned set
        else if (currentIndex >= totalOriginal * 2) {
            currentIndex -= totalOriginal; // Snap back to the original middle set
            centerImage(true);
        }
    });

    btnRight.addEventListener("click", () => {
        if (isTransitioning) return;
        isTransitioning = true;
        currentIndex++;
        centerImage();
    });

    btnLeft.addEventListener("click", () => {
        if (isTransitioning) return;
        isTransitioning = true;
        currentIndex--;
        centerImage();
    });
});
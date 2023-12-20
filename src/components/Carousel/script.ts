
export function setupCarouselListener() {
    const slideContainerEls = Array.from(document.querySelectorAll<HTMLElement>('.slide-container'));
    
    slideContainerEls.forEach((slideContainer) => {
        const slides = Array.from(slideContainer.querySelectorAll<HTMLElement>('.slide'));
        const paginationButtons = Array.from(slideContainer.querySelectorAll<HTMLElement>('.pagination .bubble'));
        let currentActiveIndex = 0;
        
        paginationButtons.forEach((button, idx) => {
            button.addEventListener('click', () => {
                // Set the clicked pagination button to active and others to inactive
                paginationButtons.forEach(b => b.classList.remove('active'));
                button.classList.add('active');
                currentActiveIndex = idx;
                
                // Shift slides
                slides.forEach((slide, slideIdx) => {
                    if (slideIdx < idx) {
                        slide.style.transform = 'translateX(-100%)';
                    } else if (slideIdx > idx) {
                        slide.style.transform = 'translateX(100%)';
                    } else {
                        slide.style.transform = 'translateX(0%)';
                    }
                });
            });
        });
    
        let touchStartX: number;
        let touchEndX: number;
        let touchStartY: number;
        let touchEndY: number;
        const swipeThreshold = 40;
    
        slideContainer.addEventListener('touchstart', (event) => {
            touchStartX = event.changedTouches[0].clientX;
            touchStartY = event.changedTouches[0].clientY;
        }, { passive: true});

        slideContainer.addEventListener('touchmove', (event) => {
            touchEndX = event.changedTouches[0].clientX;
            touchEndY = event.changedTouches[0].clientY;
        }, { passive: true})
    
        slideContainer.addEventListener('touchend', (event) => {
            touchEndX = event.changedTouches[0].clientX;
            touchEndY = event.changedTouches[0].clientY;
            handleSwipe();
        }, { passive: true});
    
        function handleSwipe() {
            let deltaX = touchEndX - touchStartX;
    
            if (Math.abs(deltaX) < swipeThreshold) {
                return; // It's not a valid swipe, bail out!
            }
    
            if (deltaX < 0) { // Swipe Left
                if (currentActiveIndex < slides.length - 1) {
                    paginationButtons[currentActiveIndex + 1].click();
                }
            }
            if (deltaX > 0) { // Swipe Right
                if (currentActiveIndex > 0) {
                    paginationButtons[currentActiveIndex - 1].click();
                }
            }
        }
    });
}
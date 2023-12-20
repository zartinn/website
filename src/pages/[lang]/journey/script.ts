let isInitialLoad = true;

export function setupIntersectionObserver() {
    // Grab all the timelines
    const timelines = document.querySelectorAll('.timeline-sentinel');


    // Set up the options for the IntersectionObserver
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1
    };

    // Create the IntersectionObserver
    const observer = new IntersectionObserver(handleIntersect, options);

    // Start observing all the timelines
    timelines.forEach(timeline => {
      observer.observe(timeline);
    });
}

function handleIntersect(entries: IntersectionObserverEntry[]) {
    if (isInitialLoad) {
        const lastIntersectingElIdx = entries.findLastIndex(entry => entry.isIntersecting);
        for (let i = 0; i <= lastIntersectingElIdx; i++) {
        const parent = entries[i].target.closest('.journey-section');
        const upperTimelineHalf = parent?.querySelector('.upper-half');
        const lowerTimelineHalf = parent?.querySelector('.lower-half');
        const contentContainers = Array.from(parent!.querySelectorAll('.container'))
        
        for (const contentContainer of contentContainers) {
            contentContainer.classList.add('visible');
        }

        upperTimelineHalf?.classList.add('visible');
        if (i !== lastIntersectingElIdx) {
            lowerTimelineHalf?.classList.add('visible');
        }
        // TODO: does not work on hard reload
        requestAnimationFrame(() => {
            parent?.classList.remove('no-transition');
        });
        }
        isInitialLoad = false;
        return;
    }

    // IF NOT INITIAL PAGE LOAD:
    entries.forEach((entry) => {
        if (entry.isIntersecting) {        
        // Get the previous sibling's .timeline-bg
        const parent = entry.target.closest('.journey-section');
        const upperHalf = parent?.querySelector('.upper-half');
        const lowerHalfSibling = parent?.previousElementSibling?.querySelector('.lower-half');       
        
        const contentContainers = Array.from(parent!.querySelectorAll('.container'))
        
        for (const contentContainer of contentContainers) {
            contentContainer.classList.add('visible');
        }

        if (upperHalf) {
            upperHalf.classList.add('visible');
        }
        if (lowerHalfSibling) {
            lowerHalfSibling.classList.add('visible');
        }

        const nextSibling = parent?.nextElementSibling;
        if (!nextSibling) {
            const lowerHalf = parent?.querySelector('.lower-half');
            lowerHalf?.classList.add('visible');
        }
        }
    });
}
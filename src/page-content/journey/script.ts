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
        const parent = entries[i].target.closest('.timeline');
        const upperTimelineHalf = parent?.querySelector('.upper-half');
        const lowerTimelineHalf = parent?.querySelector('.lower-half');

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
        const closestParentTimeline = entry.target.closest('.journey-section');
        const upperHalf = closestParentTimeline?.querySelector('.upper-half');
        const lowerHalfSibling = closestParentTimeline?.previousElementSibling?.querySelector('.lower-half');

        if (upperHalf) {
            upperHalf.classList.add('visible');
        }
        if (lowerHalfSibling) {
            lowerHalfSibling.classList.add('visible');
        }

        const nextSibling = closestParentTimeline?.nextElementSibling;
        if (!nextSibling) {
            const lowerHalf = closestParentTimeline?.querySelector('.lower-half');
            lowerHalf?.classList.add('visible');
        }
        }
    });
}
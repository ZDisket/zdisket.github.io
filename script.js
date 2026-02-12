document.addEventListener('DOMContentLoaded', () => {
    const revealTargets = Array.from(document.querySelectorAll('.reveal'));

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        revealTargets.forEach((target) => observer.observe(target));
    } else {
        revealTargets.forEach((target) => target.classList.add('is-visible'));
    }

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (event) => {
            const targetId = anchor.getAttribute('href');
            if (!targetId || targetId === '#') {
                return;
            }

            const targetElement = document.querySelector(targetId);
            if (!targetElement) {
                return;
            }

            event.preventDefault();
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    const filterButtons = Array.from(document.querySelectorAll('.control-chip[data-filter]'));
    const timelineEntries = Array.from(document.querySelectorAll('.timeline-entry'));
    const timelineArcs = Array.from(document.querySelectorAll('.arc'));

    const refreshArcVisibility = () => {
        timelineArcs.forEach((arc) => {
            const visibleEntry = arc.querySelector('.timeline-entry:not(.is-hidden)');
            arc.classList.toggle('is-hidden-arc', !visibleEntry);
        });
    };

    filterButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;

            filterButtons.forEach((chip) => {
                chip.classList.toggle('is-active', chip === button);
            });

            timelineEntries.forEach((entry) => {
                const isMatch = filter === 'all' || entry.dataset.type === filter;
                entry.classList.toggle('is-hidden', !isMatch);
            });

            refreshArcVisibility();
        });
    });

    refreshArcVisibility();
});

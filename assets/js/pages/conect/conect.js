document.addEventListener("DOMContentLoaded", function() {

    const animateOnScroll = () => {
        const textElements = document.querySelectorAll('.text-content');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1 
        });

        textElements.forEach(element => {
            observer.observe(element);
        });
    };

    animateOnScroll();

});
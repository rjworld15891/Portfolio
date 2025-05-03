// Performance optimization script
document.addEventListener('DOMContentLoaded', function() {
    // Detect low-end devices
    const isLowEndDevice = () => {
        // Check for low memory (less than 4GB)
        if (navigator.deviceMemory && navigator.deviceMemory < 4) return true;
        
        // Check for slow CPU
        if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) return true;
        
        return false;
    };
    
    // Apply optimizations for low-end devices
    if (isLowEndDevice()) {
        // Reduce animation complexity
        document.body.classList.add('reduced-motion');
        
        // Lazy load images
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        img.src = img.dataset.src;
                        observer.disconnect();
                    }
                });
            });
            observer.observe(img);
        });
        
        // Throttle scroll and resize events
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            if (!scrollTimeout) {
                scrollTimeout = setTimeout(function() {
                    scrollTimeout = null;
                    // Handle scroll events here
                }, 100);
            }
        });
    }
});
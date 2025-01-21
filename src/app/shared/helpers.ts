export const ScrollToTop = (): void => {
    // Check if the browser supports the smooth scroll behavior
    if ('scrollBehavior' in document.documentElement.style) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    } else {
        // Fallback for older browsers
        window.scrollTo(0, 0);
    }
}
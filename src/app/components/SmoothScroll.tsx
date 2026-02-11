import { useEffect } from 'react';
import Lenis from 'lenis';

export const SmoothScroll = () => {
  useEffect(() => {
    // We only want Lenis to run when we have a vertical scrolling container (the detail view).
    // The main view is horizontal and uses its own physics engine.
    
    const detailContainer = document.getElementById('project-detail-container');
    
    // If we're not in a detail view, we don't need Lenis interfering with the main horizontal scroll.
    // However, since this component mounts once at App level, we need to handle dynamic elements.
    // Actually, a better approach for this specific architecture is to instantiate Lenis locally 
    // inside the ProjectDetail component, or use a global instance that targets a wrapper.
    
    // BUT, to fix the "buffering" issue quickly and safely:
    // We will initialize Lenis ONLY for the detail container when it exists.
    
    // Let's attach it to the window but ignore horizontal events, or better yet,
    // let's create a MutationObserver to detect when the detail view opens.
    
    let lenis: Lenis | null = null;
    let rafId: number;

    const initLenis = (wrapper: HTMLElement) => {
      if (lenis) lenis.destroy();
      
      lenis = new Lenis({
        wrapper: wrapper, // Target the specific container, not window
        content: wrapper.firstElementChild as HTMLElement, // The content inside
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      });

      function raf(time: number) {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);
    };

    const observer = new MutationObserver(() => {
      const container = document.getElementById('project-detail-container');
      if (container && !lenis) {
        // Detail view opened -> Enable Lenis on it
        initLenis(container);
      } else if (!container && lenis) {
        // Detail view closed -> Destroy Lenis
        lenis.destroy();
        lenis = null;
        cancelAnimationFrame(rafId);
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Initial check
    const container = document.getElementById('project-detail-container');
    if (container) initLenis(container);

    return () => {
      observer.disconnect();
      if (lenis) {
        lenis.destroy();
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return null;
};

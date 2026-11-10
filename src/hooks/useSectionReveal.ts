import { useEffect } from 'react';

export function useSectionReveal() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal-section]')
    );

    if (prefersReduced || !('IntersectionObserver' in window) || targets.length === 0) {
      targets.forEach((el) => {
        el.setAttribute('data-reveal', 'visible');
      });
      return;
    }

    const revealAllUpTo = (targetId: string) => {
      for (const el of targets) {
        el.setAttribute('data-reveal', 'visible');
        if (el.id === targetId) break;
      }
    };

    const viewportH = window.innerHeight || 800;

    targets.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top <= viewportH * 0.92) {
        el.setAttribute('data-reveal', 'visible');
      } else {
        el.setAttribute('data-reveal', 'pending');
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-reveal', 'visible');
            observer.unobserve(entry.target);
          }
        }
      },
      {
        threshold: 0.06,
        rootMargin: '0px 0px -32px 0px',
      }
    );

    targets.forEach((el) => {
      if (el.getAttribute('data-reveal') === 'pending') {
        observer.observe(el);
      }
    });

    const handleHashChange = () => {
      const id = window.location.hash.replace(/^#/, '');
      if (id) {
        revealAllUpTo(id);
      }
    };

    window.addEventListener('hashchange', handleHashChange);

    if (window.location.hash) {
      handleHashChange();
    }

    return () => {
      observer.disconnect();
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);
}

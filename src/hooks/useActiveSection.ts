import { useEffect, useState } from 'react';

const SECTION_IDS = [
  'home',
  'about',
  'platform',
  'how-it-works',
  'pricing',
  'faq',
];

export function useActiveSection() {
  const [activeId, setActiveId] = useState<string>('home');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    if (!('IntersectionObserver' in window)) {
      return () => {
        window.removeEventListener('scroll', onScroll);
      };
    }

    const visibleRatios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibleRatios.set(
            entry.target.id,
            entry.isIntersecting ? entry.intersectionRatio : 0
          );
        }

        let bestId = 'home';
        let bestScore = -1;
        for (const id of SECTION_IDS) {
          const score = visibleRatios.get(id) ?? 0;
          if (score > bestScore) {
            bestScore = score;
            bestId = id;
          }
        }
        if (bestScore > 0) {
          setActiveId(bestId);
        }
      },
      {
        rootMargin: '-22% 0px -55% 0px',
        threshold: [0, 0.15, 0.4, 0.75],
      }
    );

    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return { activeId, isScrolled };
}

import { useEffect } from 'react';

export default function useReveals(root) {
  useEffect(() => {
    const motion = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (!window.IntersectionObserver || motion?.matches) return;
    const animations = [];
    const observer = new IntersectionObserver(entries => {
      if (motion?.matches) return;
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        animations.push(entry.target.animate([{ opacity: 0, transform: 'translateY(18px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 650, easing: 'cubic-bezier(.2,.6,.3,1)' }));
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.15 });
    const onMotion = () => {
      if (!motion.matches) return;
      observer.disconnect();
      animations.forEach(animation => animation.cancel());
    };
    motion?.addEventListener('change', onMotion);
    root.current.querySelectorAll('.heading,.label,.blog-posts__text').forEach(node => observer.observe(node));
    return () => { motion?.removeEventListener('change', onMotion); observer.disconnect(); animations.forEach(animation => animation.cancel()); };
  }, [root]);
}

'use client';

import React, { useEffect, useRef } from 'react';

/**
 * Rolls a figure up from zero the first time it scrolls into view.
 *
 * The value is free text the admin types ("120+", "1,200", "₹5L"), so we
 * animate the first run of digits and leave whatever surrounds it alone.
 *
 * The final value is what React renders, so the number is correct before
 * hydration and with JS off. The animation only writes to the DOM node, which
 * keeps it out of React's render cycle entirely.
 */
export default function CountUp({
  value,
  className,
  duration = 1600,
}: {
  value: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const match = value.match(/[\d,]+/);
    const target = match ? Number(match[0].replace(/,/g, '')) : NaN;
    if (!match || Number.isNaN(target) || target === 0) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const prefix = value.slice(0, match.index);
    const suffix = value.slice(match.index! + match[0].length);
    const render = (n: number) => `${prefix}${n.toLocaleString('en-IN')}${suffix}`;

    node.textContent = render(0);

    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        const step = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          // easeOutCubic — quick off the mark, settles gently on the final number
          const eased = 1 - Math.pow(1 - progress, 3);
          node.textContent = render(Math.round(target * eased));
          if (progress < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      node.textContent = value;
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}

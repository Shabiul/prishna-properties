import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";

type RevealDirection = "up" | "down" | "left" | "right" | "none";

interface UseScrollRevealOptions {
  direction?: RevealDirection;
  distance?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  threshold?: number; // 0-1, how much of the element must be visible
  once?: boolean;
}

/**
 * Hook that animates child elements into view as they scroll into the viewport.
 * Uses GSAP ScrollTrigger integrated with Lenis smooth scroll.
 *
 * @example
 * ```tsx
 * function MySection() {
 *   const ref = useScrollReveal({ direction: "up", stagger: 0.1 });
 *   return (
 *     <div ref={ref}>
 *       <div>Animates in</div>
 *       <div>Staggered</div>
 *     </div>
 *   );
 * }
 * ```
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollRevealOptions = {}
) {
  const {
    direction = "up",
    distance = 60,
    duration = 0.8,
    delay = 0,
    stagger = 0.08,
    threshold = 0.15,
    once = true,
  } = options;

  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const children = el.children;
    const targets = children.length > 0 ? Array.from(children) : [el];

    // Starting position based on direction
    const fromVars: gsap.TweenVars = {
      opacity: 0,
      ...(direction === "up" && { y: distance }),
      ...(direction === "down" && { y: -distance }),
      ...(direction === "left" && { x: distance }),
      ...(direction === "right" && { x: -distance }),
    };

    const toVars: gsap.TweenVars = {
      opacity: 1,
      x: 0,
      y: 0,
      duration,
      delay,
      stagger: children.length > 0 ? stagger : 0,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: `top ${100 - threshold * 100}%`,
        toggleActions: once ? "play none none none" : "play reverse play reverse",
      },
    };

    gsap.set(targets, fromVars);
    const tween = gsap.to(targets, toVars);

    return () => {
      tween.kill();
      // Clean up the associated ScrollTrigger
      const st = tween.scrollTrigger;
      if (st) st.kill();
    };
  }, [direction, distance, duration, delay, stagger, threshold, once]);

  return ref;
}

/**
 * Parallax scroll effect for background elements
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(
  speed: number = 0.3
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tween = gsap.to(el, {
      yPercent: -speed * 100,
      ease: "none",
      scrollTrigger: {
        trigger: el.parentElement || el,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      tween.kill();
      const st = tween.scrollTrigger;
      if (st) st.kill();
    };
  }, [speed]);

  return ref;
}

/**
 * Section header reveal with a staggered title + subtitle pattern
 */
export function useSectionReveal<T extends HTMLElement = HTMLDivElement>(
  options: { delay?: number } = {}
) {
  return useScrollReveal<T>({
    direction: "up",
    distance: 40,
    duration: 0.7,
    delay: options.delay ?? 0,
    stagger: 0.12,
    threshold: 0.2,
  });
}

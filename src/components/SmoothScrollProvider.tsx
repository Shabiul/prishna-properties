import { useEffect, useRef, createContext, useContext } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "../lib/gsap";

// ─── Context ─────────────────────────────────────────────
interface SmoothScrollContextType {
  lenis: Lenis | null;
  scrollTo: (target: string | number | HTMLElement, options?: { offset?: number; duration?: number; immediate?: boolean }) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  lenis: null,
  scrollTo: () => {},
});

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

// ─── Exported singleton (backward compat for ScrollToTop) ─
export let lenisInstance: Lenis | null = null;

// ─── Provider ────────────────────────────────────────────
export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const location = useLocation();
  const navigationType = useNavigationType(); // "POP" = back/forward, "PUSH" = new navigation

  useEffect(() => {
    // Create Lenis instance with premium feel
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.8,
      infinite: false,
    });

    lenisRef.current = lenis;
    lenisInstance = lenis;

    // ── Integrate Lenis → GSAP ScrollTrigger ──
    // This ensures ScrollTrigger uses Lenis's smooth scroll position
    lenis.on("scroll", ScrollTrigger.update);

    // Use GSAP ticker to drive Lenis (keeps everything in sync)
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000); // GSAP ticker time is in seconds, Lenis expects ms
    };
    gsap.ticker.add(tickerCallback);

    // Prevent GSAP from lagging behind Lenis
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
      lenisInstance = null;
    };
  }, []);

  // ── Handle anchor scrolling on route change ──
  useEffect(() => {
    const lenis = lenisRef.current;
    if (lenis) {
      // Small delay to let new route DOM render
      requestAnimationFrame(() => {
        if (location.hash) {
          // Scroll to anchor
          const targetElement = document.querySelector(location.hash) as HTMLElement | null;
          if (targetElement) {
            lenis.scrollTo(targetElement, { offset: -80 }); // Offset for fixed navbar
          }
        } else if (navigationType === "PUSH") {
          // Only scroll to top on new navigation without anchor
          lenis.scrollTo(0, { immediate: true });
        }
        // Refresh ScrollTrigger after route change regardless
        ScrollTrigger.refresh();
      });
    }
  }, [location.pathname, location.hash, navigationType]);

  // ── scrollTo helper ──
  const scrollTo: SmoothScrollContextType["scrollTo"] = (target, options) => {
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(target, {
        offset: options?.offset ?? 0,
        duration: options?.duration ?? 1.4,
        immediate: options?.immediate ?? false,
      });
    }
  };

  return (
    <SmoothScrollContext.Provider value={{ lenis: lenisRef.current, scrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}

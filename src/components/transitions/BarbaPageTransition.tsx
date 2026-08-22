import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";

interface BarbaPageTransitionProps {
  children: React.ReactNode;
}

export const BarbaPageTransition: React.FC<BarbaPageTransitionProps> = ({ children }) => {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const isFirstMount = useRef(true);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      // Trigger media loader on initial mount
      if ((window as any).PexelsLoader?.loadAll) {
        (window as any).PexelsLoader.loadAll();
      }
      return;
    }

    // Seamless Barba-style Page Transition with GSAP
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Re-initialize Pexels and ScrollTrigger after transition completes
          if ((window as any).PexelsLoader?.loadAll) {
            (window as any).PexelsLoader.loadAll();
          }
          if ((window as any).ScrollTrigger) {
            (window as any).ScrollTrigger.refresh();
          }
        },
      });

      // Quick smooth wipe curtain and container entrance
      if (curtainRef.current && containerRef.current) {
        tl.set(curtainRef.current, { scaleY: 0, transformOrigin: "bottom" })
          .to(curtainRef.current, {
            scaleY: 1,
            duration: 0.28,
            ease: "power3.inOut",
          })
          .add(() => {
            window.scrollTo({ top: 0, left: 0, behavior: "instant" });
          })
          .set(containerRef.current, { opacity: 0, y: 15 })
          .set(curtainRef.current, { transformOrigin: "top" })
          .to(curtainRef.current, {
            scaleY: 0,
            duration: 0.35,
            ease: "power3.out",
          })
          .to(
            containerRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
              ease: "power2.out",
            },
            "-=0.2"
          );
      } else if (containerRef.current) {
        tl.fromTo(
          containerRef.current,
          { opacity: 0.2, y: 10 },
          { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
        );
      }
    });

    return () => ctx.revert();
  }, [location.pathname]);

  return (
    <div data-barba="wrapper" className="barba-wrapper" style={{ position: "relative", minHeight: "100vh" }}>
      {/* Top transition curtain */}
      <div
        ref={curtainRef}
        className="barba-curtain"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "#ff2a4b",
          zIndex: 99999,
          pointerEvents: "none",
          transform: "scaleY(0)",
        }}
      />

      <div
        ref={containerRef}
        data-barba="container"
        data-barba-namespace={location.pathname}
        className="barba-container"
      >
        {children}
      </div>
    </div>
  );
};

export default BarbaPageTransition;

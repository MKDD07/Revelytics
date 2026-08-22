/**
 * ============================================================
 *  GSAP SMOOTH SCROLL — Desktop Only (No Touch Screens)
 * ============================================================
 * Uses GSAP ScrollSmoother for buttery smooth scrolling.
 * Automatically disabled on touch devices (phones/tablets)
 * to preserve native momentum scrolling.
 * ============================================================
 */
(function () {
  "use strict";

  // Detect touch device
  function isTouchDevice() {
    return (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches
    );
  }

  // Only init smooth scroll on non-touch (desktop) devices
  if (isTouchDevice()) {
    // Remove fixed-position wrapper styles that would break native scroll on mobile
    var wrapper = document.getElementById("smooth-wrapper");
    var content = document.getElementById("smooth-content");
    if (wrapper) wrapper.style.overflow = "visible";
    if (content) content.style.overflow = "visible";
    return;
  }

  // Wait for GSAP + ScrollTrigger to be available
  function waitForGSAP(callback, maxAttempts) {
    var attempts = 0;
    var interval = setInterval(function () {
      attempts++;
      if (window.gsap && window.ScrollTrigger) {
        clearInterval(interval);
        callback();
      } else if (attempts >= (maxAttempts || 50)) {
        clearInterval(interval);
        console.warn("[SmoothScroll] GSAP or ScrollTrigger not found, skipping smooth scroll.");
      }
    }, 100);
  }

  waitForGSAP(function () {
    var gsap = window.gsap;
    var ScrollTrigger = window.ScrollTrigger;

    // Check if ScrollSmoother is available (GSAP premium plugin)
    if (window.ScrollSmoother) {
      gsap.registerPlugin(ScrollTrigger, window.ScrollSmoother);

      window.ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.5,
        effects: true,
        smoothTouch: false,    // Disable on touch
        normalizeScroll: true, // Prevents address-bar-resize jank on desktop
      });

      console.log("[SmoothScroll] GSAP ScrollSmoother initialized (desktop only).");
    } else {
      // Fallback: Use pure GSAP + ScrollTrigger for Lenis-style smooth scroll
      // This approach intercepts wheel events and animates scroll position smoothly
      var scrollTarget = 0;
      var currentScroll = 0;
      var ease = 0.08;
      var scrollBody = document.getElementById("smooth-content") || document.documentElement;
      var isScrolling = false;
      var rafId = null;

      function getMaxScroll() {
        return document.body.scrollHeight - window.innerHeight;
      }

      function smoothScrollLoop() {
        currentScroll += (scrollTarget - currentScroll) * ease;

        // Stop animating when close enough
        if (Math.abs(scrollTarget - currentScroll) < 0.5) {
          currentScroll = scrollTarget;
          isScrolling = false;
        }

        window.scrollTo(0, currentScroll);

        // Refresh ScrollTrigger so GSAP animations stay in sync
        if (ScrollTrigger) {
          ScrollTrigger.update();
        }

        if (isScrolling) {
          rafId = requestAnimationFrame(smoothScrollLoop);
        }
      }

      // Intercept wheel events for smooth interpolation
      window.addEventListener(
        "wheel",
        function (e) {
          e.preventDefault();

          scrollTarget += e.deltaY;
          scrollTarget = Math.max(0, Math.min(scrollTarget, getMaxScroll()));

          if (!isScrolling) {
            isScrolling = true;
            currentScroll = window.scrollY;
            rafId = requestAnimationFrame(smoothScrollLoop);
          }
        },
        { passive: false }
      );

      // Sync on resize
      window.addEventListener("resize", function () {
        scrollTarget = Math.min(scrollTarget, getMaxScroll());
      });

      // Sync if user scrolls via scrollbar/keyboard
      var syncTimeout;
      window.addEventListener("scroll", function () {
        if (!isScrolling) {
          clearTimeout(syncTimeout);
          syncTimeout = setTimeout(function () {
            scrollTarget = window.scrollY;
            currentScroll = window.scrollY;
          }, 100);
        }
      });

      console.log("[SmoothScroll] GSAP smooth scroll fallback initialized (desktop only).");
    }
  });
})();

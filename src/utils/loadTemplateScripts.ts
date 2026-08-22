/**
 * loadScript - loads a <script> tag dynamically and returns a promise
 * that resolves when the script has fully loaded.
 */
function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // Avoid double-loading the same script
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.async = false;
    script.onload = () => resolve();
    script.onerror = () => {
      console.warn(`Failed to load script: ${src}`);
      resolve(); // resolve anyway so chain continues
    };
    document.body.appendChild(script);
  });
}

/**
 * loadTemplateScripts - loads all template vendor + theme JS in strict order
 * AFTER React has fully mounted all DOM components.
 * main.js runs last — at that point every element GSAP, Swiper,
 * magnific-popup etc. need is already in the DOM.
 */
export async function loadTemplateScripts(): Promise<void> {
  const scripts = [
    "/assets/js/vendor/jquery.js",
    "/assets/js/bootstrap.min.js",
    "/assets/js/plugin.js",        // GSAP 3, ScrollTrigger, ScrollSmoother
    "/assets/js/split-type.js",
    "/assets/js/three.js",
    "/assets/js/hover-effect.umd.js",
    "/assets/js/swiper-bundle.js",
    "/assets/js/magnific-popup.js",
    "/assets/js/nice-select.js",
    "/assets/js/purecounter.js",
    "/assets/js/ajax-form.js",
    "/assets/js/slider-init.js",   // Swiper slider init
    "/assets/js/main.js",          // All GSAP animations — runs last
    "/assets/js/smooth-scroll.js", // GSAP smooth scroll — desktop only
    "/assets/js/pexels.js",
    "/assets/js/tp-cursor.js",
  ];

  // Load scripts sequentially (order matters — jquery before main.js etc.)
  for (const src of scripts) {
    await loadScript(src);
  }

  // DOMContentLoaded has already fired by the time scripts are dynamically injected,
  // so pexels.js auto-run won't trigger. Call it manually after all scripts are ready.
  if ((window as any).PexelsLoader?.loadAll) {
    (window as any).PexelsLoader.loadAll();
  }
}

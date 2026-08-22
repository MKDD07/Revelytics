/**
 * ============================================================
 *  PEXELS MEDIA LOADER SCRIPT
 * ============================================================
 * Automatically loads images/videos from the Pexels API based
 * on `data-target` attributes on <img> or <video> elements.
 *
 * USAGE (HTML):
 * -------------------------------------------------------------
 * <img data-pexels="mountains" data-type="image" data-quality="large">
 * <img data-pexels="ocean waves" data-type="image" data-quality="original">
 * <video data-pexels="city traffic" data-type="video" data-quality="hd" autoplay muted loop></video>
 *
 * ATTRIBUTES:
 * -------------------------------------------------------------
 * data-pexels   -> search query (required)
 * data-type     -> "image" | "video" (default: "image")
 * data-quality  -> IMAGE: "original" | "large2x" | "large" | "medium" | "small" | "tiny"
 *                  VIDEO: "hd" | "sd" | "uhd" (default fallback: largest available)
 * data-orientation -> "landscape" | "portrait" | "square" (optional)
 * data-index    -> which result index to use, default 0 (optional)
 *
 * SETUP:
 * -------------------------------------------------------------
 * 1. Get a free API key from https://www.pexels.com/api/
 * 2. Replace PEXELS_API_KEY below with your key.
 * 3. Include this script at the end of <body> or after DOM load.
 * ============================================================
 */
 /*
 <!-- IMAGE EXAMPLE -->
 <img data-pexels="mountains" data-type="image" data-quality="large" data-orientation="landscape" alt="Mountains" width="600"/>
<!-- VIDEO EXAMPLE -->
<video data-pexels="ocean waves" data-type="video" data-quality="hd" data-orientation="landscape" autoplay muted loop playsinline width="600"
></video>
*/
const PEXELS_API_KEY = "y6WP5reQNH7abdL2uzdLTyV8pq0kMmF3CHf7ZNkiHo98DXIvORUOBSfi"; // <-- Replace with your Pexels API key
const PEXELS_IMAGE_ENDPOINT = "https://api.pexels.com/v1/search";
const PEXELS_VIDEO_ENDPOINT = "https://api.pexels.com/videos/search";

/**
 * Fetch image results from Pexels
 */
async function fetchPexelsImage(query, orientation) {
  const url = new URL(PEXELS_IMAGE_ENDPOINT);
  url.searchParams.set("query", query);
  url.searchParams.set("per_page", "5");
  if (orientation) url.searchParams.set("orientation", orientation);

  const res = await fetch(url, {
    headers: { Authorization: PEXELS_API_KEY },
  });
  if (!res.ok) throw new Error(`Pexels image API error: ${res.status}`);
  const data = await res.json();
  return data.photos || [];
}

/**
 * Fetch video results from Pexels
 */
async function fetchPexelsVideo(query, orientation) {
  const url = new URL(PEXELS_VIDEO_ENDPOINT);
  url.searchParams.set("query", query);
  url.searchParams.set("per_page", "5");
  if (orientation) url.searchParams.set("orientation", orientation);

  const res = await fetch(url, {
    headers: { Authorization: PEXELS_API_KEY },
  });
  if (!res.ok) throw new Error(`Pexels video API error: ${res.status}`);
  const data = await res.json();
  return data.videos || [];
}

/**
 * Pick correct image URL by quality/size key
 * Available Pexels sizes:
 * original, large2x, large, medium, small, portrait, landscape, tiny
 */
function pickImageUrl(photo, quality) {
  const src = photo.src || {};
  return src[quality] || src.original || src.large || "";
}

/**
 * Pick correct video file URL by quality
 * Available Pexels video qualities: hd, sd, uhd (varies per video)
 */
function pickVideoUrl(video, quality) {
  const files = video.video_files || [];
  // Try exact quality match first
  let match = files.find((f) => f.quality === quality);
  // Fallback: pick highest resolution available
  if (!match) {
    match = files.sort((a, b) => (b.width || 0) - (a.width || 0))[0];
  }
  return match ? match.link : "";
}

/**
 * Apply loaded media to the target element
 */
function applyMedia(el, type, url) {
  if (!url) return;
  if (type === "video") {
    el.src = url;
    el.load?.();
  } else {
    el.src = url;
    // Enforce 408x360 sizing for all pexels images unless parent overrides
    if (!el.closest(".tp-banner-thumb") && !el.closest(".ca-portfolio") && !el.closest(".tp-about-thumb") && !el.closest(".subscribe-popup")) {
      el.style.width = "100%";
      el.style.maxWidth = "408px";
      el.style.height = "360px";
      el.style.objectFit = "cover";
      el.setAttribute("width", "408");
      el.setAttribute("height", "360");
    }
  }
}

/**
 * Process a single element with data-pexels attribute
 */
async function processElement(el) {
  const query = el.getAttribute("data-pexels");
  if (!query) return;

  const type = (el.getAttribute("data-type") || "image").toLowerCase();
  const quality = el.getAttribute("data-quality") || (type === "video" ? "hd" : "large");
  const orientation = el.getAttribute("data-orientation") || null;
  const index = parseInt(el.getAttribute("data-index") || "0", 10);

  try {
    if (type === "video") {
      const videos = await fetchPexelsVideo(query, orientation);
      const video = videos[index] || videos[0];
      if (video) applyMedia(el, "video", pickVideoUrl(video, quality));
    } else {
      const photos = await fetchPexelsImage(query, orientation);
      const photo = photos[index] || photos[0];
      if (photo) applyMedia(el, "image", pickImageUrl(photo, quality));
    }
  } catch (err) {
    console.error(`Pexels load failed for query "${query}":`, err);
  }
}

/**
 * Scan the DOM and process all elements with data-pexels attribute
 */
function loadAllPexelsMedia(root = document) {
  const elements = root.querySelectorAll("[data-pexels]");
  elements.forEach((el) => processElement(el));
}

// Auto-run on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  loadAllPexelsMedia();
});

/**
 * Expose globally for manual/dynamic use
 * Example: PexelsLoader.load(document.querySelector('#myImg'));
 */
window.PexelsLoader = {
  load: processElement,
  loadAll: loadAllPexelsMedia,
  fetchImage: fetchPexelsImage,
  fetchVideo: fetchPexelsVideo,
};
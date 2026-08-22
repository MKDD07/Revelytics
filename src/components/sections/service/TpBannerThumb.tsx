import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface TpBannerThumbProps {
  imageQuery?: string;
  altText?: string;
  service?: any;
}

export const TpBannerThumb: React.FC<TpBannerThumbProps> = ({
  imageQuery,
  altText,
  service,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const query = imageQuery || service?.hero_pexels_query || "luxury hotel resort aerial pool sunset";
  const alt = altText || service?.title || "Revelytics Service Banner";

  useEffect(() => {
    const container = containerRef.current;
    const img = imgRef.current;
    if (!container || !img) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        img,
        { scale: 1.25, yPercent: -10 },
        {
          scale: 1.0,
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="tp-banner-thumb fix w-100 scale-up-img my-4"
      style={{ overflow: "hidden", position: "relative" }}
    >
      <img
        ref={imgRef}
        data-speed="0.4"
        data-pexels={query}
        data-type="image"
        data-quality="original"
        className="img-cover scale-up"
        alt={alt}
        src="/assets/img/banner/thumb-4.jpg"
        style={{
          width: "100%",
          maxHeight: "550px",
          objectFit: "cover",
          display: "block",
          transformOrigin: "center center",
          willChange: "transform",
        }}
      />
    </div>
  );
};

export default TpBannerThumb;

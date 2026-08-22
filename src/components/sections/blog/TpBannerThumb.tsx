import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface TpBannerThumbProps {
  imageQuery?: string;
  altText?: string;
  src?: string;
}

export const TpBannerThumb: React.FC<TpBannerThumbProps> = ({
  imageQuery = "luxury resort infinity pool sunset tropical",
  altText = "Luxury Resort Sunset View",
  src = "https://images.pexels.com/photos/23696835/pexels-photo-23696835.jpeg",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Parallax effect with GSAP ScrollTrigger
    const container = containerRef.current;
    const img = imgRef.current;
    if (!container || !img) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        img,
        {
          scale: 1.25,
          yPercent: -10,
        },
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
      className="tp-banner-thumb fix w-100 scale-up-img"
      style={{ overflow: "hidden", position: "relative" }}
    >
      <img
        ref={imgRef}
        data-speed="0.4"
        data-pexels={imageQuery}
        data-type="image"
        data-quality="original"
        className="img-cover scale-up"
        alt={altText}
        src={src}
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

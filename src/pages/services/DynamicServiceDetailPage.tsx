import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PageWrapper } from "../../layouts/PageWrapper";
import {
  TpServiceDetailsBannerArea,
  TpBannerThumb,
  TpProcessArea,
  TpServiceOverviewArea,
  TpFaqArea,
} from "../../components/sections/service";
import TpButton from "../../components/common/TpButton";

export interface ServiceSectionItem {
  id: number;
  service_id: number;
  heading: string;
  body?: string;
  pexels_query: string;
  icon_pexels_query?: string;
  image_alt?: string;
  display_order: number;
  is_active: number;
}

export interface D1Service {
  id?: number;
  slug: string;
  parent_slug?: string;
  title: string;
  short_desc?: string;
  short_description?: string;
  hero_title?: string;
  hero_description?: string;
  hero_pexels_query?: string;
  og_pexels_query?: string;
  cta_text?: string;
  cta_url?: string;
  content?: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  canonical_url?: string;
  meta_robots?: string;
  focus_keyword?: string;
  og_title?: string;
  og_description?: string;
  og_type?: string;
  og_url?: string;
  og_site_name?: string;
  og_locale?: string;
  twitter_card?: string;
  twitter_title?: string;
  twitter_description?: string;
  schema_type?: string;
  schema_json?: string;
  hreflang?: string;
  breadcrumb_title?: string;
  sections?: ServiceSectionItem[];
}

export const DynamicServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [d1Data, setD1Data] = useState<D1Service | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [notFound, setNotFound] = useState<boolean>(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setNotFound(false);

    fetch(`/api/services/${slug}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Not found");
        }
        return res.json();
      })
      .then((data: D1Service) => {
        if (data && data.title) {
          setD1Data(data);
        } else {
          setNotFound(true);
        }
      })
      .catch(() => {
        setNotFound(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug]);

  // Update SEO Meta tags and JSON-LD structured schema dynamically
  useEffect(() => {
    if (!d1Data) return;

    // 1. Title & Meta description
    document.title = d1Data.meta_title || `${d1Data.title} | Revelytics Hospitality Solutions`;

    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    if (d1Data.meta_description || d1Data.short_desc) {
      setMeta("description", d1Data.meta_description || d1Data.short_desc || "");
    }
    if (d1Data.meta_keywords || d1Data.focus_keyword) {
      setMeta("keywords", d1Data.meta_keywords || d1Data.focus_keyword || "hospitality marketing, revenue management");
    }
    setMeta("robots", d1Data.meta_robots || "index, follow");

    // 2. OpenGraph
    const canonical = d1Data.canonical_url || `https://www.revlytics.in/services/${d1Data.slug}`;
    setMeta("og:title", d1Data.og_title || d1Data.title, true);
    setMeta("og:description", d1Data.og_description || d1Data.meta_description || d1Data.short_desc || "", true);
    setMeta("og:url", canonical, true);
    setMeta("og:type", d1Data.og_type || "website", true);
    setMeta("og:site_name", d1Data.og_site_name || "Revelytics", true);

    // 3. Twitter
    setMeta("twitter:card", d1Data.twitter_card || "summary_large_image");
    setMeta("twitter:title", d1Data.twitter_title || d1Data.title);
    setMeta("twitter:description", d1Data.twitter_description || d1Data.meta_description || "");

    // 4. Canonical link tag
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement("link");
      linkCanonical.setAttribute("rel", "canonical");
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute("href", canonical);

    // 5. JSON-LD Structured Data Schema
    let scriptSchema = document.getElementById("revelytics-service-schema");
    if (!scriptSchema) {
      scriptSchema = document.createElement("script");
      scriptSchema.id = "revelytics-service-schema";
      scriptSchema.setAttribute("type", "application/ld+json");
      document.head.appendChild(scriptSchema);
    }

    const schemaObj = d1Data.schema_json
      ? JSON.parse(d1Data.schema_json)
      : {
          "@context": "https://schema.org",
          "@type": d1Data.schema_type || "Service",
          "name": d1Data.title,
          "description": d1Data.meta_description || d1Data.short_desc,
          "provider": {
            "@type": "Organization",
            "name": "Revelytics",
            "url": "https://www.revlytics.in",
          },
          "serviceType": "Hospitality & Hotel Revenue Management",
          "areaServed": "India",
          "url": canonical,
        };

    scriptSchema.textContent = JSON.stringify(schemaObj);

    return () => {
      if (scriptSchema && scriptSchema.parentNode) {
        scriptSchema.parentNode.removeChild(scriptSchema);
      }
    };
  }, [d1Data]);

  if (notFound && !loading) {
    return (
      <PageWrapper>
        <div className="container py-120 text-center">
          <h2 className="tp-ff-sequel-medium fs-36 text-danger mb-3">Service Not Found</h2>
          <p className="text-secondary mb-4">
            The requested service <code>{slug}</code> is not found in the Cloudflare D1 database.
          </p>
          <TpButton to="/services" text="Back to All Services" wrapperClassName="d-flex justify-content-center" />
        </div>
      </PageWrapper>
    );
  }

  const title = d1Data?.title || (slug ? slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()) : "Service");
  const heroDescription = d1Data?.short_desc || d1Data?.hero_description || (d1Data?.parent_slug ? "Specialized Hospitality Solution" : "Hospitality & Travel Solutions");
  const heroPexelsQuery = d1Data?.hero_pexels_query || "luxury hotel resort";

  return (
    <PageWrapper>
      {/* 1. tp-service-details-banner-area */}
      <TpServiceDetailsBannerArea
        title={title}
        subtitle={heroDescription}
        service={d1Data}
      />

      {/* 2. tp-banner-thumb */}
      <TpBannerThumb
        imageQuery={heroPexelsQuery}
        altText={title}
        service={d1Data}
      />

      {/* 3. tp-process-area */}
      <TpProcessArea service={d1Data} />

      {/* 4. tp-service-overview-area */}
      <TpServiceOverviewArea service={d1Data} />

      {/* 5. tp-faq-area */}
      <TpFaqArea service={d1Data} />
    </PageWrapper>
  );
};

export default DynamicServiceDetailPage;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export interface FooterServiceItem {
  id: number;
  slug: string;
  title: string;
  parent_slug?: string | null;
}

export const Footer: React.FC = () => {
  const [services, setServices] = useState<FooterServiceItem[]>([]);

  useEffect(() => {
    fetch("/api/services")
      .then((res) => (res.ok ? res.json() : []))
      .then((data: FooterServiceItem[]) => {
        if (Array.isArray(data) && data.length > 0) {
          const rootServices = data.filter((s) => !s.parent_slug);
          setServices(rootServices.length > 0 ? rootServices : data);
        }
      })
      .catch(() => {});
  }, []);

  const hospitalityServices = services.slice(0, 6);
  const growthServices = services.slice(6, 12);

  return (
    <footer>
      <div className="tp-footer-area pt-120 black-bg">
        <div className="container">
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-6">
              <div className="tp-footer-widget mb-40 opacity-70">
                <div className="tp-footer-logo mb-25">
                  <Link to="/">
                    <img data-width="200" src="/assets/img/logo/logo-white.svg" alt="Revelytics" />
                  </Link>
                </div>
                <p className="text-white opacity-50">
                  India&apos;s premier hospitality and travel digital marketing agency driving revenue, direct bookings, and performance growth for hotels and resorts.
                </p>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6">
              <div className="tp-footer-widget mb-40 opacity-70">
                <h4 className="tp-footer-widget-title text-white mb-20">Hospitality Services</h4>
                <ul className="tp-footer-list">
                  {hospitalityServices.map((s, idx) => (
                    <li key={s.id || idx}>
                      <Link className="text-white" style={{ color: "#ffffff" }} to={`/services/${s.slug}`}>{s.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6">
              <div className="tp-footer-widget mb-40 opacity-70">
                <h4 className="tp-footer-widget-title text-white mb-20">Growth &amp; Tech</h4>
                <ul className="tp-footer-list">
                  {growthServices.map((s, idx) => (
                    <li key={s.id || idx}>
                      <Link className="text-white" style={{ color: "#ffffff" }} to={`/services/${s.slug}`}>{s.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="tp-footer-bottom bg-white py-3" style={{ backgroundColor: "#ffffff", color: "#333333", borderTop: "1px solid #eaeaea" }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5">
              <div className="tp-footer-copyright-wrap mb-2 mb-lg-0" style={{ fontSize: "12px", color: "#555555" }}>
                <span>
                  © <span className="update-year">2026</span> Revelytics Studio. Premier Travel Digital Marketing Agency India. All Rights Reserved.
                </span>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="tp-footer-copyright-wrap text-lg-end d-flex flex-wrap align-items-center justify-content-lg-end justify-content-start" style={{ gap: "12px", fontSize: "12px" }}>
                <a href="#" style={{ color: "#444444", textDecoration: "none", fontWeight: 500 }}>Terms &amp; Conditions</a>
                <span style={{ color: "#cccccc" }}>|</span>
                <a href="#" style={{ color: "#444444", textDecoration: "none", fontWeight: 500 }}>Privacy Policy</a>
                <span style={{ color: "#cccccc" }}>|</span>
                <a href="#" style={{ color: "#444444", textDecoration: "none", fontWeight: 500 }}>Cookie Policy</a>
                <span style={{ color: "#cccccc" }}>|</span>
                <a href="#" style={{ color: "#444444", textDecoration: "none", fontWeight: 500 }}>Refund Policy</a>
                <span style={{ color: "#cccccc" }}>|</span>
                <a href="#" style={{ color: "#444444", textDecoration: "none", fontWeight: 500 }}>Disclaimer</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

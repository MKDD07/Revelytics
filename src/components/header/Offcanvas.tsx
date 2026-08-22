import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export interface OffcanvasServiceItem {
  id: number;
  slug: string;
  title: string;
  parent_slug?: string | null;
  subItems?: OffcanvasServiceItem[];
}

export const Offcanvas: React.FC = () => {
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({});
  const [services, setServices] = useState<OffcanvasServiceItem[]>([]);

  useEffect(() => {
    fetch("/api/services")
      .then((res) => (res.ok ? res.json() : []))
      .then((data: OffcanvasServiceItem[]) => {
        if (Array.isArray(data) && data.length > 0) {
          const rootServices = data.filter((s) => !s.parent_slug);
          const structured = rootServices.map((root) => ({
            ...root,
            subItems: data.filter((c) => c.parent_slug === root.slug),
          }));
          setServices(structured);
        }
      })
      .catch(() => {});
  }, []);

  const toggleDropdown = (key: string) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <>
      <aside className="tp-offcanvas-area">
        <div className="tp-offcanvas">
          <div className="tp-offcanvas-top d-flex align-items-center justify-content-between">
            <div className="tp-offcanvas-logo">
              <Link to="/">
                <img className="logo-1" data-width="240" alt="Revelytics Logo" src="/assets/img/logo/logo.svg" style={{ width: "240px" }} />
                <img className="logo-2" data-width="240" alt="Revelytics Logo White" src="/assets/img/logo/logo-white.svg" style={{ width: "240px" }} />
              </Link>
            </div>
            <div className="tp-offcanvas-close-btn">
              <button className="close-btn" type="button" aria-label="Close menu">
                <svg width="37" height="38" viewBox="0 0 37 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.19141 9.80762L27.5762 28.1924" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9.19141 28.1924L27.5762 9.80761" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          <div className="tp-offcanvas-content d-none d-xl-block">
            <h3 className="tp-offcanvas-title">Revelytics Studio</h3>
            <p>Elevating hotels & resorts with data-driven revenue management, performance marketing, and bespoke digital experiences across India.</p>
          </div>

          <div className="tp-offcanvas-menu d-xl-none">
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about-us">About Us</Link>
                </li>
                <li className={`has-dropdown ${openDropdowns["services"] ? "active" : ""}`}>
                  <div className="d-flex align-items-center justify-content-between">
                    <Link to="/services">Services</Link>
                    <button 
                      type="button" 
                      className="tp-menu-close" 
                      onClick={() => toggleDropdown("services")}
                      aria-label="Toggle Services menu"
                    >
                      <i className={`fa-solid ${openDropdowns["services"] ? "fa-minus" : "fa-plus"}`}></i>
                    </button>
                  </div>
                  {services.length > 0 && (
                    <ul className="tp-submenu submenu" style={{ display: openDropdowns["services"] ? "block" : "none" }}>
                      {services.map((item, index) => (
                        <li key={item.id || index} className={item.subItems && item.subItems.length > 0 ? `has-dropdown ${openDropdowns[`sub-${index}`] ? "active" : ""}` : ""}>
                          <div className="d-flex align-items-center justify-content-between">
                            <Link to={`/services/${item.slug}`}>{item.title}</Link>
                            {item.subItems && item.subItems.length > 0 && (
                              <button 
                                type="button" 
                                className="tp-menu-close" 
                                onClick={() => toggleDropdown(`sub-${index}`)}
                                aria-label={`Toggle ${item.title} menu`}
                              >
                                <i className={`fa-solid ${openDropdowns[`sub-${index}`] ? "fa-minus" : "fa-plus"}`}></i>
                              </button>
                            )}
                          </div>
                          {item.subItems && item.subItems.length > 0 && (
                            <ul className="tp-submenu submenu" style={{ display: openDropdowns[`sub-${index}`] ? "block" : "none" }}>
                              {item.subItems.map((sub, subIdx) => (
                                <li key={sub.id || subIdx}>
                                  <Link to={`/services/${sub.slug}`}>{sub.title}</Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
                <li>
                  <Link to="/case-studies">Case Studies</Link>
                </li>
                <li>
                  <Link to="/blog">Blog</Link>
                </li>
                <li>
                  <Link to="/contact-us">Contact Us</Link>
                </li>
                <li>
                  <Link to="/career">Career</Link>
                </li>
                <li>
                  <Link to="/dashboard" className="text-danger fw-bold">⚡ AI Studio &amp; Dashboard</Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="tp-offcanvas-contact">
            <h4 className="tp-offcanvas-contact-title">Contact Us</h4>
            <ul>
              <li>
                <a href="mailto:info@revelytics.com">info@revelytics.com</a>
              </li>
              <li>
                <a href="tel:+919876543210">+91 98765 43210</a>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
};

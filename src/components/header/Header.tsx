import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export interface HeaderServiceItem {
  id: number;
  slug: string;
  title: string;
  parent_slug?: string | null;
  subItems?: HeaderServiceItem[];
}

export const Header: React.FC = () => {
  const [navServices, setNavServices] = useState<HeaderServiceItem[]>([]);

  useEffect(() => {
    fetch("/api/services")
      .then((res) => (res.ok ? res.json() : []))
      .then((data: HeaderServiceItem[]) => {
        if (Array.isArray(data) && data.length > 0) {
          const rootServices = data.filter((s) => !s.parent_slug);
          const structured = rootServices.map((root) => ({
            ...root,
            subItems: data.filter((c) => c.parent_slug === root.slug),
          }));
          setNavServices(structured);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <header>
      {/* header area start */}
      <div className="tp-header-area tp-header-spacing header-transparent">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-3 col-6">
              <div className="tp-header-logo">
                <Link to="/">
                  <img className="logo-1" data-width="240" src="/assets/img/logo/logo.svg" alt="Revelytics" />
                  <img className="logo-2" data-width="240" src="/assets/img/logo/logo-white.svg" alt="Revelytics" />
                </Link>
              </div>
            </div>
            <div className="col-xl-6 d-none d-xl-block">
              <div className="tp-main-menu d-flex justify-content-center">
                <nav className="tp-mobile-menu-active">
                  <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/about-us">About Us</Link>
                    </li>
                    <li className="has-dropdown">
                      <Link to="/services">Services</Link>
                      {navServices.length > 0 && (
                        <ul className="tp-submenu submenu">
                          {navServices.map((item, index) => (
                            <li key={item.id || index} className={item.subItems && item.subItems.length > 0 ? "has-dropdown" : ""}>
                              <Link to={`/services/${item.slug}`}>{item.title}</Link>
                              {item.subItems && item.subItems.length > 0 && (
                                <ul className="tp-submenu submenu">
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
                      <Link to="/dashboard" className="text-danger fw-bold">⚡ AI Studio</Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <div className="col-xl-3 col-6">
              <div className="tp-header-right d-flex justify-content-end align-items-center gap-2">
                <Link to="/dashboard" className="btn btn-outline-danger btn-sm d-none d-sm-inline-flex align-items-center gap-1 py-1 px-3 fs-13 fw-bold rounded-pill text-uppercase">
                  <span>⚡ AI Studio</span>
                </Link>
                <button className="tp-header-search-btn tp-search-click">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.7508 18.5233L13.5538 13.392M13.5538 13.392C14.9604 12.0032 15.7506 10.1196 15.7506 8.15551C15.7506 6.19144 14.9604 4.30782 13.5538 2.91902C12.1472 1.53022 10.2395 0.75 8.25028 0.75C6.26108 0.75 4.35336 1.53022 2.94678 2.91902C1.54021 4.30782 0.75 6.19144 0.75 8.15551C0.75 10.1196 1.54021 12.0032 2.94678 13.392C4.35336 14.7808 6.26108 15.561 8.25028 15.561C10.2395 15.561 12.1472 14.7808 13.5538 13.392Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </button>
                <button className="tp-menu-bar tp-header-sidebar-btn ml-10">
                  <span></span>
                  <span></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

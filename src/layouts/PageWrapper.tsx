import React, { useEffect } from "react";
import { Header } from "../components/header/Header";
import { Footer } from "../components/footer/Footer";
import { loadTemplateScripts } from "../utils/loadTemplateScripts";

interface PageWrapperProps {
  children: React.ReactNode;
}

export const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  useEffect(() => {
    loadTemplateScripts().catch(console.error);
  }, []);

  return (
    <>
      {/* preloader */}
      <div id="preloader">
        <div className="preloader"><span></span><span></span></div>
      </div>

      {/* magic cursor */}
      <div id="magic-cursor" className="cursor-black-bg"><div id="ball"></div></div>

      {/* back to top */}
      <div className="back-to-top-wrapper">
        <button id="back_to_top" type="button" className="back-to-top-btn d-inline-flex align-items-center justify-content-center">
          <i className="fa-regular fa-arrow-up" style={{ fontSize: "16px", lineHeight: "1" }}></i>
        </button>
      </div>

      <Header />

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>{children}</main>
          <Footer />
        </div>
      </div>
    </>
  );
};

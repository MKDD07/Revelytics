import { StrictMode } from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import ServicesDigitalPage from "./pages/services/ServicesDigitalPage";
import ServiceTravelPage from "./pages/services/ServiceTravelPage";
import ServicesCollectionPage from "./pages/services/ServicesCollectionPage";
import DynamicServiceDetailPage from "./pages/services/DynamicServiceDetailPage";
import BlogCollectionPage from "./pages/blog/BlogCollectionPage";
import BlogDetailsPage from "./pages/blog/BlogDetailsPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import { ScrollToTop } from "./components/utils/ScrollToTop";
import { BarbaPageTransition } from "./components/transitions/BarbaPageTransition";
import { SmoothScroll } from "./components/common/SmoothScroll";

const rootContainer = document.getElementById("root");
const root = createRoot(rootContainer!);

root.render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <SmoothScroll>
        <BarbaPageTransition>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/services" element={<ServicesCollectionPage />} />
            <Route path="/services/digital" element={<ServicesDigitalPage />} />
            <Route path="/services/travel" element={<ServiceTravelPage />} />
            <Route path="/services/:slug" element={<DynamicServiceDetailPage />} />
            <Route path="/blog" element={<BlogCollectionPage />} />
            <Route path="/blog/:slug" element={<BlogDetailsPage />} />
            <Route path="/blog-details" element={<BlogDetailsPage />} />
            <Route path="/dashboard" element={<AdminDashboardPage />} />
            <Route path="/admin" element={<AdminDashboardPage />} />
          </Routes>
        </BarbaPageTransition>
      </SmoothScroll>
    </BrowserRouter>
  </StrictMode>
);

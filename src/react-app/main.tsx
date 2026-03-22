import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

const observeSections = () => {
  const sections = document.querySelectorAll<HTMLElement>(
    ".section--about, .section--spaces, .section--services, .section--contact"
  );
  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );

  sections.forEach((el) => {
    // Only hide if it's not already in view on load
    const rect = el.getBoundingClientRect();
    if (rect.top > window.innerHeight) {
      el.classList.add("reveal-ready");
    } else {
      el.classList.add("visible");
    }
    observer.observe(el);
  });
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// Run after React paints
requestAnimationFrame(() => requestAnimationFrame(observeSections));

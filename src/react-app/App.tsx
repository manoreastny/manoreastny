import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "./App.css";

// Building exterior photo — imported as a URL via Vite's asset pipeline
// Place manor-east-building.jpg in src/react-app/assets/
import buildingPhoto from "./assets/manor-east-building.jpg";

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = ["home", "about", "spaces", "services", "contact"];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="site-wrapper">
      {/* Coming Soon Banner */}
      <div className="coming-soon-ribbon">
        <span className="ribbon-text">
          ✦ &nbsp; Grand Opening Coming Soon &nbsp; ✦
        </span>
      </div>

      {menuOpen && createPortal(
        <>
          <div className="menu-overlay" onClick={() => setMenuOpen(false)} />
          <ul className="navbar__links navbar__links--open">
            {[
              { id: "about", label: "About" },
              { id: "spaces", label: "Spaces" },
              { id: "services", label: "Services" },
              { id: "contact", label: "Contact" },
            ].map(({ id, label }) => (
              <li key={id}>
                <button
                  className={`nav-link ${activeSection === id ? "nav-link--active" : ""}`}
                  onClick={() => scrollTo(id)}
                >
                  {label}
                </button>
              </li>
            ))}
            <li>
              <button className="nav-cta" onClick={() => scrollTo("contact")}>
                Book Inquiry
              </button>
            </li>
          </ul>
        </>,
        document.body
      )}

      {/* Navigation */}
      <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
        <div className="navbar__inner">
          <button className="navbar__logo" onClick={() => scrollTo("home")}>
            <span className="logo-mark">M</span>
            <span className="logo-text">
              <span className="logo-name">Manor East</span>
              <span className="logo-locale">New York</span>
            </span>
          </button>

          <button
            className={`navbar__burger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>

          <ul className="navbar__links navbar__links--desktop">
            {[
              { id: "about", label: "About" },
              { id: "spaces", label: "Spaces" },
              { id: "services", label: "Services" },
              { id: "contact", label: "Contact" },
            ].map(({ id, label }) => (
              <li key={id}>
                <button
                  className={`nav-link ${activeSection === id ? "nav-link--active" : ""}`}
                  onClick={() => scrollTo(id)}
                >
                  {label}
                </button>
              </li>
            ))}
            <li>
              <button className="nav-cta" onClick={() => scrollTo("contact")}>
                Book Inquiry
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero */}
      <section id="home" className="hero">
        <div className="hero__bg">
          <div className="hero__orb hero__orb--1" />
          <div className="hero__orb hero__orb--2" />
          <div className="hero__orb hero__orb--3" />
          <div className="hero__grain" />
        </div>

        <div className="hero__content">
          <p className="hero__eyebrow">New York's Newest Event Destination</p>
          <h1 className="hero__title">
            <span className="hero__title-line">A Banquet Hall</span>
            <span className="hero__title-line hero__title-line--accent">Built for</span>
            <span className="hero__title-line">Your Moments</span>
          </h1>
          <p className="hero__subtitle">
            Manor East is a full-service catering and banquet venue in New York —
            a warm, elegant space for weddings, celebrations, and the events that matter most.
          </p>
          <div className="hero__actions">
            <button className="btn btn--primary" onClick={() => scrollTo("contact")}>
              Begin Your Journey
            </button>
            <button className="btn btn--ghost" onClick={() => scrollTo("spaces")}>
              Explore Our Spaces
            </button>
          </div>

          {/* Coming Soon Card — inline below buttons on all screen sizes */}
          <div className="coming-soon-card">
            <div className="cs-card__inner">
              <div className="cs-card__dot" />
              <p className="cs-card__label">Opening Soon</p>
              <p className="cs-card__text">
                We're putting the final touches on something magnificent.
                Register your interest and be first to know.
              </p>
              <button className="btn btn--card" onClick={() => scrollTo("contact")}>
                Get Early Access
              </button>
            </div>
          </div>
        </div>

        <div className="hero__scroll-hint">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* Divider */}
      <div className="section-divider">
        <div className="divider-line" />
        <span className="divider-icon">✦</span>
        <div className="divider-line" />
      </div>

      {/* About */}
      <section id="about" className="section section--about">
        <div className="container">
          <div className="about__grid">
            <div className="about__visual">
              {/* Gallery slider showing the venue exterior and interior */}
              <AboutGallery />
            </div>
            <div className="about__copy">
              <p className="section-eyebrow">Our Story</p>
              <h2 className="section-title">A Venue Built on Care</h2>
              <p className="about__body">
                Manor East was created with a simple belief: every event deserves a space that feels both grand and genuinely welcoming. We set out to build something different — a venue where the food is exceptional, the staff feels like family, and every detail is handled with intention.
              </p>
              <p className="about__body">
                Whether you're planning an intimate dinner or a full ballroom celebration, our team is here to make it seamless. We're a newer venue, but we bring deep roots in hospitality and a real commitment to getting it right.
              </p>
              <div className="about__stats">
                {[
                  { number: "X+", label: "Guest Capacity" },
                  { number: "X+", label: "Years in Hospitality" },
                  { number: "NY", label: "Based & Proud" },
                ].map(({ number, label }) => (
                  <div key={label} className="stat-item">
                    <span className="stat-number">{number}</span>
                    <span className="stat-label">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spaces */}
      <section id="spaces" className="section section--spaces">
        <div className="section__bg-texture" />
        <div className="container">
          <div className="section-header">
            <p className="section-eyebrow">Our Venues</p>
            <h2 className="section-title">Spaces Designed for <em>Your</em> Vision</h2>
            <p className="section-subtitle">
              From intimate gatherings to grand celebrations, each space is thoughtfully designed to transform with your vision.
            </p>
          </div>

          <div className="spaces__grid">
            {[
              {
                name: "Majestic",
                capacity: "TBD",
                desc: "Details about this space coming soon. Contact us to learn more about availability and what this room has to offer.",
                tags: ["Coming Soon"],
                accent: "gold",
              },
              {
                name: "Tiffany",
                capacity: "TBD",
                desc: "Details about this space coming soon. Contact us to learn more about availability and what this room has to offer.",
                tags: ["Coming Soon"],
                accent: "sage",
              },
            ].map((space) => (
              <div key={space.name} className={`space-card space-card--${space.accent}`}>
                <div className="space-card__img">
                  <div className="space-card__img-bg" />
                  <div className="space-card__img-overlay" />
                </div>
                <div className="space-card__body">
                  <div className="space-card__header">
                    <h3 className="space-card__name">{space.name}</h3>
                    <span className="space-card__capacity">{space.capacity}</span>
                  </div>
                  <p className="space-card__desc">{space.desc}</p>
                  <div className="space-card__tags">
                    {space.tags.map((t) => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                  <button className="space-card__cta" onClick={() => scrollTo("contact")}>
                    Inquire About This Space →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="section section--services">
        <div className="container">
          <div className="section-header">
            <p className="section-eyebrow">What We Offer</p>
            <h2 className="section-title">Full-Service Excellence</h2>
          </div>

          <div className="services__grid">
            {[
              { icon: "✦", title: "Service Coming Soon", desc: "Details about this offering will be available shortly. Reach out to us directly for more information." },
              { icon: "✦", title: "Service Coming Soon", desc: "Details about this offering will be available shortly. Reach out to us directly for more information." },
              { icon: "✦", title: "Service Coming Soon", desc: "Details about this offering will be available shortly. Reach out to us directly for more information." },
              { icon: "✦", title: "Service Coming Soon", desc: "Details about this offering will be available shortly. Reach out to us directly for more information." },
              { icon: "✦", title: "Service Coming Soon", desc: "Details about this offering will be available shortly. Reach out to us directly for more information." },
              { icon: "✦", title: "Service Coming Soon", desc: "Details about this offering will be available shortly. Reach out to us directly for more information." },
            ].map((service, i) => (
              <div key={i} className="service-card">
                <div className="service-card__icon">{service.icon}</div>
                <h3 className="service-card__title">{service.title}</h3>
                <p className="service-card__desc">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section section--contact">
        <div className="container">
          <div className="contact__grid">
            <div className="contact__info">
              <p className="section-eyebrow">Get In Touch</p>
              <h2 className="section-title">Let's Create Something <em>Extraordinary</em></h2>
              <p className="contact__body">
                We're currently accepting inquiries for our opening season. Reach out and one of our event specialists will be in touch within 24 hours.
              </p>

              <div className="contact__details">
                <div className="contact-item">
                  <span className="contact-item__icon">📍</span>
                  <div>
                    <p className="contact-item__label">Location</p>
                    <p className="contact-item__value">New York, NY</p>
                  </div>
                </div>
                <div className="contact-item">
                  <span className="contact-item__icon">✉️</span>
                  <div>
                    <p className="contact-item__label">Email</p>
                    <p className="contact-item__value">info@manoreastny.com</p>
                  </div>
                </div>
                <div className="contact-item">
                  <span className="contact-item__icon">📞</span>
                  <div>
                    <p className="contact-item__label">Phone</p>
                    <p className="contact-item__value">Coming Soon</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact__form-wrap">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer__inner">
            <div className="footer__brand">
              <span className="logo-mark logo-mark--sm">M</span>
              <div>
                <p className="footer__name">Manor East</p>
                <p className="footer__location">New York</p>
              </div>
            </div>
            <nav className="footer__nav">
              {["About", "Spaces", "Services", "Contact"].map((item) => (
                <button
                  key={item}
                  className="footer__link"
                  onClick={() => scrollTo(item.toLowerCase())}
                >
                  {item}
                </button>
              ))}
            </nav>
            <p className="footer__copy">
              © {new Date().getFullYear()} Manor East NY. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ── About Gallery ── */
// Slideshow component for the About section visual panel.
// Each slide is either { type: "photo", src, alt, label } or { type: "shimmer", label }.
// Add more photo slides as real venue photos become available.
function AboutGallery() {
  const slides: Array<
    | { type: "photo"; src: string; alt: string; label: string }
    | { type: "shimmer"; label: string }
  > = [
    {
      type: "photo",
      src: buildingPhoto,
      label: "Manor East · Exterior",
      alt: "Manor East building exterior",
    },
    // Placeholder shown while interior photos are pending
    {
      type: "shimmer",
      label: "Manor East · Tiffany",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-advance every 5 seconds
  useEffect(() => {
    timerRef.current = setTimeout(() => goTo((current + 1) % slides.length), 5000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, slides.length]);

  const goTo = (index: number) => {
    if (transitioning || index === current) return;
    setTransitioning(true);
    setTimeout(() => {
      setCurrent(index);
      setTransitioning(false);
    }, 300);
  };

  const slide = slides[current];

  return (
    <div className="about__gallery">
      <div className={`about__gallery-slide ${transitioning ? "about__gallery-slide--out" : "about__gallery-slide--in"}`}>
        {/* Photo slide */}
        {slide.type === "photo" && (
          <img
            src={slide.src}
            alt={slide.alt}
            className="about__gallery-img"
          />
        )}

        {/* Shimmer placeholder slide — reuses the original animated gradient */}
        {slide.type === "shimmer" && (
          <div className="about__gallery-shimmer">
            <div className="img-shimmer" />
          </div>
        )}

        <div className="about__gallery-overlay" />
        <span className="img-label">{slide.label}</span>
      </div>

      {/* Dot navigation */}
      <div className="about__gallery-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`about__gallery-dot ${i === current ? "about__gallery-dot--active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      <div className="about__img-badge">
        <span className="badge-number">NY</span>
        <span className="badge-label">New York</span>
      </div>
    </div>
  );
}

/* ── Contact Form ── */
function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    event: "",
    date: "",
    guests: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      // POST inquiry to the Hono worker endpoint; the worker forwards to info@manoreastny.com
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, to: "info@manoreastny.com" }),
      });

      if (!res.ok) throw new Error(`Server responded with ${res.status}`);
      setSubmitted(true);
    } catch (err) {
      console.error("Inquiry submission error:", err);
      setError("Something went wrong. Please email us directly at info@manoreastny.com.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="form-success">
        <div className="form-success__icon">✦</div>
        <h3>Thank You, {form.name.split(" ")[0]}!</h3>
        <p>We've received your inquiry and will be in touch within 24 hours to begin crafting your perfect event.</p>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Full Name *</label>
          <input
            className="form-input"
            type="text"
            placeholder="Your name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Email *</label>
          <input
            className="form-input"
            type="email"
            placeholder="your@email.com"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Phone</label>
          <input
            className="form-input"
            type="tel"
            placeholder="(555) 000-0000"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Event Type *</label>
          <select
            className="form-input form-select"
            required
            value={form.event}
            onChange={(e) => setForm({ ...form, event: e.target.value })}
          >
            <option value="">Select event type</option>
            <option>Wedding</option>
            <option>Bar / Bat Mitzvah</option>
            <option>Quinceañera</option>
            <option>Corporate Event</option>
            <option>Sweet 16</option>
            <option>Anniversary</option>
            <option>Other Celebration</option>
          </select>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Preferred Date</label>
          <input
            className="form-input"
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Estimated Guests</label>
          <select
            className="form-input form-select"
            value={form.guests}
            onChange={(e) => setForm({ ...form, guests: e.target.value })}
          >
            <option value="">Select guest count</option>
            <option>Under 50</option>
            <option>50 – 100</option>
            <option>100 – 200</option>
            <option>200 – 350</option>
            <option>350 – 500</option>
            <option>500+</option>
          </select>
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Tell Us About Your Event</label>
        <textarea
          className="form-input form-textarea"
          placeholder="Share your vision, questions, or anything else you'd like us to know..."
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
      </div>
      {/* Inline error shown if submission fails */}
      {error && <p className="form-error">{error}</p>}
      <button type="submit" className="btn btn--primary btn--full" disabled={submitting}>
        {submitting ? "Sending…" : "Send Inquiry"}
      </button>
    </form>
  );
}

export default App;

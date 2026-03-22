import { useState, useEffect } from "react";
import "./App.css";

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

          <ul className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}>
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
        </div>

        <div className="hero__scroll-hint">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>

        {/* Coming Soon Glass Card */}
        <div className="coming-soon-card">
          <div className="cs-card__inner">
            <div className="cs-card__dot" />
            <p className="cs-card__label">Opening Soon</p>
            <p className="cs-card__text">
              We're putting the final touches on something magnificent. <br />
              Register your interest and be first to know.
            </p>
            <button className="btn btn--card" onClick={() => scrollTo("contact")}>
              Get Early Access
            </button>
          </div>
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
              <div className="about__img-frame">
                <div className="about__img-placeholder">
                  <div className="img-shimmer" />
                  <span className="img-label">Manor East · Grand Hall</span>
                </div>
                <div className="about__img-badge">
                  <span className="badge-number">NY</span>
                  <span className="badge-label">New York</span>
                </div>
              </div>
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
                  { number: "500", label: "Guest Capacity" },
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
                name: "Venue Space One",
                capacity: "TBD",
                desc: "Details about this space coming soon. Contact us to learn more about availability and what this room has to offer.",
                tags: ["Coming Soon"],
                accent: "gold",
              },
              {
                name: "Venue Space Two",
                capacity: "TBD",
                desc: "Details about this space coming soon. Contact us to learn more about availability and what this room has to offer.",
                tags: ["Coming Soon"],
                accent: "sage",
              },
              {
                name: "Venue Space Three",
                capacity: "TBD",
                desc: "Details about this space coming soon. Contact us to learn more about availability and what this room has to offer.",
                tags: ["Coming Soon"],
                accent: "emerald",
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
                    <p className="contact-item__value">Coming Soon</p>
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

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    event: "",
    date: "",
    guests: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
      <button type="submit" className="btn btn--primary btn--full">
        Send Inquiry
      </button>
    </form>
  );
}

export default App;

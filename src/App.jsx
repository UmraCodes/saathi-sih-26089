import { useState } from "react";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [showLogin, setShowLogin] = useState(false);

  const handleSearch = () => {
    if (search.trim() === "") {
      alert("Please enter a service.");
    } else {
      alert(`Searching for ${search}...`);
    }
  };

  return (
    <div className="app">

      {/* ================= NAVBAR ================= */}

      <nav className="navbar">

        <div className="logo">
          SAATHI
        </div>

        <div className="nav-links">

          <span>Home</span>

          <span>My Bookings</span>

          <button
            className="login-btn"
            onClick={() => setShowLogin(true)}
          >
            Login
          </button>

        </div>

      </nav>


      <main>

        {/* ================= HERO ================= */}

        <section className="hero">

          {/* ================= HERO TEXT ================= */}

          <div className="hero-text">

            <p className="tagline">
              Trusted services. Stronger communities.
            </p>

            <h1 className="hero-title">
              <span className="hero-title-main">
                Find trusted local
              </span>

              <span className="hero-title-green">
                services with SAATHI
              </span>
            </h1>

            <p className="description">
              Connect with verified local service providers from your
              cooperative community.
            </p>


            {/* ================= SEARCH ================= */}

            <div className="search-box">

              <div className="location">
                📍 <span>Kanpur</span>
              </div>

              <input
                type="text"
                placeholder="What service do you need?"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <button onClick={handleSearch}>
                Search
              </button>

            </div>


            {/* ================= PRIMARY BUTTON ================= */}

            <button
              className="primary-btn"
              onClick={() =>
                document
                  .querySelector(".search-box input")
                  .focus()
              }
            >
              Find a Service →
            </button>

          </div>


          {/* ================= HERO VISUAL ================= */}

          <div className="hero-visual">

            <img
              src="/saathi-hero.png"
              alt="SAATHI local service community"
              className="hero-image"
            />

          </div>


          {/* ================= COMMUNITY POWERED ================= */}

          <div className="hero-card">

            <div className="visual-circle">
              🤝
            </div>


            <div className="floating-badge badge-top">
              ✓ Verified
            </div>


            <div className="floating-badge badge-left">
              🏠 Local
            </div>


            <div className="floating-badge badge-right">
              ⭐ Trusted
            </div>


            <h3>
              Community Powered
            </h3>


            <p className="card-description">
              Trusted local professionals, connected through a
              cooperative community.
            </p>


            <div className="stats-grid">

              <div className="stat">
                <strong>500+</strong>
                <span>Providers</span>
              </div>


              <div className="stat">
                <strong>20+</strong>
                <span>Services</span>
              </div>


              <div className="stat">
                <strong>4.8★</strong>
                <span>Rating</span>
              </div>

            </div>

          </div>

        </section>


        {/* ================= POPULAR SERVICES ================= */}

        <section className="services">

          <div className="section-heading">

            <p>
              WHAT DO YOU NEED?
            </p>

            <h2>
              Popular Services
            </h2>

          </div>


          <div className="service-grid">


            {/* ================= PLUMBING ================= */}

            <div
              className="service-card"
              onClick={() => alert("Plumbing selected")}
            >

              <div className="service-icon">
                🔧
              </div>

              <h3>
                Plumbing
              </h3>

              <p>
                Repairs, installations & water-related services.
              </p>

              <span className="explore">
                Explore →
              </span>

            </div>


            {/* ================= ELECTRICAL ================= */}

            <div
              className="service-card"
              onClick={() => alert("Electrical selected")}
            >

              <div className="service-icon">
                ⚡
              </div>

              <h3>
                Electrical
              </h3>

              <p>
                Wiring, repairs, fittings & electrical maintenance.
              </p>

              <span className="explore">
                Explore →
              </span>

            </div>


            {/* ================= CLEANING ================= */}

            <div
              className="service-card"
              onClick={() => alert("Cleaning selected")}
            >

              <div className="service-icon">
                🧹
              </div>

              <h3>
                Cleaning
              </h3>

              <p>
                Home, office & community cleaning services.
              </p>

              <span className="explore">
                Explore →
              </span>

            </div>


            {/* ================= CARPENTRY ================= */}

            <div
              className="service-card"
              onClick={() => alert("Carpentry selected")}
            >

              <div className="service-icon">
                🔨
              </div>

              <h3>
                Carpentry
              </h3>

              <p>
                Furniture repair, installation & woodwork.
              </p>

              <span className="explore">
                Explore →
              </span>

            </div>


            {/* ================= PAINTING ================= */}

            <div
              className="service-card"
              onClick={() => alert("Painting selected")}
            >

              <div className="service-icon">
                🎨
              </div>

              <h3>
                Painting
              </h3>

              <p>
                Interior, exterior & home painting services.
              </p>

              <span className="explore">
                Explore →
              </span>

            </div>


            {/* ================= AC & APPLIANCE ================= */}

            <div
              className="service-card"
              onClick={() =>
                alert("AC & Appliance Repair selected")
              }
            >

              <div className="service-icon">
                ❄️
              </div>

              <h3>
                AC & Appliance Repair
              </h3>

              <p>
                AC, refrigerator & everyday appliance repairs.
              </p>

              <span className="explore">
                Explore →
              </span>

            </div>


            {/* ================= HOME MAINTENANCE ================= */}

            <div
              className="service-card"
              onClick={() =>
                alert("Home Maintenance selected")
              }
            >

              <div className="service-icon">
                🏠
              </div>

              <h3>
                Home Maintenance
              </h3>

              <p>
                Reliable help for everyday household needs.
              </p>

              <span className="explore">
                Explore →
              </span>

            </div>


            {/* ================= GARDENING ================= */}

            <div
              className="service-card"
              onClick={() =>
                alert("Gardening selected")
              }
            >

              <div className="service-icon">
                🌿
              </div>

              <h3>
                Gardening
              </h3>

              <p>
                Garden care, plant maintenance & landscaping.
              </p>

              <span className="explore">
                Explore →
              </span>

            </div>

          </div>

        </section>


        {/* ================= HOW IT WORKS ================= */}

        <section className="how-it-works">

          <div className="section-heading">

            <p>
              HOW IT WORKS
            </p>

            <h2>
              Getting help is simple
            </h2>

          </div>


          <div className="steps">


            {/* ================= STEP 1 ================= */}

            <div className="step-card">

              <div className="step-number">
                01
              </div>

              <h3>
                Choose a Service
              </h3>

              <p>
                Select the service you need from our local service
                categories.
              </p>

            </div>


            {/* ================= STEP 2 ================= */}

            <div className="step-card">

              <div className="step-number">
                02
              </div>

              <h3>
                Find a Trusted Provider
              </h3>

              <p>
                Explore verified providers from the cooperative
                community.
              </p>

            </div>


            {/* ================= STEP 3 ================= */}

            <div className="step-card">

              <div className="step-number">
                03
              </div>

              <h3>
                Get the Service
              </h3>

              <p>
                Connect with the provider and get your service
                completed.
              </p>

            </div>

          </div>

        </section>


        {/* ================= FOOTER ================= */}

        <footer className="footer">

          <div className="footer-content">


            {/* ================= BRAND ================= */}

            <div className="footer-brand">

              <div className="footer-logo">
                SAATHI
              </div>

              <p className="footer-tagline">
                Trusted services. Stronger communities.
              </p>

              <p className="footer-description">
                SAATHI connects customers with trusted local service
                providers and strengthens cooperative communities.
              </p>

              <div className="footer-badge">
                🤝 Community Powered
              </div>

            </div>


            {/* ================= PLATFORM ================= */}

            <div className="footer-column">

              <h3>
                Platform
              </h3>

              <span>
                Home
              </span>

              <span>
                Services
              </span>

              <span>
                How It Works
              </span>

              <span>
                My Bookings
              </span>

            </div>


            {/* ================= FOR PROVIDERS ================= */}

            <div className="footer-column">

              <h3>
                For Providers
              </h3>

              <span>
                Join SAATHI
              </span>

              <span>
                Become a Provider
              </span>

              <span>
                Provider Login
              </span>

              <span>
                Community
              </span>

            </div>


            {/* ================= SUPPORT ================= */}

            <div className="footer-column">

              <h3>
                Support
              </h3>

              <span>
                Help Center
              </span>

              <span>
                Contact Us
              </span>

              <span>
                FAQs
              </span>

              <span>
                Privacy Policy
              </span>

            </div>

          </div>


          {/* ================= FOOTER BOTTOM ================= */}

          <div className="footer-bottom">

            <p>
              © 2026 SAATHI. All rights reserved.
            </p>

            <p>
              Made for stronger communities 💚
            </p>

          </div>

        </footer>

      </main>


      {/* ================= LOGIN MODAL ================= */}

      {showLogin && (

        <div className="login-overlay">

          <div className="login-modal">


            <button
              className="close-login"
              onClick={() => setShowLogin(false)}
            >
              ×
            </button>


            <div className="login-icon">
              👤
            </div>


            <h2>
              Welcome to SAATHI
            </h2>


            <p className="login-subtitle">
              Login to continue
            </p>


            <input
              type="text"
              placeholder="Email or Mobile Number"
            />


            <input
              type="password"
              placeholder="Password"
            />


            <button
              className="login-submit"
              onClick={() => alert("Login demo")}
            >
              Login
            </button>


            <p className="login-note">
              New to SAATHI? Sign up as a customer.
            </p>

          </div>

        </div>

      )}

    </div>
  );
}

export default App;
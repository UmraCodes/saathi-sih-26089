import { useMemo, useState } from "react";
import "./App.css";
import ProviderApp from "./ProviderApp.jsx";
import AdminApp from "./AdminApp.jsx";

const services = [
  {
    id: "plumbing",
    name: "Plumbing",
    icon: "🔧",
    description: "Pipes, taps, leaks & bathroom repairs",
    price: 399,
    duration: "1–2 hrs",
  },
  {
    id: "cleaning",
    name: "Cleaning",
    icon: "🧹",
    description: "Home, kitchen & deep cleaning",
    price: 499,
    duration: "2–3 hrs",
  },
  {
    id: "electrical",
    name: "Electrical",
    icon: "⚡",
    description: "Wiring, switches, fans & installation",
    price: 349,
    duration: "1–2 hrs",
  },
  {
    id: "carpentry",
    name: "Carpentry",
    icon: "🪚",
    description: "Furniture, doors & woodwork",
    price: 599,
    duration: "2–4 hrs",
  },
  {
    id: "painting",
    name: "Painting",
    icon: "🎨",
    description: "Wall painting & home touch-ups",
    price: 899,
    duration: "1–2 days",
  },
  {
    id: "appliance",
    name: "AC & Appliance Repair",
    icon: "❄️",
    description: "AC, fridge, washing machine & more",
    price: 699,
    duration: "1–3 hrs",
  },
  {
    id: "maintenance",
    name: "Home Maintenance",
    icon: "🛠️",
    description: "General household repairs",
    price: 449,
    duration: "1–3 hrs",
  },
  {
    id: "gardening",
    name: "Gardening",
    icon: "🌱",
    description: "Garden cleaning & plant maintenance",
    price: 399,
    duration: "1–3 hrs",
  },
];

const workers = {
  plumbing: [
    ["Rakesh Yadav", 4.9, 142, "7 years", "1.2 km", "Leak & Pipe Specialist", 399],
    ["Manoj Kushwaha", 4.8, 118, "6 years", "1.8 km", "Bathroom Plumbing", 429],
    ["Deepak Patel", 4.7, 96, "5 years", "2.4 km", "Pipe Installation", 449],
    ["Vinod Sharma", 4.9, 167, "8 years", "2.9 km", "Water Tank & Pipes", 479],
    ["Lokesh Verma", 4.6, 81, "4 years", "3.4 km", "General Plumbing", 379],
  ],

  cleaning: [
    ["Pooja Sharma", 4.9, 154, "6 years", "1.1 km", "Deep Cleaning", 499],
    ["Neha Verma", 4.8, 121, "5 years", "1.7 km", "Kitchen Cleaning", 529],
    ["Sunita Kumari", 4.7, 103, "5 years", "2.2 km", "Home Cleaning", 479],
    ["Kavita Singh", 4.9, 189, "7 years", "2.6 km", "Bathroom Cleaning", 549],
    ["Anjali Gupta", 4.6, 78, "4 years", "3.1 km", "Regular Cleaning", 449],
  ],

  electrical: [
    ["Arjun Singh", 4.9, 137, "7 years", "1.3 km", "Wiring Specialist", 349],
    ["Rohit Sharma", 4.8, 115, "6 years", "1.9 km", "Fan & Light Installation", 379],
    ["Ankit Verma", 4.7, 92, "5 years", "2.5 km", "Switchboard Repair", 399],
    ["Dinesh Yadav", 4.9, 171, "8 years", "2.8 km", "Home Electricals", 429],
    ["Pradeep Kumar", 4.6, 73, "4 years", "3.5 km", "General Electrician", 329],
  ],

  carpentry: [
    ["Mahesh Prajapati", 4.9, 128, "8 years", "1.4 km", "Furniture Repair", 599],
    ["Rajesh Soni", 4.8, 107, "6 years", "1.9 km", "Door & Window Work", 629],
    ["Kunal Singh", 4.7, 89, "5 years", "2.3 km", "Furniture Assembly", 579],
    ["Naresh Vishwakarma", 4.9, 163, "9 years", "2.7 km", "Custom Woodwork", 699],
    ["Mukesh Sharma", 4.6, 71, "4 years", "3.2 km", "General Carpentry", 549],
  ],

  painting: [
    ["Imran Khan", 4.9, 116, "7 years", "1.5 km", "Interior Painting", 899],
    ["Ashok Yadav", 4.8, 98, "6 years", "2.0 km", "Wall Painting", 949],
    ["Ravi Kumar", 4.7, 84, "5 years", "2.4 km", "Texture Painting", 999],
    ["Salim Ansari", 4.9, 143, "8 years", "2.9 km", "Exterior Painting", 1049],
    ["Harish Patel", 4.6, 69, "4 years", "3.6 km", "Touch-up Specialist", 799],
  ],

  appliance: [
    ["Faizan Ali", 4.9, 132, "7 years", "1.2 km", "AC Specialist", 699],
    ["Mohit Sharma", 4.8, 105, "6 years", "1.8 km", "Refrigerator Repair", 749],
    ["Nitin Gupta", 4.7, 91, "5 years", "2.1 km", "Washing Machine Repair", 729],
    ["Sameer Khan", 4.9, 156, "8 years", "2.6 km", "AC Installation", 799],
    ["Vikas Tiwari", 4.6, 76, "4 years", "3.3 km", "Appliance Repair", 649],
  ],

  maintenance: [
    ["Sandeep Yadav", 4.9, 145, "7 years", "1.1 km", "Home Maintenance", 449],
    ["Vivek Singh", 4.8, 112, "6 years", "1.7 km", "General Repairs", 479],
    ["Ajay Kumar", 4.7, 87, "5 years", "2.3 km", "Household Repairs", 429],
    ["Gaurav Mishra", 4.9, 134, "7 years", "2.8 km", "Maintenance Specialist", 499],
    ["Pankaj Verma", 4.6, 64, "4 years", "3.5 km", "General Services", 399],
  ],

  gardening: [
    ["Ramesh Kushwaha", 4.9, 119, "7 years", "1.3 km", "Garden Maintenance", 399],
    ["Gopal Singh", 4.8, 94, "6 years", "1.9 km", "Plant Care", 429],
    ["Hariom Patel", 4.7, 82, "5 years", "2.2 km", "Lawn Maintenance", 449],
    ["Shyam Yadav", 4.9, 141, "8 years", "2.7 km", "Landscape Specialist", 499],
    ["Devendra Kumar", 4.6, 67, "4 years", "3.4 km", "Garden Cleaning", 379],
  ],
};

const timeSlots = [
  "09:00 AM",
  "11:00 AM",
  "01:00 PM",
  "03:00 PM",
  "05:00 PM",
  "07:00 PM",
];

const steps = [
  "Service",
  "Professional",
  "Schedule",
  "Address",
  "Review",
];

function App() {
const [page, setPage] = useState("home");
const [providerMode, setProviderMode] = useState(false);
const [adminMode, setAdminMode] = useState(false);
  const [step, setStep] = useState(1);
  const [search, setSearch] = useState("");
  const [loginOpen, setLoginOpen] = useState(false);
  const [bookingId, setBookingId] = useState("");

  const [booking, setBooking] = useState({
    service: null,
    worker: null,
    date: "",
    time: "",
    address: "",
    notes: "",
  });

  const availableWorkers = useMemo(() => {
    if (!booking.service) return [];

    return workers[booking.service.id].map((item, index) => ({
      id: `${booking.service.id}-${index}`,
      name: item[0],
      rating: item[1],
      reviews: item[2],
      experience: item[3],
      distance: item[4],
      speciality: item[5],
      price: item[6],
      verified: true,
    }));
  }, [booking.service]);

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(search.toLowerCase())
  );

  const startBooking = (service = null) => {
    setBooking({
      service,
      worker: null,
      date: "",
      time: "",
      address: "",
      notes: "",
    });

    setStep(service ? 2 : 1);
    setPage("booking");

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const selectWorker = (worker) => {
    setBooking((prev) => ({
      ...prev,
      worker,
    }));
  };

  const goNext = () => {
    setStep((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = () => {
    setStep((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const confirmBooking = () => {
    const id = `ST-${Math.floor(10000000 + Math.random() * 90000000)}`;

    setBookingId(id);
    setStep(6);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goHome = () => {
    setPage("home");
    setStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const searchService = () => {
    const found = services.find((service) =>
      service.name.toLowerCase().includes(search.toLowerCase())
    );

    if (found) {
      startBooking(found);
    } else {
      alert("Please enter a service name.");
    }
  };
if (providerMode) {
  return (
    <ProviderApp
      onBack={() => setProviderMode(false)}
    />
  );
}
if (adminMode) {
  return (
    <AdminApp
      onBack={() => setAdminMode(false)}
    />
  );
}
  return (
    <div className="app">

     {/* ================= NAVBAR ================= */}

<nav className="navbar">

  <div className="logo" onClick={goHome}>
    SAATHI
  </div>

  <div className="nav-links">

    <button onClick={goHome}>
      Home
    </button>

    <button
      onClick={() => {
        setPage("booking");
        setStep(1);
      }}
    >
      My Bookings
    </button>

    <button onClick={() => setLoginOpen(true)}>
      Login
    </button>

    <button onClick={() => setProviderMode(true)}>
      Provider Dashboard
    </button>
    <button onClick={() => setAdminMode(true)}>
  Admin Dashboard
</button>

  </div>

</nav>

      {/* ================= HOME ================= */}

      {page === "home" && (
        <>
          <section className="hero">
            <div className="hero-content">
              <span className="hero-badge">
                🤝 Community Powered Services
              </span>

              <h1>
                Trusted services,
                <br />
                <span>right in your community.</span>
              </h1>

              <p>
                Book verified local professionals for your
                everyday household and community needs.
              </p>

              <div className="search-box">
                <span>⌕</span>

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") searchService();
                  }}
                  placeholder="What service do you need?"
                />

                <button onClick={searchService}>
                  Search
                </button>
              </div>
            </div>

            <div className="hero-image">
              <img
                src="/saathi-hero.png"
                alt="SAATHI services"
              />
            </div>
          </section>

          <section className="services-section">
            <div className="section-heading">
              <span>OUR SERVICES</span>
              <h2>Popular Services</h2>
              <p>
                Find trusted professionals for your everyday needs.
              </p>
            </div>

            <div className="services-grid">
              {filteredServices.map((service) => (
                <div
                  className="service-card"
                  key={service.id}
                  onClick={() => startBooking(service)}
                >
                  <div className="service-icon">
                    {service.icon}
                  </div>

                  <h3>{service.name}</h3>

                  <p>{service.description}</p>

                  <div className="service-bottom">
                    <div>
                      <strong>
                        From ₹{service.price}
                      </strong>

                      <small>
                        {service.duration}
                      </small>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        startBooking(service);
                      }}
                    >
                      Book →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="how-section">
  <div className="section-heading">
    <span>HOW IT WORKS</span>
    <h2>Getting help is simple</h2>
  </div>

  <div className="steps-grid">
    <div className="how-step-card">
      <b>01</b>
      <h3>Choose a Service</h3>
      <p>Select the service you need from our local service categories.</p>
    </div>

    <div className="how-step-card">
      <b>02</b>
      <h3>Find a Trusted Provider</h3>
      <p>Explore verified providers from the cooperative community.</p>
    </div>

    <div className="how-step-card">
      <b>03</b>
      <h3>Get the Service</h3>
      <p>Connect with the provider and get your service completed.</p>
    </div>
  </div>
</section>

      <footer className="footer">
  <div className="footer-content">

    <div className="footer-brand">
      <h2 className="footer-logo">SAATHI</h2>

      <p className="footer-tagline">
        Trusted services. Stronger<br />
        communities.
      </p>

      <p className="footer-description">
        SAATHI connects customers with trusted local
        service providers and strengthens cooperative
        communities.
      </p>

      <span className="footer-badge">
        🛡️ Community Powered
      </span>
    </div>

    <div className="footer-column">
      <h3>Platform</h3>
      <span>Home</span>
      <span>Services</span>
      <span>How It Works</span>
      <span>My Bookings</span>
    </div>

    <div className="footer-column">
      <h3>For Providers</h3>
      <span>Join SAATHI</span>
      <span>Become a Provider</span>
      <span>Provider Login</span>
      <span>Community</span>
    </div>

    <div className="footer-column">
      <h3>Support</h3>
      <span>Help Center</span>
      <span>Contact Us</span>
      <span>FAQs</span>
      <span>Privacy Policy</span>
    </div>

  </div>

  <div className="footer-bottom">
    <p>© 2026 SAATHI. All rights reserved.</p>
    <p>Made for stronger communities 💚</p>
  </div>
</footer>
        </>
      )}

      {/* ================= BOOKING ================= */}

      {page === "booking" && (
        <main className="booking-page">

          {/* TOP */}

          {step < 6 && (
            <div className="booking-top">
              <button
                className="back-home"
                onClick={goHome}
              >
                ← Home
              </button>

              <div className="booking-progress">
                {steps.map((label, index) => {
                  const number = index + 1;

                  return (
                    <div
                      key={label}
                      className={
                        step >= number
                          ? "progress-step active"
                          : "progress-step"
                      }
                    >
                      <span>{number}</span>
                      <small>{label}</small>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 1 */}

          {step === 1 && (
            <section className="booking-container">
              <div className="booking-title">
                <span>GET STARTED</span>
                <h1>What do you need help with?</h1>
                <p>
                  Choose a service and we'll find trusted
                  professionals near you.
                </p>
              </div>

              <div className="booking-service-grid">
                {services.map((service) => (
                  <button
                    className="booking-service"
                    key={service.id}
                    onClick={() => startBooking(service)}
                  >
                    <span>{service.icon}</span>

                    <div>
                      <strong>{service.name}</strong>
                      <small>
                        From ₹{service.price}
                      </small>
                    </div>

                    <b>→</b>
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* STEP 2 */}

          {step === 2 && booking.service && (
            <section className="booking-container wide">

              <div className="booking-title">
                <div className="selected-service-label">
                  <span>{booking.service.icon}</span>
                  {booking.service.name}
                </div>

                <h1>Choose your professional</h1>

                <p>
                  Compare verified professionals and pick the
                  one that suits you.
                </p>
              </div>

              <div className="worker-grid">
                {availableWorkers.map((worker) => (
                  <article
                    className={
                      booking.worker?.id === worker.id
                        ? "worker-card selected"
                        : "worker-card"
                    }
                    key={worker.id}
                    onClick={() => selectWorker(worker)}
                  >
                    <div className="worker-header">

                      <div className="worker-avatar">
                        {worker.name.charAt(0)}
                      </div>

                      <div className="worker-main">
                        <div className="worker-name">
                          <h3>{worker.name}</h3>

                          {worker.verified && (
                            <span className="verified-badge">
                              ✓ Verified
                            </span>
                          )}
                        </div>

                        <div className="rating">
                          ⭐ {worker.rating}
                          <span>
                            ({worker.reviews} reviews)
                          </span>
                        </div>
                      </div>

                      {worker.rating >= 4.8 && (
                        <span className="top-rated">
                          Top Rated
                        </span>
                      )}
                    </div>

                    <div className="worker-speciality">
                      {worker.speciality}
                    </div>

                    <div className="worker-details">
                      <span>
                        🏆 {worker.experience}
                      </span>

                      <span>
                        📍 {worker.distance}
                      </span>
                    </div>

                    <div className="worker-footer">
                      <div>
                        <small>Service price</small>
                        <strong>
                          ₹{worker.price}
                        </strong>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          selectWorker(worker);
                        }}
                      >
                        {booking.worker?.id === worker.id
                          ? "Selected ✓"
                          : "Select"}
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              <div className="booking-actions">
                <button
                  className="secondary-btn"
                  onClick={goBack}
                >
                  ← Change Service
                </button>

                <button
                  className="primary-btn"
                  disabled={!booking.worker}
                  onClick={goNext}
                >
                  Continue →
                </button>
              </div>
            </section>
          )}

          {/* STEP 3 */}

          {step === 3 && (
            <section className="booking-container narrow">

              <div className="booking-title">
                <span>STEP 3</span>
                <h1>When should we come?</h1>
                <p>
                  Choose your preferred date and time.
                </p>
              </div>

              <div className="form-card">

                <label>
                  Preferred Date
                </label>

                <input
                  type="date"
                  min={
                    new Date()
                      .toISOString()
                      .split("T")[0]
                  }
                  value={booking.date}
                  onChange={(e) =>
                    setBooking((prev) => ({
                      ...prev,
                      date: e.target.value,
                    }))
                  }
                />

                <label className="time-label">
                  Available Time
                </label>

                <div className="time-grid">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      className={
                        booking.time === time
                          ? "time-slot selected"
                          : "time-slot"
                      }
                      onClick={() =>
                        setBooking((prev) => ({
                          ...prev,
                          time,
                        }))
                      }
                    >
                      {time}
                    </button>
                  ))}
                </div>

                <div className="booking-actions">
                  <button
                    className="secondary-btn"
                    onClick={goBack}
                  >
                    ← Back
                  </button>

                  <button
                    className="primary-btn"
                    disabled={
                      !booking.date || !booking.time
                    }
                    onClick={goNext}
                  >
                    Continue →
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* STEP 4 */}

          {step === 4 && (
            <section className="booking-container narrow">

              <div className="booking-title">
                <span>STEP 4</span>
                <h1>Where should we come?</h1>
                <p>
                  Enter the address for your service.
                </p>
              </div>

              <div className="form-card">

                <label>Service Address</label>

                <textarea
                  rows="5"
                  placeholder="House no., street, area, city..."
                  value={booking.address}
                  onChange={(e) =>
                    setBooking((prev) => ({
                      ...prev,
                      address: e.target.value,
                    }))
                  }
                />

                <label className="time-label">
                  Additional instructions
                  <span> Optional</span>
                </label>

                <textarea
                  rows="3"
                  placeholder="Anything the professional should know?"
                  value={booking.notes}
                  onChange={(e) =>
                    setBooking((prev) => ({
                      ...prev,
                      notes: e.target.value,
                    }))
                  }
                />

                <div className="booking-actions">
                  <button
                    className="secondary-btn"
                    onClick={goBack}
                  >
                    ← Back
                  </button>

                  <button
                    className="primary-btn"
                    disabled={!booking.address.trim()}
                    onClick={goNext}
                  >
                    Review Booking →
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* STEP 5 */}

          {step === 5 &&
            booking.service &&
            booking.worker && (
              <section className="booking-container narrow">

                <div className="booking-title">
                  <span>ALMOST DONE</span>
                  <h1>Review your booking</h1>
                  <p>
                    Everything look good? Confirm your booking.
                  </p>
                </div>

                <div className="summary-card">

                  <div className="summary-header">
                    <div className="summary-service-icon">
                      {booking.service.icon}
                    </div>

                    <div>
                      <h2>
                        {booking.service.name}
                      </h2>

                      <p>
                        {booking.service.description}
                      </p>
                    </div>
                  </div>

                  <div className="summary-worker">
                    <div className="worker-avatar small">
                      {booking.worker.name.charAt(0)}
                    </div>

                    <div>
                      <strong>
                        {booking.worker.name}
                      </strong>

                      <span>
                        ⭐ {booking.worker.rating} ·{" "}
                        {booking.worker.experience}
                      </span>
                    </div>

                    <strong>
                      ₹{booking.worker.price}
                    </strong>
                  </div>

                  <div className="summary-info">

                    <div>
                      <small>Date</small>
                      <strong>
                        📅 {booking.date}
                      </strong>
                    </div>

                    <div>
                      <small>Time</small>
                      <strong>
                        ⏰ {booking.time}
                      </strong>
                    </div>

                    <div className="full">
                      <small>Address</small>
                      <strong>
                        📍 {booking.address}
                      </strong>
                    </div>

                    {booking.notes && (
                      <div className="full">
                        <small>Instructions</small>
                        <strong>
                          📝 {booking.notes}
                        </strong>
                      </div>
                    )}

                  </div>

                  <div className="summary-total">
                    <span>Estimated total</span>
                    <strong>
                      ₹{booking.worker.price}
                    </strong>
                  </div>

                  <p className="price-note">
                    Final price may vary if additional work
                    is required.
                  </p>
                </div>

                <div className="booking-actions">
                  <button
                    className="secondary-btn"
                    onClick={goBack}
                  >
                    ← Edit
                  </button>

                  <button
                    className="primary-btn confirm-btn"
                    onClick={confirmBooking}
                  >
                    Confirm Booking ✓
                  </button>
                </div>
              </section>
            )}

          {/* ================= CONFIRMATION ================= */}

          {step === 6 && (
            <section className="confirmation-page">

              <div className="success-circle">
                ✓
              </div>

              <span className="success-label">
                BOOKING CONFIRMED
              </span>

              <h1>You're all set!</h1>

              <p>
                Your trusted professional has been
                successfully booked.
              </p>

              <div className="confirmation-card">

                <div className="booking-id">
                  <small>Booking ID</small>
                  <strong>{bookingId}</strong>
                </div>

                <div className="confirmation-grid">

                  <div>
                    <small>Service</small>
                    <strong>
                      {booking.service?.icon}{" "}
                      {booking.service?.name}
                    </strong>
                  </div>

                  <div>
                    <small>Professional</small>
                    <strong>
                      {booking.worker?.name}
                    </strong>
                  </div>

                  <div>
                    <small>Date & Time</small>
                    <strong>
                      {booking.date} · {booking.time}
                    </strong>
                  </div>

                  <div>
                    <small>Amount</small>
                    <strong>
                      ₹{booking.worker?.price}
                    </strong>
                  </div>

                </div>
              </div>

              <button
                className="primary-btn"
                onClick={goHome}
              >
                Back to Home
              </button>
            </section>
          )}
        </main>
      )}

      {/* ================= LOGIN ================= */}

      {loginOpen && (
        <div
          className="modal-overlay"
          onClick={() => setLoginOpen(false)}
        >
          <div
            className="login-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setLoginOpen(false)}
            >
              ×
            </button>

            <div className="login-icon">
              👋
            </div>

            <h2>Welcome to SAATHI</h2>

            <p>
              Login to manage your bookings.
            </p>

            <input
              type="email"
              placeholder="Email address"
            />

            <input
              type="password"
              placeholder="Password"
            />

            <button
              className="primary-btn"
              onClick={() => {
                setLoginOpen(false);
                alert("Demo login successful!");
              }}
            >
              Login
            </button>

            <small>
              Demo mode — authentication will be connected
              later.
            </small>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
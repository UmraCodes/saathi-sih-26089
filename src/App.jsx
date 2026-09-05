import { useState } from "react";

const services = [
  "Plumbing",
  "Cleaning",
  "Electrical",
  "Carpentry",
];

const providers = [
  {
    name: "Rahul Sharma",
    rating: 4.8,
    experience: "5 years",
    distance: "1.2 km",
    verified: true,
  },
  {
    name: "Amit Verma",
    rating: 4.6,
    experience: "4 years",
    distance: "2.1 km",
    verified: true,
  },
  {
    name: "Suresh Kumar",
    rating: 4.9,
    experience: "7 years",
    distance: "3.0 km",
    verified: true,
  },
];

const timeSlots = [
  "09:00 AM",
  "11:00 AM",
  "01:00 PM",
  "03:00 PM",
  "05:00 PM",
  "07:00 PM",
];

function App() {
  const [step, setStep] = useState(1);

  const [booking, setBooking] = useState({
    service: "",
    provider: "",
    date: "",
    time: "",
    address: "",
  });

  const updateBooking = (field, value) => {
    setBooking((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const nextStep = () => {
    setStep((previous) => previous + 1);
  };

  const previousStep = () => {
    setStep((previous) => previous - 1);
  };

  return (
    <div className="booking-container">
      <h1>SAATHI</h1>
      <p>Customer Booking</p>

      {/* Step 1: Service */}
      {step === 1 && (
        <div className="booking-card">
          <h2>1. Select Service</h2>

          {services.map((service) => (
            <button
              key={service}
              onClick={() => updateBooking("service", service)}
              className={booking.service === service ? "selected" : ""}
            >
              {service}
            </button>
          ))}

          <br />

          <button onClick={nextStep} disabled={!booking.service}>
            Next
          </button>
        </div>
      )}

      {/* Step 2: Provider */}
      {step === 2 && (
        <div className="booking-card">
          <h2>2. Select Worker / Provider</h2>

          {providers.map((provider) => (
            <button
              key={provider.name}
              onClick={() => updateBooking("provider", provider.name)}
              className={
                booking.provider === provider.name ? "selected" : ""
              }
            >
              <strong>{provider.name}</strong>
              <br />
              ⭐ {provider.rating} | {provider.experience} |{" "}
              {provider.distance}
              <br />
              {provider.verified && "✓ Verified Provider"}
            </button>
          ))}

          <div>
            <button onClick={previousStep}>Back</button>

            <button onClick={nextStep} disabled={!booking.provider}>
              Next
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Date & Time */}
      {step === 3 && (
        <div className="booking-card">
          <h2>3. Select Date & Time</h2>

          <input
            type="date"
            value={booking.date}
            onChange={(event) =>
              updateBooking("date", event.target.value)
            }
          />

          <h3>Available Time Slots</h3>

          {timeSlots.map((time) => (
            <button
              key={time}
              onClick={() => updateBooking("time", time)}
              className={booking.time === time ? "selected" : ""}
            >
              {time}
            </button>
          ))}

          <div>
            <button onClick={previousStep}>Back</button>

            <button
              onClick={nextStep}
              disabled={!booking.date || !booking.time}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Address */}
      {step === 4 && (
        <div className="booking-card">
          <h2>4. Service Address</h2>

          <textarea
            placeholder="Enter your service address"
            value={booking.address}
            onChange={(event) =>
              updateBooking("address", event.target.value)
            }
          />

          <div>
            <button onClick={previousStep}>Back</button>

            <button onClick={nextStep} disabled={!booking.address}>
              View Summary
            </button>
          </div>
        </div>
      )}

      {/* Step 5: Booking Summary */}
      {step === 5 && (
        <div className="booking-card">
          <h2>5. Booking Summary</h2>

          <p>
            <strong>Service:</strong> {booking.service}
          </p>

          <p>
            <strong>Provider:</strong> {booking.provider}
          </p>

          <p>
            <strong>Date:</strong> {booking.date}
          </p>

          <p>
            <strong>Time:</strong> {booking.time}
          </p>

          <p>
            <strong>Address:</strong> {booking.address}
          </p>

          <p>
            <strong>Estimated Cost:</strong> ₹500 (Mock)
          </p>

          <button onClick={previousStep}>Back</button>

          <button onClick={nextStep}>Confirm Booking</button>
        </div>
      )}

      {/* Step 6: Confirmation */}
      {step === 6 && (
        <div className="booking-card">
          <h2>🎉 Booking Confirmed!</h2>

          <p>Your service has been booked successfully.</p>

          <p>
            <strong>Booking ID:</strong>{" "}
            SAATHI-{Math.floor(Math.random() * 90000) + 10000}
          </p>

          <p>
            <strong>Service:</strong> {booking.service}
          </p>

          <p>
            <strong>Provider:</strong> {booking.provider}
          </p>

          <p>
            <strong>Date & Time:</strong> {booking.date} at {booking.time}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
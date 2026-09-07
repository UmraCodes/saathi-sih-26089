import { useState } from "react";

const initialBookings = [
  {
    id: 1,
    customer: "Aarav Sharma",
    service: "Plumbing",
    date: "Today",
    time: "11:00 AM",
    address: "Civil Lines, Jhansi",
    price: 399,
  },
  {
    id: 2,
    customer: "Priya Verma",
    service: "AC & Appliance Repair",
    date: "Tomorrow",
    time: "03:00 PM",
    address: "Sipri Bazaar, Jhansi",
    price: 699,
  },
  {
    id: 3,
    customer: "Rohan Gupta",
    service: "Electrical",
    date: "Sep 10",
    time: "05:00 PM",
    address: "Sadar Bazaar, Jhansi",
    price: 349,
  },
];

export default function ProviderApp({ onBack }) {
  const [requests, setRequests] = useState(initialBookings);
  const [upcomingJobs, setUpcomingJobs] = useState([]);
  const [completedJobs, setCompletedJobs] = useState(28);
  const [earnings, setEarnings] = useState(12450);

  const [showSchedule, setShowSchedule] = useState(false);
  const [showEarnings, setShowEarnings] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [available, setAvailable] = useState(true);

  const acceptBooking = (booking) => {
    setRequests(
      requests.filter((item) => item.id !== booking.id)
    );

    setUpcomingJobs([...upcomingJobs, booking]);
  };

  const rejectBooking = (id) => {
    setRequests(
      requests.filter((booking) => booking.id !== id)
    );
  };

  const completeBooking = (booking) => {
    setUpcomingJobs(
      upcomingJobs.filter((item) => item.id !== booking.id)
    );

    setCompletedJobs(completedJobs + 1);
    setEarnings(earnings + booking.price);
  };

  const toggleSchedule = () => {
    setShowSchedule(!showSchedule);
    setShowEarnings(false);
    setShowProfile(false);
  };

  const toggleEarnings = () => {
    setShowEarnings(!showEarnings);
    setShowSchedule(false);
    setShowProfile(false);
  };

  const toggleProfile = () => {
    setShowProfile(!showProfile);
    setShowSchedule(false);
    setShowEarnings(false);
  };

  return (
    <div className="provider-page">

      {/* HEADER */}

      <header className="provider-header">

        <div>
          <h1>SAATHI</h1>
          <p>Service Provider Dashboard</p>
        </div>

        <div className="provider-profile">

          <div className="provider-avatar">
            RK
          </div>

          <div>
            <strong>Rahul Kumar</strong>
            <span>Verified Provider</span>
          </div>

        </div>

      </header>


      <main className="provider-main">

        {/* BACK BUTTON */}

        <button
          className="provider-back-button"
          onClick={onBack}
        >
          ← Back to SAATHI
        </button>


        {/* WELCOME */}

        <section className="provider-welcome">

          <div>
            <span>WELCOME BACK</span>

            <h2>
              Good morning, Rahul 👋
            </h2>

            <p>
              Here’s what’s happening with your services today.
            </p>
          </div>

        </section>


        {/* STATS */}

        <section className="provider-stats">

          <div className="provider-stat-card">
            <span>Pending Requests</span>
            <strong>{requests.length}</strong>
          </div>

          <div className="provider-stat-card">
            <span>Upcoming Jobs</span>
            <strong>{upcomingJobs.length}</strong>
          </div>

          <div className="provider-stat-card">
            <span>Completed Jobs</span>
            <strong>{completedJobs}</strong>
          </div>

          <div className="provider-stat-card">
            <span>This Month</span>
            <strong>
              ₹{earnings.toLocaleString("en-IN")}
            </strong>
          </div>

        </section>


        {/* QUICK ACTIONS */}

        <section className="provider-quick-actions">

          <div
            className="quick-action-card"
            onClick={toggleSchedule}
          >
            <div className="quick-action-icon">
              📅
            </div>

            <div>
              <h3>My Schedule</h3>
              <p>View your upcoming jobs</p>
            </div>

            <span>→</span>
          </div>


          <div
            className="quick-action-card"
            onClick={toggleEarnings}
          >
            <div className="quick-action-icon">
              💰
            </div>

            <div>
              <h3>Earnings</h3>
              <p>Track your service earnings</p>
            </div>

            <span>→</span>
          </div>


          <div
            className="quick-action-card"
            onClick={toggleProfile}
          >
            <div className="quick-action-icon">
              👤
            </div>

            <div>
              <h3>My Profile</h3>
              <p>Manage your provider profile</p>
            </div>

            <span>→</span>
          </div>

        </section>


        {/* SCHEDULE */}

        {showSchedule && (

          <section className="provider-schedule">

            <div className="provider-section-heading">

              <div>
                <span>MY SCHEDULE</span>

                <h2>
                  Availability & Upcoming Schedule
                </h2>
              </div>

              <button
                className={
                  available
                    ? "availability-on"
                    : "availability-off"
                }
                onClick={() =>
                  setAvailable(!available)
                }
              >
                {available
                  ? "● Available"
                  : "● Unavailable"}
              </button>

            </div>


            {upcomingJobs.length === 0 ? (

              <div className="no-requests">

                <h3>No scheduled jobs yet</h3>

                <p>
                  Accept a booking request to see it
                  in your schedule.
                </p>

              </div>

            ) : (

              upcomingJobs.map((booking) => (

                <div
                  className="schedule-card"
                  key={booking.id}
                >

                  <div className="schedule-day">
                    <strong>{booking.date}</strong>
                    <span>{booking.time}</span>
                  </div>

                  <div className="schedule-job">

                    <span className="booking-service">
                      {booking.service}
                    </span>

                    <h3>{booking.customer}</h3>

                    <p>
                      🕐 {booking.time}
                      &nbsp; • &nbsp;
                      📍 {booking.address}
                    </p>

                  </div>

                  <span className="schedule-status">
                    Upcoming
                  </span>

                </div>

              ))

            )}

          </section>

        )}


        {/* EARNINGS */}

        {showEarnings && (

          <section className="provider-schedule">

            <div className="provider-section-heading">

              <div>
                <span>EARNINGS</span>

                <h2>Your Earnings</h2>
              </div>

            </div>


            <div className="provider-stats">

              <div className="provider-stat-card">
                <span>This Month</span>

                <strong>
                  ₹{earnings.toLocaleString("en-IN")}
                </strong>
              </div>


              <div className="provider-stat-card">
                <span>Completed Jobs</span>

                <strong>
                  {completedJobs}
                </strong>
              </div>


              <div className="provider-stat-card">
                <span>Average Per Job</span>

                <strong>
                  ₹{Math.round(
                    earnings / completedJobs
                  ).toLocaleString("en-IN")}
                </strong>
              </div>

            </div>


            <div className="no-requests">

              <h3>
                Earnings are updated automatically
              </h3>

              <p>
                Complete a service to add its payment
                to your monthly earnings.
              </p>

            </div>

          </section>

        )}


        {/* PROFILE */}

        {showProfile && (

          <section className="provider-profile-section">

            <div className="profile-section-header">

              <div>
                <span>MY PROFILE</span>

                <h2>
                  Provider Information
                </h2>
              </div>

              <div className="profile-verified">
                ✓ Verified Provider
              </div>

            </div>


            <div className="profile-card">

              <div className="profile-main">

                <div className="large-provider-avatar">
                  RK
                </div>

                <div>

                  <h3>Rahul Kumar</h3>

                  <p>
                    Professional Service Provider
                  </p>

                  <div className="profile-rating">
                    ⭐ 4.8
                    <span>
                      • 124 reviews
                    </span>
                  </div>

                </div>

              </div>


              <div className="profile-details">

                <div>
                  <span>EXPERIENCE</span>
                  <strong>5 Years</strong>
                </div>

                <div>
                  <span>SERVICES</span>
                  <strong>
                    Plumbing, Electrical
                  </strong>
                </div>

                <div>
                  <span>LOCATION</span>
                  <strong>
                    Jhansi, Uttar Pradesh
                  </strong>
                </div>

                <div>
                  <span>AVAILABILITY</span>

                  <strong className="available-text">
                    ● {available
                      ? "Available"
                      : "Unavailable"}
                  </strong>
                </div>

              </div>

            </div>

          </section>

        )}


        {/* UPCOMING JOBS */}

        {upcomingJobs.length > 0 && (

          <section className="provider-bookings">

            <div className="provider-section-heading">

              <div>
                <span>UPCOMING JOBS</span>

                <h2>
                  Your Scheduled Jobs
                </h2>
              </div>

            </div>


            <div className="provider-booking-list">

              {upcomingJobs.map((booking) => (

                <div
                  className="provider-booking-card"
                  key={booking.id}
                >

                  <div className="booking-top">

                    <div>

                      <span className="booking-service">
                        {booking.service}
                      </span>

                      <h3>
                        {booking.customer}
                      </h3>

                    </div>

                    <strong className="booking-price">
                      ₹{booking.price}
                    </strong>

                  </div>


                  <div className="booking-info">

                    <span>
                      📅 {booking.date}
                    </span>

                    <span>
                      🕐 {booking.time}
                    </span>

                    <span>
                      📍 {booking.address}
                    </span>

                  </div>


                  <button
                    className="accept-btn"
                    onClick={() =>
                      completeBooking(booking)
                    }
                  >
                    Mark as Completed
                  </button>

                </div>

              ))}

            </div>

          </section>

        )}


        {/* BOOKING REQUESTS */}

        <section className="provider-bookings">

          <div className="provider-section-heading">

            <div>
              <span>
                BOOKING REQUESTS
              </span>

              <h2>
                New Service Requests
              </h2>
            </div>

          </div>


          <div className="provider-booking-list">

            {requests.length === 0 ? (

              <div className="no-requests">

                <h3>
                  No pending requests
                </h3>

                <p>
                  You're all caught up!
                </p>

              </div>

            ) : (

              requests.map((booking) => (

                <div
                  className="provider-booking-card"
                  key={booking.id}
                >

                  <div className="booking-top">

                    <div>

                      <span className="booking-service">
                        {booking.service}
                      </span>

                      <h3>
                        {booking.customer}
                      </h3>

                    </div>

                    <strong className="booking-price">
                      ₹{booking.price}
                    </strong>

                  </div>


                  <div className="booking-info">

                    <span>
                      📅 {booking.date}
                    </span>

                    <span>
                      🕐 {booking.time}
                    </span>

                    <span>
                      📍 {booking.address}
                    </span>

                  </div>


                  <div className="booking-actions">

                    <button
                      className="accept-btn"
                      onClick={() =>
                        acceptBooking(booking)
                      }
                    >
                      Accept
                    </button>

                    <button
                      className="reject-btn"
                      onClick={() =>
                        rejectBooking(booking.id)
                      }
                    >
                      Reject
                    </button>

                  </div>

                </div>

              ))

            )}

          </div>

        </section>


        {/* PERFORMANCE */}

        <section className="provider-completed-summary">

          <div>

            <span>
              YOUR PERFORMANCE
            </span>

            <h2>
              Great work, Rahul! 🎉
            </h2>

            <p>

              You have successfully completed{" "}

              <strong>
                {completedJobs} jobs
              </strong>

              {" "}and earned{" "}

              <strong>
                ₹{earnings.toLocaleString("en-IN")}
              </strong>

              {" "}this month.

            </p>

          </div>

        </section>

      </main>

    </div>
  );
}
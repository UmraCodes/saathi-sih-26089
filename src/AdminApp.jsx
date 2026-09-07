import { useMemo, useState } from "react";
import "./AdminApp.css";

const initialRequests = [
  { id: "REQ-2048", name: "Sanjay Kumar", initials: "SK", service: "Electrical", location: "Bhopal, MP", submitted: "12 min ago", experience: "6 years", rating: "4.8", status: "pending", tone: "amber" },
  { id: "REQ-2047", name: "Meena Joshi", initials: "MJ", service: "Home cleaning", location: "Indore, MP", submitted: "48 min ago", experience: "4 years", rating: "4.9", status: "pending", tone: "blue" },
  { id: "REQ-2046", name: "Irfan Shaikh", initials: "IS", service: "Appliance repair", location: "Bhopal, MP", submitted: "2 hrs ago", experience: "8 years", rating: "4.7", status: "pending", tone: "coral" },
];

const initialWorkers = [
  { id: "SA-1082", name: "Rakesh Yadav", initials: "RY", service: "Plumbing", jobs: 142, rating: "4.9", location: "Kolar Road", state: "Online", tone: "green" },
  { id: "SA-1076", name: "Pooja Sharma", initials: "PS", service: "Home cleaning", jobs: 154, rating: "4.9", location: "Arera Colony", state: "Online", tone: "lilac" },
  { id: "SA-1054", name: "Arjun Singh", initials: "AS", service: "Electrical", jobs: 137, rating: "4.8", location: "MP Nagar", state: "Offline", tone: "blue" },
  { id: "SA-1031", name: "Mahesh Prajapati", initials: "MP", service: "Carpentry", jobs: 128, rating: "4.9", location: "New Market", state: "Online", tone: "orange" },
];

const activity = [
  ["RJ", "Rajesh Jain", "completed a plumbing job", "8 min ago", "green"],
  ["NM", "Neha Mehta", "raised a payment concern", "24 min ago", "coral"],
  ["AK", "Amit Kumar", "joined as an electrician", "1 hr ago", "blue"],
  ["PS", "Pooja Sharma", "received a 5-star review", "2 hrs ago", "lilac"],
];

const navItems = [
  ["overview", "Overview", "⌂"],
  ["requests", "Service requests", "◌"],
  ["workers", "Providers", "♙"],
  ["services", "Members", "◎"],
  ["complaints", "Payouts", "↗"],
];

const customerServices = [
  { id: "plumbing", name: "Plumbing", icon: "🔧", description: "Pipes, taps, leaks & bathroom repairs", price: 399 },
  { id: "cleaning", name: "Home cleaning", icon: "🧹", description: "Home, kitchen & deep cleaning", price: 499 },
  { id: "electrical", name: "Electrical", icon: "⚡", description: "Wiring, switches, fans & installation", price: 349 },
  { id: "carpentry", name: "Carpentry", icon: "🪚", description: "Furniture, doors & woodwork", price: 599 },
];

const customerProviders = [
  { name: "Rakesh Yadav", rating: "4.9", experience: "7 years", distance: "1.2 km", speciality: "Leak & pipe specialist", price: 399 },
  { name: "Pooja Sharma", rating: "4.9", experience: "6 years", distance: "1.1 km", speciality: "Deep cleaning", price: 499 },
  { name: "Arjun Singh", rating: "4.8", experience: "7 years", distance: "1.3 km", speciality: "Wiring specialist", price: 349 },
];

function App({ onBack }) {
  const [activePage, setActivePage] = useState("overview");
  const [requests, setRequests] = useState(initialRequests);
  const [workers, setWorkers] = useState(initialWorkers);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showCustomer, setShowCustomer] = useState(false);

  const pendingCount = requests.filter((request) => request.status === "pending").length;
  const filteredWorkers = useMemo(
    () => workers.filter((worker) => `${worker.name} ${worker.service} ${worker.location}`.toLowerCase().includes(search.toLowerCase())),
    [workers, search]
  );

  const notify = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  };

  const updateRequest = (id, status) => {
    setRequests((current) => current.map((request) => (request.id === id ? { ...request, status } : request)));
    notify(status === "approved" ? "Worker approved and added to the directory" : "Request moved to the review queue");
  };

  const toggleWorker = (id) => {
    setWorkers((current) => current.map((worker) => worker.id === id ? { ...worker, state: worker.state === "Online" ? "Offline" : "Online" } : worker));
    notify("Worker availability updated");
  };

  const pageTitle = {
    overview: ["Good morning, Admin", "Here is what is happening across your community today."],
    requests: ["Join requests", "Review and verify professionals before they serve the community."],
    workers: ["Worker directory", "Keep track of trusted professionals and their live availability."],
    services: ["Service catalogue", "Manage the categories available to customers in your region."],
    complaints: ["Complaints & support", "Resolve issues quickly and keep every interaction accountable."],
  }[activePage];

  return (
    showCustomer ? <CustomerPortal onBack={() => setShowCustomer(false)} /> :
    <div className="admin-shell">
      <aside className={sidebarOpen ? "sidebar open" : "sidebar"}>
        <div className="brand"><img className="brand-mark" src="/sih-lightning.png" alt="SIH" /><span>SAATHI</span><small>ADMIN CONSOLE</small></div>
        <div className="workspace-switcher"><span>SA</span><div><strong>SAATHI</strong><small>Community workspace</small></div><b>⌄</b></div>
        <div className="workspace-label">WORKSPACE</div>
        <nav>{navItems.map(([id, label, icon]) => <button key={id} className={activePage === id ? "nav-item active" : "nav-item"} onClick={() => setActivePage(id)}><span className="nav-icon">{icon}</span>{label}{id === "requests" && pendingCount > 0 ? <b className="nav-count">{pendingCount}</b> : null}</button>)}</nav>
        <div className="sidebar-bottom">
          <div className="sidebar-section-label">MANAGE</div>
          <button className="manage-link" onClick={() => notify("Insights opened")}>↝ <span>Insights</span></button>
          <button className="manage-link" onClick={() => notify("Settings opened")}>⚙ <span>Settings</span></button>
          <button className="customer-link" onClick={onBack}>↗ <span>Customer view</span></button>
          <div className="admin-user"><div className="avatar dark">AM</div><div><strong>Ananya Mehra</strong><small>Super admin</small></div><span>•••</span></div>
        </div>
      </aside>

    <main className="main-content">
  <header className="topbar"><button className="mobile-menu" aria-label={sidebarOpen ? "Close menu" : "Open menu"} onClick={() => setSidebarOpen((open) => !open)}><span /><span /><span /></button><div className="crumb"><span>SAATHI</span><b>/</b> <strong>Good morning, Admin <img className="inline-mark" src="/sih-lightning.png" alt="SIH" /></strong></div><div className="top-actions"><div className="top-search">⌕ &nbsp; Search anything</div><button className="shortcut">⌘ K</button><button className="icon-button" aria-label="Notifications">♢<i /></button><button className="new-request" onClick={() => notify("New request flow opened")}>+ New request</button></div></header>

  <div className="content-wrap">
    <div className="page-heading"><div><span className="eyebrow">TUESDAY, 08 SEPTEMBER 2026</span><h1>{pageTitle[0]} <img className="heading-mark" src="/sih-lightning.png" alt="SIH" /></h1><p>{pageTitle[1]}</p></div><button className="date-filter">Last 30 days　⌄</button></div>

    {activePage === "overview" && <Overview requests={requests} onRequest={updateRequest} onGo={setActivePage} />}
    {activePage === "requests" && <Requests requests={requests} onRequest={updateRequest} />}
    {activePage === "workers" && <Workers workers={filteredWorkers} search={search} setSearch={setSearch} onToggle={toggleWorker} />}
    {activePage === "services" && <Services onNotify={notify} />}
    {activePage === "complaints" && <Complaints onNotify={notify} />}
  </div>
</main>

{toast && <div className="toast"><span>✓</span>{toast}</div>}
</div>
);
}

function Overview({ requests, onRequest, onGo }) {
  const pending = requests.filter((request) => request.status === "pending");
  return <>
    <section className="stat-grid">
      <Stat label="Open requests" value="24" delta="+18.2%" note="vs last month" icon="◌" tone="coral" />
      <Stat label="Active providers" value="86" delta="+7.4%" note="vs last month" icon="♙" tone="green" />
      <Stat label="Completed this month" value="142" delta="+12.6%" note="vs last month" icon="✓" tone="yellow" />
      <Stat label="Community earnings" value="₹1.84L" delta="+9.8%" note="vs last month" icon="₹" tone="lilac" />
    </section>
    <div className="dashboard-grid">
      <section className="panel requests-panel"><PanelHead title="Requests needing attention" meta="Review and route new community requests." action="View all" onAction={() => onGo("requests")} /><div className="attention-list">{pending.length ? pending.map((request) => <RequestRow key={request.id} request={request} onAction={onRequest} />) : <Empty text="All join requests are reviewed." />}</div></section>
      <section className="panel pulse-panel"><PanelHead title="Community pulse" meta="Last 7 days" /><div className="chart"><div className="chart-y"><span>200</span><span>150</span><span>100</span><span>50</span><span>0</span></div><div className="chart-area"><svg viewBox="0 0 520 190" preserveAspectRatio="none" aria-label="Bookings trend"><defs><linearGradient id="fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#4b9a79" stopOpacity=".28" /><stop offset="1" stopColor="#4b9a79" stopOpacity="0" /></linearGradient></defs><path d="M0 160 C45 154, 50 138, 88 145 S135 123, 174 128 S210 105, 244 118 S280 96, 320 106 S358 74, 390 86 S440 45, 470 59 S505 28, 520 34 L520 190 L0 190Z" fill="url(#fill)" /><path d="M0 160 C45 154, 50 138, 88 145 S135 123, 174 128 S210 105, 244 118 S280 96, 320 106 S358 74, 390 86 S440 45, 470 59 S505 28, 520 34" fill="none" stroke="#327b60" strokeWidth="3" /></svg><div className="chart-labels"><span>31 Aug</span><span>01 Sep</span><span>02 Sep</span><span>03 Sep</span><span>04 Sep</span><span>05 Sep</span><span>06 Sep</span></div></div></div><div className="chart-legend"><span><i className="dot green-dot" />Bookings <b>1,284</b></span><span><i className="dot orange-dot" />Completed <b>1,097</b></span></div></section>
    </div>
    <div className="dashboard-grid lower"><section className="panel activity-panel"><PanelHead title="Recent activity" meta="Live updates" /><div className="activity-list">{activity.map(([initials, name, action, time, tone]) => <div className="activity-row" key={name}><div className={`avatar ${tone}`}>{initials}</div><div><strong>{name}</strong><span>{action}</span></div><time>{time}</time></div>)}</div></section><section className="panel category-panel"><PanelHead title="Bookings by service" meta="This month" /><div className="category-list"><Category name="Home cleaning" value="368" percent="78%" color="green" /><Category name="Plumbing" value="294" percent="62%" color="blue" /><Category name="Electrical" value="241" percent="51%" color="orange" /><Category name="Appliance repair" value="186" percent="39%" color="lilac" /></div></section></div>
  </>;
}

function Requests({ requests, onRequest }) { return <section className="panel full-panel"><PanelHead title="All join requests" meta={`${requests.length} total`} /><div className="table-wrap"><table><thead><tr><th>Applicant</th><th>Service</th><th>Experience</th><th>Rating</th><th>Submitted</th><th>Status</th><th /></tr></thead><tbody>{requests.map((request) => <tr key={request.id}><td><div className="table-person"><div className={`avatar ${request.tone}`}>{request.initials}</div><div><strong>{request.name}</strong><small>{request.id} · {request.location}</small></div></div></td><td>{request.service}</td><td>{request.experience}</td><td>★ {request.rating}</td><td>{request.submitted}</td><td><span className={`status ${request.status}`}>{request.status}</span></td><td>{request.status === "pending" ? <div className="row-actions"><button className="approve" onClick={() => onRequest(request.id, "approved")}>Approve</button><button className="reject" onClick={() => onRequest(request.id, "declined")}>Decline</button></div> : <span className="muted">Reviewed</span>}</td></tr>)}</tbody></table></div></section> }

function Workers({ workers, search, setSearch, onToggle }) { return <section className="panel full-panel"><div className="directory-toolbar"><PanelHead title="Verified workers" meta={`${workers.length} showing`} /><div className="search-field">⌕<input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search name, service or area" /></div></div><div className="table-wrap"><table><thead><tr><th>Worker</th><th>Speciality</th><th>Jobs completed</th><th>Rating</th><th>Availability</th><th /></tr></thead><tbody>{workers.map((worker) => <tr key={worker.id}><td><div className="table-person"><div className={`avatar ${worker.tone}`}>{worker.initials}</div><div><strong>{worker.name}</strong><small>{worker.id} · {worker.location}</small></div></div></td><td>{worker.service}</td><td>{worker.jobs}</td><td>★ {worker.rating}</td><td><button className={`availability ${worker.state.toLowerCase()}`} onClick={() => onToggle(worker.id)}><i />{worker.state}</button></td><td><button className="more-button">•••</button></td></tr>)}</tbody></table></div></section> }

function Services({ onNotify }) { const data = [["Plumbing", "Pipes, taps, leaks & bathroom repairs", "64 workers", "₹399", "🔧", "green"], ["Home cleaning", "Home, kitchen & deep cleaning", "52 workers", "₹499", "✦", "orange"], ["Electrical", "Wiring, switches, fans & installation", "41 workers", "₹349", "⌁", "blue"], ["Appliance repair", "AC, fridge, washing machine & more", "36 workers", "₹699", "◈", "lilac"]]; return <section className="service-management">{data.map(([name, description, workers, price, icon, tone]) => <article className="service-row" key={name}><div className={`service-symbol ${tone}`}>{icon}</div><div className="service-copy"><strong>{name}</strong><span>{description}</span></div><span className="service-workers">{workers}</span><span className="service-price">From <b>{price}</b></span><button className="more-button" onClick={() => onNotify(`${name} settings opened`)}>•••</button></article>)}</section> }

function Complaints({ onNotify }) { const data = [["#CP-0182", "Payment not reflected", "Neha Mehta", "High", "2 hrs ago", "coral"], ["#CP-0181", "Worker arrived late", "Vivek Tiwari", "Medium", "5 hrs ago", "orange"], ["#CP-0180", "Service quality concern", "Suresh Patil", "Low", "Yesterday", "blue"]]; return <section className="panel full-panel"><PanelHead title="Open complaints" meta="3 unresolved" /><div className="complaint-list">{data.map(([id, title, person, priority, time, tone]) => <div className="complaint-row" key={id}><div className={`priority ${tone}`} /> <div className="complaint-main"><strong>{title}</strong><span>{id} · raised by {person}</span></div><span className={`priority-label ${priority.toLowerCase()}`}>{priority}</span><time>{time}</time><button className="outline-button small" onClick={() => onNotify(`Opening case ${id}`)}>Review case →</button></div>)}</div></section> }

function Stat({ label, value, delta, note, icon, tone }) { return <div className="stat-card"><div className={`stat-icon ${tone}`}>{icon}</div><div className="stat-copy"><span>{label}</span><strong>{value}</strong><small><b>↗ {delta}</b> {note}</small></div></div> }
function PanelHead({ title, meta, action, onAction }) { return <div className="panel-head"><div><h2>{title}</h2><span>{meta}</span></div>{action && <button className="text-button" onClick={onAction}>{action} →</button>}</div> }
function RequestRow({ request, onAction }) { return <div className="request-row"><div className={`avatar ${request.tone}`}>{request.initials}</div><div className="request-main"><strong>{request.name}</strong><span>{request.service} · {request.experience} experience</span><small>{request.id} · {request.submitted}</small></div><div className="request-rating">★ {request.rating}</div><div className="row-actions"><button className="approve" onClick={() => onAction(request.id, "approved")}>Approve</button><button className="reject" onClick={() => onAction(request.id, "declined")}>Review</button></div></div> }
function Category({ name, value, percent, color }) { return <div className="category-row"><div><span>{name}</span><b>{value}</b></div><div className="bar"><i className={color} style={{ width: percent }} /></div></div> }
function Empty({ text }) { return <div className="empty-state">{text}</div> }

function CustomerPortal({ onBack }) {
  const [step, setStep] = useState(0);
  const [service, setService] = useState(null);
  const [provider, setProvider] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [bookingId, setBookingId] = useState("");
  const times = ["09:00 AM", "11:00 AM", "01:00 PM", "03:00 PM", "05:00 PM", "07:00 PM"];
  const chooseService = (item) => { setService(item); setProvider(null); setStep(2); };
  const confirm = () => { setBookingId(`ST-${Math.floor(10000000 + Math.random() * 90000000)}`); setStep(6); };

  return <div className="customer-portal">
    <header className="customer-nav"><button className="customer-logo" onClick={onBack}>SAATHI</button><div><span>Trusted community services</span><button onClick={onBack}>Admin console ↗</button></div></header>
    {step === 0 && <CustomerHome services={customerServices} onSelect={chooseService} />}
    {step > 0 && step < 6 && <div className="customer-progress"><button onClick={() => step === 1 ? setStep(0) : setStep((current) => current - 1)}>← Back</button><div>{["Service", "Professional", "Schedule", "Address", "Review"].map((label, index) => <span className={step >= index + 1 ? "current" : ""} key={label}><b>{index + 1}</b>{label}</span>)}</div></div>}
    {step === 2 && <section className="customer-section"><CustomerTitle eyebrow={service.name} title="Choose your professional" copy="Compare verified professionals and pick the one that suits you." /><div className="provider-grid">{customerProviders.map((item) => <article className={provider?.name === item.name ? "provider-card selected" : "provider-card"} key={item.name} onClick={() => setProvider(item)}><div className="provider-top"><div className="provider-avatar">{item.name[0]}</div><div><strong>{item.name}</strong><span>✓ Verified provider</span></div><b>★ {item.rating}</b></div><p>{item.speciality}</p><small>🏆 {item.experience}　📍 {item.distance}</small><footer><strong>₹{item.price}</strong><button onClick={(event) => { event.stopPropagation(); setProvider(item); }}> {provider?.name === item.name ? "Selected ✓" : "Select"}</button></footer></article>)}</div><CustomerActions back={() => setStep(1)} next={() => setStep(3)} disabled={!provider} /></section>}
    {step === 3 && <section className="customer-section narrow"><CustomerTitle eyebrow="STEP 3" title="When should we come?" copy="Choose your preferred date and time." /><div className="customer-form"><label>Preferred date<input type="date" value={date} onChange={(event) => setDate(event.target.value)} /></label><label>Available time</label><div className="time-pills">{times.map((item) => <button className={time === item ? "selected" : ""} onClick={() => setTime(item)} key={item}>{item}</button>)}</div><CustomerActions back={() => setStep(2)} next={() => setStep(4)} disabled={!date || !time} /></div></section>}
    {step === 4 && <section className="customer-section narrow"><CustomerTitle eyebrow="STEP 4" title="Where should we come?" copy="Enter the address for your service." /><div className="customer-form"><label>Service address<textarea rows="4" value={address} onChange={(event) => setAddress(event.target.value)} placeholder="House no., street, area, city..." /></label><label>Additional instructions <em>Optional</em><textarea rows="3" value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Anything the professional should know?" /></label><CustomerActions back={() => setStep(3)} next={() => setStep(5)} disabled={!address.trim()} nextLabel="Review booking →" /></div></section>}
    {step === 5 && <section className="customer-section narrow"><CustomerTitle eyebrow="ALMOST DONE" title="Review your booking" copy="Everything look good? Confirm your booking." /><div className="booking-summary"><div className="summary-service"><span>{service.icon}</span><div><strong>{service.name}</strong><small>{service.description}</small></div></div><div className="summary-provider"><div className="provider-avatar">{provider.name[0]}</div><div><strong>{provider.name}</strong><small>★ {provider.rating} · {provider.experience}</small></div><b>₹{provider.price}</b></div><dl><div><dt>Date</dt><dd>{date}</dd></div><div><dt>Time</dt><dd>{time}</dd></div><div><dt>Address</dt><dd>{address}</dd></div></dl><div className="summary-total"><span>Estimated total</span><b>₹{provider.price}</b></div></div><CustomerActions back={() => setStep(4)} next={confirm} nextLabel="Confirm booking ✓" /></section>}
    {step === 6 && <section className="customer-success"><div>✓</div><span>BOOKING CONFIRMED</span><h1>You're all set!</h1><p>Your trusted professional has been successfully booked.</p><article><small>Booking ID</small><strong>{bookingId}</strong><hr /><p><b>{service.icon} {service.name}</b><br />{provider.name} · {date} · {time}</p></article><button onClick={onBack}>Back to admin console</button></section>}
  </div>;
}

function CustomerHome({ services, onSelect }) { return <><section className="customer-hero"><div className="customer-hero-copy"><span className="customer-badge">🤝 Community Powered Services</span><h1>Trusted services,<br /><em>right in your<br />community.</em></h1><p>Book verified local professionals for your everyday household and community needs.</p><div className="customer-search"><span>⌕</span><input placeholder="What service do you need?" /><button onClick={() => onSelect(services[0])}>Search</button></div></div><div className="customer-hero-art"><img src="/saathi-hero.png" alt="SAATHI local services" /></div></section><section className="customer-services"><CustomerTitle eyebrow="OUR SERVICES" title="Popular Services" copy="Find trusted professionals for your everyday needs." /><div className="customer-home-grid">{services.map((item) => <article key={item.id} onClick={() => onSelect(item)}><div className="home-service-icon">{item.icon}</div><h3>{item.name}</h3><p>{item.description}</p><footer><strong>From ₹{item.price}</strong><button onClick={() => onSelect(item)}>Book →</button></footer></article>)}</div></section><section className="customer-how"><CustomerTitle eyebrow="HOW IT WORKS" title="Getting help is simple" copy="" /><div><article><b>01</b><h3>Choose a Service</h3><p>Select the service you need from our local service categories.</p></article><article><b>02</b><h3>Find a Trusted Provider</h3><p>Explore verified providers from the cooperative community.</p></article><article><b>03</b><h3>Get the Service</h3><p>Connect with the provider and get your service completed.</p></article></div></section><footer className="customer-footer"><div><strong>SAATHI</strong><h3>Trusted services. Stronger communities.</h3><p>SAATHI connects customers with trusted local service providers and strengthens cooperative communities.</p></div><div><b>Platform</b><span>Home</span><span>Services</span><span>How It Works</span></div><div><b>For Providers</b><span>Join SAATHI</span><span>Become a Provider</span><span>Community</span></div><div><b>Support</b><span>Help Center</span><span>Contact Us</span><span>FAQs</span></div></footer></>; }
function CustomerTitle({ eyebrow, title, copy }) { return <div className="customer-title"><span>{eyebrow}</span><h1>{title}</h1><p>{copy}</p></div>; }
function CustomerActions({ back, next, disabled, nextLabel = "Continue →" }) { return <div className="customer-actions"><button onClick={back}>← Back</button><button disabled={disabled} onClick={next}>{nextLabel}</button></div>; }

export default App;

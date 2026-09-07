import { useState } from "react";

const providers = [
  { name: "Faizan Ali", initials: "FA", match: 96, speciality: "AC installation", skills: "AC repair · Cooling systems", distance: "1.2 km", rating: "4.9", jobs: 132, availability: "Available at 03:00 PM", tone: "green", reason: "Exact AC installation match and available at the selected time." },
  { name: "Arjun Singh", initials: "AS", match: 84, speciality: "Electrical wiring", skills: "Home wiring · Safety checks", distance: "1.3 km", rating: "4.8", jobs: 137, availability: "Available at 03:00 PM", tone: "blue", reason: "Strong electrical skill match; can be paired with an AC specialist." },
  { name: "Sameer Khan", initials: "SK", match: 77, speciality: "AC installation", skills: "AC installation · Maintenance", distance: "2.6 km", rating: "4.9", jobs: 156, availability: "Available at 05:00 PM", tone: "lilac", reason: "Highly experienced specialist, but the preferred slot is not available." },
];

const trainingNeeds = [
  ["AC installation", "18 open requests", "6 verified workers", "High priority", "coral"],
  ["Electrical safety", "12 open requests", "9 verified workers", "Medium priority", "yellow"],
  ["Appliance diagnostics", "9 open requests", "14 verified workers", "Watch list", "lilac"],
];

export default function SmartMatching({ onNotify }) {
  const [selected, setSelected] = useState("");
  const [service, setService] = useState("AC installation + electrical wiring");

  return <section className="matching-workspace">
    <div className="matching-toolbar"><div><span className="eyebrow">MEMBER 5 · SMART MATCHING</span><h2>Find the right provider</h2><p>Ranked recommendations based on skills, distance, availability, and community trust.</p></div><button className="outline-button" onClick={() => onNotify("Matching report exported")}>⇩ <span>Export report</span></button></div>
    <div className="matching-layout">
      <div className="matching-main">
        <section className="match-request panel"><div className="panel-head"><div><h2>Request to match</h2><span>Customer request #REQ-2088</span></div><span className="live-pill"><i /> Matching live</span></div><div className="request-fields"><label>Service need<select value={service} onChange={(event) => setService(event.target.value)}><option>AC installation + electrical wiring</option><option>Home appliance repair</option><option>Electrical safety check</option></select></label><div><span>Preferred slot</span><strong>08 Sep 2026 · 03:00 PM</strong></div><div><span>Location</span><strong>Bhopal · within 5 km</strong></div></div></section>
        <section className="match-results"><div className="section-row"><div><h2>Recommended providers</h2><span>3 providers ranked for this request</span></div><button className="filter-button">Best match　⌄</button></div><div className="provider-match-list">{providers.map((provider) => <article className={selected === provider.name ? "provider-match selected" : "provider-match"} key={provider.name}><div className="match-score"><strong>{provider.match}%</strong><span>match</span></div><div className={`avatar ${provider.tone}`}>{provider.initials}</div><div className="match-person"><div><strong>{provider.name}</strong><span>{provider.speciality} · ★ {provider.rating} · {provider.jobs} jobs</span></div><small>{provider.reason}</small><div className="skill-tags">{provider.skills.split(" · ").map((skill) => <em key={skill}>{skill}</em>)}</div></div><div className="match-meta"><span>⌖ {provider.distance}</span><span className={provider.availability.includes("03:00") ? "available" : "later"}>● {provider.availability}</span><button className={selected === provider.name ? "selected-match" : ""} onClick={() => { setSelected(provider.name); onNotify(`${provider.name} added to shortlist`); }}>{selected === provider.name ? "Shortlisted ✓" : "Shortlist"}</button></div></article>)}</div></section>
      </div>
      <aside className="matching-side"><section className="skill-gap-card"><div className="gap-icon">⌁</div><span className="eyebrow">SKILL GAP DETECTED</span><h2>No single provider covers every skill</h2><p>This request needs both AC installation and electrical wiring.</p><div className="gap-skills"><span>AC installation <b>6 workers</b></span><span>Electrical wiring <b>9 workers</b></span></div><div className="team-suggestion"><strong>Suggested team assignment</strong><span>Pair Faizan Ali with Arjun Singh to complete the request.</span><button onClick={() => onNotify("Team assignment created")}>Create team assignment →</button></div></section><section className="training-card panel"><div className="panel-head"><div><h2>Training priorities</h2><span>Based on open community demand</span></div><button className="text-button" onClick={() => onNotify("Training report opened")}>View all →</button></div><div className="training-list">{trainingNeeds.map(([name, demand, workers, priority, tone]) => <div className="training-row" key={name}><div className={`training-dot ${tone}`} /><div><strong>{name}</strong><span>{demand} · {workers}</span></div><em className={tone}>{priority}</em></div>)}</div></section></aside>
    </div>
  </section>;
}

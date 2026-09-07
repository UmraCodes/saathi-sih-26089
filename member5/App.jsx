import { useState } from "react";
import SmartMatching from "./SmartMatching.jsx";
import "./styles.css";

export default function App() {
  const [toast, setToast] = useState("");

  const notify = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2400);
  };

  return <main className="member5-app">
    <header className="member5-header">
      <div className="member5-brand"><span>⚡</span><div><strong>SAATHI</strong><small>MEMBER 5 WORKSPACE</small></div></div>
      <div className="member5-context"><span>Smart matching + skill gap</span><b>Admin view</b></div>
    </header>
    <SmartMatching onNotify={notify} />
    {toast && <div className="member5-toast">✓ {toast}</div>}
  </main>;
}

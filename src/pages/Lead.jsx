import React from "react";
import { Link } from "react-router-dom";
import "./Lead.css";
import { useCRM } from "../context/CRMContext";

export const Lead = () => {
  const { leads, agents, loading, leadsError } = useCRM();

  if (loading)
    return <div className="lead-state">Loading...</div>;

  if (leadsError)
    return <div className="lead-state">Error: {leadsError}</div>;

  return (
    <div className="lead-container">
      
      <header className="lead-header">
        All Leads
      </header>

      <aside className="lead-sidebar">
        <Link to="/" className="lead-sidebar-link">
          ← Back to Dashboard
        </Link>
      </aside>

      <main className="lead-main">
        <section className="lead-box lead-overview">
          <h3>Lead Overview</h3>
          <p>Total Leads: {leads.length}</p>
        </section>

        <section className="lead-box lead-list">
          {leads.length > 0 ? (
            <ul className="lead-ul">
              {leads.map((lead) => (
                <li key={lead._id} className="lead-item">
                  <span className="lead-name"><Link to={`/leads/${lead.name}`}>{lead.name}</Link></span>
                  <span className="lead-meta">
                    {lead.status} • {lead.salesAgentId?.name || "Unassigned"}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="lead-empty">No leads available.</p>
          )}
        </section>
      </main>
    </div>
  );
};

import React from "react";
import { useParams, Link } from "react-router-dom";
import { useCRM } from "../context/CRMContext";
import "./LeadByStatus.css";

const FilteredLeads = () => {
  const { status } = useParams();
  const { leads, loading } = useCRM();

  if (loading) {
    return <p className="lead-state">Loading...</p>;
  }

  const normalizedStatus = status.toLowerCase();

  const filteredLeads = leads.filter(
    (lead) => lead.status.toLowerCase() === normalizedStatus
  );

  return (
    <div className="lead-page">
      <div className="lead-container">

        <header className="lead-header">
          {status} Leads
        </header>

        <aside className="lead-sidebar">
          <Link to="/" className="lead-sidebar-link"> ← Back to Dashboard</Link>
          <Link to="/leads" className="lead-sidebar-link">All Leads</Link>
        </aside>

        <main className="lead-main">
          <div className="lead-box">

            {filteredLeads.length > 0 ? (
              <ul className="lead-ul">
                {filteredLeads.map((lead) => (
                  <li key={lead._id} className="lead-item">
                    <Link
                      to={`/leads/${lead.name}`}
                      className="lead-name"
                    >
                      {lead.name}
                    </Link>
                    <span className="lead-status">{lead.status}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="lead-empty">
                No leads found with status "{status}"
              </p>
            )}
          </div>
        </main>

      </div>
    </div>
  );
};

export default FilteredLeads;

import React from "react";
import { Link } from "react-router-dom";
import { useCRM } from "../context/CRMContext";
import "./Agent.css";

export const Agent = () => {
  const { agents, loading, agentsError } = useCRM();

  if (loading) return <div className="agent-state">Loading...</div>;
  if (agentsError) return <div className="agent-state">Error: {agentsError}</div>;

  return (
    <div className="agent-page">
      <div className="agent-container">

        <header className="agent-header">
          All Agents
        </header>

        <aside className="agent-sidebar">
          <Link to="/" className="agent-sidebar-link">
            ← Back to Dashboard
          </Link>

          <Link to="/addAgent" className="agent-sidebar-link">
            + Add Agent
          </Link>
        </aside>

        <main className="agent-main">
          <section className="agent-box agent-overview">
            <h3>Agents Overview</h3>
            <p>Total Agents: {agents.length}</p>
          </section>

          <section className="agent-box agent-list">
            <h3>Agents</h3>

            {agents.length > 0 ? (
              <ul className="agent-ul">
                {agents.map((agent) => (
                  <li key={agent._id} className="agent-item">
                    <span className="agent-name">{agent.name}</span>
                    <span className="agent-email">{agent.email}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="agent-empty">No agents found.</p>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

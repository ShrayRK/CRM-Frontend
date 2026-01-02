import React, { useMemo } from "react";
import { useCRM } from "../context/CRMContext";
import { Link } from "react-router-dom";
import "./LeadSettings.css";

const LeadStatusView = () => {
  const { leads, agents, filters, setFilters, loading } = useCRM();

  const statuses = useMemo(() => {
  const allStatuses = leads.map(lead => lead.status);
  return [...new Set(allStatuses)];
}, [leads]);

  const getAgentName = (agentId) => {
    const agent = agents.find(a => a._id === agentId?._id);
    return agent ? agent.name : "Unassigned";
  };

  const filteredLeads = useMemo(() => {
    let result = [...leads];
    if (filters.salesAgentId) {
      result = result.filter(
        lead => lead.salesAgentId?._id === filters.salesAgentId
      );
    }
    return result;
  }, [leads, filters]);

  const leadsByStatus = useMemo(() => {
    return statuses.reduce((acc, status) => {
      acc[status] = filteredLeads.filter(l => l.status === status);
      return acc;
    }, {});
  }, [statuses, filteredLeads]);

  if (loading) return <p className="loading">Loading leads...</p>;

  return (
    <div className="lead-settings-page">
      <div className="lead-settings-container">
        
        <header className="lead-settings-header">
          Lead Status Overview
        </header>

        <aside className="lead-settings-sidebar">
          <Link to="/" className="sidebar-link">
            ← Back to Dashboard
          </Link>

          <div className="filter-box">
            <h4>Filter by Agent</h4>
            <select
              value={filters.salesAgentId}
              onChange={(e) =>
                setFilters({ ...filters, salesAgentId: e.target.value })
              }
            >
              <option value="">All Agents</option>
              {agents.map(agent => (
                <option key={agent._id} value={agent._id}>
                  {agent.name}
                </option>
              ))}
            </select>
          </div>
        </aside>

        <main className="lead-settings-main">
          <div className="status-grid">
            {statuses.map(status => (
              <section key={status} className="status-card">
                <h3>{status}</h3>
                {leadsByStatus[status].length === 0 ? (
                  <p className="empty">No leads</p>
                ) : (
                  leadsByStatus[status].map(lead => (
                    <div key={lead._id} className="lead-item">
                      <div className="lead-name">{lead.name}</div>
                      <div className="lead-agent">
                        Agent: {getAgentName(lead.salesAgentId)}
                      </div>
                    </div>
                  ))
                )}
              </section>
            ))}
          </div>
        </main>

      </div>
    </div>
  );
};

export default LeadStatusView;

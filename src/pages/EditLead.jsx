import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useCRM } from "../context/CRMContext";
import "./EditLead.css";

const EditLead = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const { leads, agents, updateLead } = useCRM();

  const lead = leads.find((l) => l.name === name);

  const [formData, setFormData] = useState({
    name: lead?.name || "",
    status: lead?.status || "",
    source: lead?.source || "",
    salesAgentId: lead?.salesAgentId?._id || "",
    timeToClose: lead?.timeToClose || "",
    priority: lead?.priority || "",
  });

  useEffect(() => {
    if(lead) {
      setFormData({
      name: lead.name || "",
      status: lead.status || "",
      source: lead.source || "",
      salesAgentId: lead.salesAgentId?._id || "",
      timeToClose: lead.timeToClose || "",
      priority: lead.priority || "",
    });
    }
  }, [lead]);

  if (!lead) {
    return <p className="lead-state">Lead not found</p>;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateLead(lead._id, formData);
    navigate(`/leads/${lead.name}`);
  };

  return (
    <div className="edit-lead-page">
      <div className="edit-lead-container">

        <header className="edit-lead-header">
          Edit Lead
        </header>

        <aside className="edit-lead-sidebar">
          <Link to="/" className="edit-sidebar-link">Dashboard</Link>
          <Link to={`/leads/${lead.name}`} className="edit-sidebar-link">
            Back to Lead
          </Link>
        </aside>

        <main className="edit-lead-main">
          <form className="edit-lead-box" onSubmit={handleSubmit}>
            <h3>Lead Details</h3>

            <label>
              Name
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </label>

            <label>
              Status
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Priority">Priority</option>
                <option value="Closed">Closed</option>
              </select>
            </label>

            <label>
              Source
              <select
                name="source"
                value={formData.source}
                onChange={handleChange}
              >
                <option value="Website">Website</option>
                <option value="Referral">Referral</option>
                <option value="Cold Call">Cold Call</option>
                <option value="Advertisement">Advertisement</option>
                <option value="Email">Email</option>
                <option value="Other">Other</option>
              </select>
            </label>

            <label>
              Sales Agent
              <select
                name="salesAgentId"
                value={formData.salesAgentId}
                onChange={handleChange}
              >
                <option value="">Unassigned</option>
                {agents.map((agent) => (
                  <option key={agent._id} value={agent._id}>
                    {agent.name}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Priority
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </label>

            <label>
              Time to close
              <input
                type="number"
                name="timeToClose"
                value={formData.timeToClose}
                onChange={handleChange}
              />
            </label>

            <button type="submit" className="edit-action-btn">
              Update Lead
            </button>
          </form>
        </main>

      </div>
    </div>
  );
};

export default EditLead;

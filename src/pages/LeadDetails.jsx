import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useCRM } from "../context/CRMContext";
import "./LeadDetails.css";

export const LeadDetails = () => {
  const { name } = useParams();
  const {
    leads,
    agents,
    getCommentsByLead,
    addComment,
    deleteComment,
    deleteLead,
  } = useCRM();

  const lead = leads.find((l) => l.name === name);

  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  const authorId = agents[0]?._id;

  useEffect(() => {
    if (lead?._id) loadComments();
  }, [lead?._id]);

  const loadComments = async () => {
    const data = await getCommentsByLead(lead._id);
    setComments(data);
  };

  const handleComment = async () => {
    if (!commentText.trim() || !authorId) return;

    await addComment(lead._id, {
      author: authorId,
      commentText,
    });

    setCommentText("");
    loadComments();
  };

  const handleDelete = async (commentId) => {
    if (!lead?._id) return;

    await deleteComment(commentId);
    const updatedComments = await getCommentsByLead(lead._id);
    setComments(updatedComments);
  };

  const navigate = useNavigate();

  const handleDeleteLead = async () => {
    if (!lead?._id) return;

    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${lead.name}" ?`
    );

    if (!confirmDelete) return;

    try {
      await deleteLead(lead._id);
      navigate("/")
    } catch (error) {
      console.error("Failed to delete lead", error);
    }
  };

  if (!lead) return <h2 className="state-text">Lead not found</h2>;

  return (
    <div className="lead-details-page">
      <div className="lead-details-container">

        <header className="lead-details-header">LEAD DETAILS</header>

        <aside className="lead-details-sidebar">
          <Link to="/" className="sidebar-link">
            ← Back to Dashboard
          </Link>
          <br />
          <Link to="/leads" className="sidebar-link">
            ← Back to all Leads
          </Link>
        </aside>

        <main className="lead-details-main">
          <section className="details-box">
            <h3>Lead Information</h3>
            <div><strong>Name:</strong> {lead.name}</div>
            <div>
              <strong>Sales Agent:</strong>{" "}
              {lead.salesAgentId?.name || "Not assigned"}
            </div>
            <div><strong>Status:</strong> {lead.status}</div>
            <div><strong>Source:</strong> {lead.source}</div>
            <div><strong>Priority:</strong> {lead.priority}</div>
            <div><strong>Time to close:</strong> {lead.timeToClose} days</div>
            <div><strong>Tags:</strong> {lead.tags.join(", ")}</div>
            <Link
              to={`/leads/${lead.name}/edit`}
              className="action-btn"
              style={{ marginTop: "16px", display: "inline-block" }}
            >
              Edit Lead
            </Link>

          </section>

          <section className="comments-box">
            <h3>Comments</h3>

            {comments.length > 0 ? (
              comments.map((c) => (
                <div className="comment-box" key={c._id}>
                  <div className="comment-author">
                    {c.author?.name || "Unknown"} •{" "}
                    {new Date(c.createdAt).toLocaleString()}
                  </div>
                  <div className="comment-text">{c.commentText}</div>

                  <button
                    className="action-btn delete-btn"
                    onClick={() => handleDelete(c._id)}
                  >
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <p className="empty-text">No comments yet</p>
            )}

            <textarea
              className="comment-input"
              placeholder="Add a new comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />

            <button className="action-btn" onClick={handleComment}>
              Submit Comment
            </button>
          </section>
          <section>
            <button className="action-btn delete-lead"
              onClick={handleDeleteLead}
            >Delete Lead</button>
          </section>
        </main>
      </div>
    </div>
  );
};

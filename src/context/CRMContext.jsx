import React, { createContext, useState, useContext } from 'react';
import useFetch from '../useFetch';

const CRMContext = createContext();

export const useCRM = () => useContext(CRMContext);

export const CRMProvider = ({ children }) => {
  const [actionLoading, setActionLoading] = useState(false);
  const [filters, setFilters] = useState({
    salesAgentId: '',
    status: '',
    source: '',
    tags: [],
  });

  const {
    data: leads,
    loading: leadsLoading,
    error: leadsError,
    refetch: refetchLeads,      
  } = useFetch('https://crm-backend-blush-ten.vercel.app/leads',[]);

  const {
    data: agents,
    loading: agentsLoading,
    error: agentsError,      
  } = useFetch('https://crm-backend-blush-ten.vercel.app/agents',[]);

  const getCommentsByLead = async (leadId) => {
    try {
      const res = await fetch (
        `https://crm-backend-blush-ten.vercel.app/leads/${leadId}/comments`
      );
      return await res.json();
    } catch (error) {
      console.error("Error fetching comments, error");
      return [];
    }
  };

  const addComment = async (leadId, commentData) => {
    try {
      setActionLoading(true);
      await fetch(
        `https://crm-backend-blush-ten.vercel.app/leads/${leadId}/comments`,
        {
          method: "POST",
          headers: {"Content-Type" : "application/json"},
          body: JSON.stringify(commentData),
        }
      );
    } catch (error) {
      console.error("Error adding comment", error);
      throw error;
    } finally {
      setActionLoading(false);
    }
  };

const deleteComment = async (commentId) => {
  try {
    setActionLoading(true);
    await fetch(
      `https://crm-backend-blush-ten.vercel.app/comments/${commentId}`,
      {
        method: "DELETE",
      }
    );
  } catch (error) {
    console.error("Error deleting comment", error);
    throw error;
  } finally {
    setActionLoading(false);
  }
};


  const createLead = async (leadData) => {
    try {
         await fetch('https://crm-backend-blush-ten.vercel.app/leads', {
           method: 'POST',
           headers: {
              'Content-Type': 'application/json',
           },
           body: JSON.stringify(leadData),
     });
     alert("Lead created successfully!");
    } catch (error) {
     console.log('Error creating lead:',error);
     throw error;
    } finally {
     setActionLoading(false);
    }
  };

  const updateLead = async (id, leadData) => {
    try {
     setActionLoading(true);
     await fetch(`https://crm-backend-blush-ten.vercel.app/leads/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(leadData),
     });
     alert("Lead updated successfully!");
     refetchLeads();
    } catch (error) {
      console.error('Error updating lead:', error);
      throw error;
    } finally {
     setActionLoading(false);
    }   
  };

  const deleteLead = async (id) => {
    try {
      setActionLoading(true);
      await fetch(`https://crm-backend-blush-ten.vercel.app/leads/${id}`, {
        method: 'DELETE',
      });
      alert("Lead deleted successfully!");
      refetchLeads();
    } catch (error) {
      console.error('Error deleting lead:', error);
      throw error;
    } finally {
      setActionLoading(false);
    }
  };

  const createAgent = async (agentData) => {
    try {
      await fetch('https://crm-backend-blush-ten.vercel.app/agents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(agentData),
      });
      alert("Agent created successfully!");
    } catch (error) {
      console.error('Error creating agent:', error);
      throw error;
    }finally {
      setActionLoading(false);
    }
  };   

  const value = {
    leads: Array.isArray(leads) ? leads : [],
    agents: Array.isArray(agents) ? agents : [], 
    loading: leadsLoading || agentsLoading || actionLoading,
    filters,
    setFilters,
    createLead,
    updateLead,
    deleteLead,
    createAgent,
    getCommentsByLead,
    addComment,
    deleteComment,
    leadsError,
    agentsError
  };

  return <CRMContext.Provider value={value}>{children}</CRMContext.Provider>;
};

export default CRMProvider;
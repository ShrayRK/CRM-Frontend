import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const LeadsByAgentBar = ({ leads = [], agents = [] }) => {
  const data = agents.map((agent) => {
    const count = leads.filter((lead) => {
      const leadAgentId =
        typeof lead.salesAgentId === "object"
          ? lead.salesAgentId?._id
          : lead.salesAgentId;

      return leadAgentId === agent._id && lead.status === "Closed";
    }).length;

    return {
      agent: agent.name,
      closedLeads: count,
    };
  });

  return (
    <div style={{ width: "100%", height: 260 }}>
      <div
        style={{
          marginBottom: "12px",
          fontSize: "14px",
          letterSpacing: "1px",
          textTransform: "uppercase",
          fontWeight: "600",
        }}
      >
        Closed Leads
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 20, left: 0, bottom: 30 }}
          barCategoryGap={30}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.3)"
          />

          <XAxis
            dataKey="agent"
            tick={{ fill: "#fff", fontSize: 12 }}
            axisLine={{ stroke: "#fff" }}
            tickLine={false}
          />

          <YAxis
            allowDecimals={false}
            tick={{ fill: "#fff", fontSize: 12 }}
            axisLine={{ stroke: "#fff" }}
            tickLine={false}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#000",
              border: "1px dashed white",
              color: "#fff",
            }}
            cursor={{ fill: "rgba(255,255,255,0.08)" }}
          />

          <Bar
            dataKey="closedLeads"
            barSize={36}
            radius={[6, 6, 0, 0]}
            fill="#e5e5e5"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LeadsByAgentBar;

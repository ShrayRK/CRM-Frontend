import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ['#00C49F', '#FF8042'];

const LeadsPipelinePie = ({ leads }) => {
    const closed = leads.filter(l => l.status === "Closed").length;
    const pipeline = leads.length - closed;

    const data = [
        {name: "Closed", value:closed },
        {name: "In Pipeline", value: pipeline },
    ];

    return (
        <PieChart width={300} height={250}>
            <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            dataKey="value"
            label
            >
                {data.map((_, index)=> (
                    <Cell key={index} fill={COLORS[index]} />
                ))}
            </Pie>
            <Tooltip />
            <Legend />
        </PieChart>
    )
}

export default LeadsPipelinePie;
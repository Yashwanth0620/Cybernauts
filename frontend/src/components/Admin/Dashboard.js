import React, { useEffect, useState } from "react";
import GaugeChart from "react-gauge-chart";
import "../styles/Dashboard.css";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell,
  LineChart, Line,
  ResponsiveContainer, Legend
} from "recharts";

function Dashboard() {
  const [data, setData] = useState(null);

  // 🎨 Color palette
  const COLORS = ["#4f46e5", "#22c55e", "#f59e0b", "#ef4444", "#06b6d4"];

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URI}/events/dashboard`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  if (!data) {
    return <h3>Loading Dashboard...</h3>;
  }

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">Cybernauts Dashboard</h2>

      {/* 📌 Cards */}
      <div className="cards">
        <div className="card">
          <h4>Total Events</h4>
          <p className="card-number">{data.totalEvents}</p>
        </div>

        <div className="card">
          <h4>Total Members</h4>
          <p className="card-number">{data.totalParticipants}</p>
        </div>
      </div>

      {/* 📊 Charts */}
      <div className="charts">

        {/* 📈 Bar Chart */}
        <div className="chart-box">
  <h4>Events by Type</h4>
  <ResponsiveContainer width="100%" height={250}>
    <PieChart>
      <Pie
        data={data.eventTypes}
        dataKey="events"
        nameKey="name"
        outerRadius={80}
      >
        {data.eventTypes.map((entry, index) => (
          <Cell key={index} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  </ResponsiveContainer>
</div>

        {/* ⚡ Gauge */}
         <div className="chart-box">
          <h4>Participation Rate</h4>
          <GaugeChart
            id="gauge-chart"
            nrOfLevels={5}
            colors={["#ef4444", "#f59e0b", "#22c55e"]}
            percent={Math.min(data.participationRate || 0, 1)}
          />
          <p className="gauge-text">
            {(data.participationRate * 100).toFixed(1)}%
          </p>
        </div>

    
   

        {/* 🥧 Pie */}
       <div className="chart-box">
  <h4>Members Distribution</h4>
  <ResponsiveContainer width="100%" height={250}>
    <BarChart data={data.memberData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value">
        {data.memberData.map((entry, index) => (
          <Cell key={index} fill={COLORS[index % COLORS.length]} />
        ))}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
</div>

        {/* 📉 Line */}
        <div className="chart-box">
          <h4>Events Over Time</h4>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data.eventsOverTime}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="events"
                stroke="#ef4444"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
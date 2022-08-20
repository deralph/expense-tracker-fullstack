import React from "react";
import DashboardBody from "./dashboardbody/DashboardBody";
import Sidebar from "./Sidebar/Sidebar";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <section className="dashboard">
      <Sidebar />
      <DashboardBody />
    </section>
  );
};

export default Dashboard;

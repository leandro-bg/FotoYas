import React from "react";
import { Routes, Route } from "react-router-dom";

const Dashboard = () => {
  return (
    <Routes>
      <Route path="/" element={<h2>Dashboard</h2>} />
    </Routes>
  );
};

export default Dashboard;

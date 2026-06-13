import MainLayout from "../../layouts/MainLayout";
import StatCard from "../../components/StatCard/StatCard";
import { FaUsers, FaShoppingCart, FaBullhorn } from "react-icons/fa";
import { MdMarkEmailRead } from "react-icons/md";
import { IoMdOpen } from "react-icons/io";
import { BsCursorFill } from "react-icons/bs";

import { useState, useEffect } from "react";






function Dashboard() {



const [campaigns, setCampaigns] = useState([]); 

useEffect(() => {
  fetch("http://127.0.0.1:8000/api/campaigns/")
    .then((response) => response.json())
    .then((data) => {
      setCampaigns(data);
    })
    .catch((error) => {
      console.error(error);
    });
}, []);
  

const [analytics, setAnalytics] = useState({
  total_customers: 0,
  total_campaigns: 0,
  running_campaigns: 0,
  delivered_campaigns: 0,
  draft_campaigns: 0,
  total_revenue: 0,
});

useEffect(() => {
  fetch("http://127.0.0.1:8000/api/analytics/")
    .then((response) => response.json())
    .then((data) => {
      setAnalytics(data);
    })
    .catch((error) => {
      console.error(error);
    });
}, []);




  
  return (
    <MainLayout>
      <div className="hero-card">
  <h2>Welcome back, Ashwitha 👋</h2>

  <p>
    Monitor campaigns, track engagement,
    and generate AI-powered customer insights.
  </p>
</div>


<div className="stats-grid">

  <div className="stat-card">
  <h2>{analytics?.total_customers || 0}</h2>
  <p>Total Customers</p>
</div>

<div className="stat-card">
  <h2>{analytics?.total_campaigns || 0}</h2>
  <p>Total Campaigns</p>
</div>

<div className="stat-card">
  <h2>{analytics?.running_campaigns || 0}</h2>
  <p>Running Campaigns</p>
</div>

<div className="stat-card">
  <h2>₹{analytics?.total_revenue || 0}</h2>
  <p>Total Revenue</p>
</div>

</div>


        
      
      <h1 className="page-title mb-4">
        ReachX Dashboard
      </h1>

      <div className="row g-4">

        <div className="col-md-4">
          <StatCard
  title="Customers"
  value={analytics.total_customers}
/>
        </div>

        <div className="col-md-4">
          <StatCard title="Orders" value={analytics.total_orders} icon={<FaShoppingCart  color="#2563EB"/>} />
        </div>

        <div className="col-md-4">
          <StatCard title="Campaigns" value={analytics.total_campaigns} icon={<FaBullhorn  color="#2563EB"/>} />
        </div>

        <div className="col-md-4">
          <StatCard title="Delivery Rate" value={analytics.delivery_rate} icon={<MdMarkEmailRead  color="#2563EB"/>} />
        </div>

        <div className="col-md-4">
          <StatCard title="Open Rate" value={analytics.open_rate} icon={<IoMdOpen  color="#2563EB"/>} />
        </div>

        <div className="col-md-4">
          <StatCard title="Click Rate" value={analytics.click_rate} icon={<BsCursorFill  color="#2563EB"/>} />
        </div>

      </div>

<div className="row mt-5">

  <div className="col-lg-8">

    <div className="card card-shadow p-4">

      <h4>Recent Campaigns</h4>

      <table className="table mt-3">

        <thead>
          <tr>
            <th>Name</th>
            <th>Audience</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          
         {campaigns.slice(0, 5).map((campaign) => (
  <tr key={campaign.id}>
    <td>{campaign.name}</td>
    <td>{campaign.audience}</td>
    <td>{campaign.status}</td>
    {campaigns.length === 0 && (
  <tr>
    <td colSpan="3" className="text-center">
      No campaigns available
    </td>
  </tr>
)}
  </tr>

  
))}

        </tbody>

      </table>

    </div>

  </div>

  <div className="col-lg-4">

    <div className="card card-shadow p-4">

      <h4>AI Insights</h4>
      <div className="alert alert-primary">
  Customers:
{analytics.total_customers}
</div>

<div className="alert alert-success">
 Active campaigns:
{analytics.running_campaigns}
</div>

<div className="alert alert-warning">
  Weekend campaigns convert 32% better
</div>

     

    </div>

  </div>

</div>
    </MainLayout>
  );
}

export default Dashboard;

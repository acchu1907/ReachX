import MainLayout from "../../layouts/MainLayout";
import StatCard from "../../components/StatCard/StatCard";
import { FaUsers, FaShoppingCart, FaBullhorn } from "react-icons/fa";
import { MdMarkEmailRead } from "react-icons/md";
import { IoMdOpen } from "react-icons/io";
import { BsCursorFill } from "react-icons/bs";


import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts";








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
   total_orders:0,
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



const campaignChart = [

{
 name:"Running",
 value:analytics.running_campaigns
},

{
 name:"Delivered",
 value:analytics.delivered_campaigns
},

{
 name:"Draft",
 value:analytics.draft_campaigns
}

];


const revenueChart = [

{
 name:"Revenue",
 value:analytics.total_revenue
}

];



  
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

      <div className="row mt-5">


<div className="col-lg-8">

<div className="card card-shadow p-4">

<h4>
Campaign Performance
</h4>


<ResponsiveContainer
width="100%"
height={300}
>

<BarChart data={campaignChart}>

<XAxis dataKey="name"/>

<YAxis/>

<Tooltip/>

<Bar
dataKey="value"
fill="#2563EB"
/>


</BarChart>


</ResponsiveContainer>


</div>

</div>



<div className="col-lg-4">


<div className="card card-shadow p-4">


<h4>
Revenue Overview
</h4>


<ResponsiveContainer
width="100%"
height={300}
>


<LineChart data={revenueChart}>


<XAxis dataKey="name"/>

<YAxis/>

<Tooltip/>


<Line

type="monotone"

dataKey="value"

stroke="#2563EB"

strokeWidth={3}

/>


</LineChart>


</ResponsiveContainer>


</div>


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
    <td>{campaign.audience_count} customers</td>
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

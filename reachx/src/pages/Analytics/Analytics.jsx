import MainLayout from "../../layouts/MainLayout";
import { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";



function Analytics() {

  const [analytics, setAnalytics] = useState({
  total_customers: 0,
  total_campaigns: 0,
  running_campaigns: 0,
  delivered_campaigns: 0,
  draft_campaigns: 0,
  total_revenue: 0,
  total_orders: 0,
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

  const chartData = [
    {
      name: "Running",
      value: analytics.running_campaigns,
    },
    {
      name: "Delivered",
      value: analytics.delivered_campaigns,
    },
    {
      name: "Draft",
      value: analytics.draft_campaigns,
    },
  ];




const businessData = [
  {
    name: "Customers",
    value: analytics.total_customers,
  },
  {
    name: "Campaigns",
    value: analytics.total_campaigns,
  },
  {
    name: "Revenue",
    value: analytics.total_revenue,
  },
];


  return (
    <MainLayout>

      <h1 className="page-title mb-4">
        Analytics Dashboard
      </h1>

      <div className="analytics-grid">


  <div className="analytics-card">

    <h2>
      {analytics.total_customers}
    </h2>

    <p>
      Total Customers
    </p>

  </div>



  <div className="analytics-card">

    <h2>
      {analytics.total_campaigns}
    </h2>

    <p>
      Total Campaigns
    </p>

  </div>



  <div className="analytics-card running">

    <h2>
      {analytics.running_campaigns}
    </h2>

    <p>
      Running Campaigns
    </p>

  </div>



  <div className="analytics-card delivered">

    <h2>
      {analytics.delivered_campaigns}
    </h2>

    <p>
      Delivered Campaigns
    </p>

  </div>



  <div className="analytics-card revenue">

    <h2>
      ₹{analytics.total_revenue}
    </h2>

    <p>
      Total Revenue
    </p>

  </div>


</div>

      <div className="row mt-4">

        <div className="col-lg-6">

          <div className="card card-shadow p-4">

            <h4>Campaign Status</h4>

            <ResponsiveContainer
              width="100%"
              height={300}
            >
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#4F46E5" />
              </BarChart>
            </ResponsiveContainer>

          </div>

        </div>

        <div className="col-lg-6">

          <div className="card card-shadow p-4">

           <h4>Business Overview</h4>

            <ResponsiveContainer
              width="100%"
              height={300}
            >
              <LineChart data={businessData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#4F46E5"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
            

</div>

          </div>

          

        </div>

        <div className="card card-shadow p-4 mt-4">

  <h4>🤖 AI Insights</h4>

  <div className="alert alert-success mt-3">
    ✅ Delivered Campaigns:
    {analytics.delivered_campaigns}
  </div>

  <div className="alert alert-warning">
    🚀 Running Campaigns:
    {analytics.running_campaigns}
  </div>

  <div className="alert alert-secondary">
    📝 Draft Campaigns:
    {analytics.draft_campaigns}
  </div>

  <div className="alert alert-info">
    💰 Revenue Generated:
    ₹{analytics.total_revenue}
  </div>

  <div className="alert alert-primary">

    🤖 AI Recommendation:

    {analytics.running_campaigns === 0
      ? " No active campaigns. Consider launching a new campaign."
      : analytics.running_campaigns >
        analytics.delivered_campaigns
      ? " High number of active campaigns. Monitor performance closely."
      : " Delivered campaigns are performing well. Focus on customer retention."}

  </div>

</div>

 
    </MainLayout>
  );
}

export default Analytics;
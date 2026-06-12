import MainLayout from "../../layouts/MainLayout";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function Analytics() {
  const data = [
    { month: "Jan", campaigns: 20 },
    { month: "Feb", campaigns: 35 },
    { month: "Mar", campaigns: 28 },
    { month: "Apr", campaigns: 45 },
    { month: "May", campaigns: 60 },
  ];

  return (
    <MainLayout>

      <div className="hero-card">
        <h2>📈 Analytics Dashboard</h2>
        <p>
          Track campaign performance, customer engagement,
          and AI-driven growth insights.
        </p>
      </div>

      

      <div className="row g-4 mb-4">

        <div className="col-md-4">
          <div className="card card-shadow p-4">
            <h6 className="kpi-label">Campaign Reach</h6>
            <h2 className="kpi-value">78%</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card card-shadow p-4">
            <h6 className="kpi-label">Open Rate</h6>
            <h2 className="kpi-value">74%</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card card-shadow p-4">
            <h6 className="kpi-label">Conversions</h6>
            <h2 className="kpi-value">12%</h2>
          </div>
        </div>

      </div>

      <div className="card card-shadow p-4">

        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>Campaign Performance Trend</h4>

          <span className="badge bg-primary">
            Last 5 Months
          </span>
        </div>

        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="campaigns"
              stroke="#2563EB"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>

      </div>

      <div className="row mt-4">

  <div className="col-md-6">
    <div className="alert alert-success">
      📈 Campaign performance increased by 24% this month.
    </div>
  </div>

  <div className="col-md-6">
    <div className="alert alert-primary">
      🤖 AI recommends WhatsApp campaigns for inactive customers.
    </div>
  </div>

</div>

    </MainLayout>
  );
}

export default Analytics;
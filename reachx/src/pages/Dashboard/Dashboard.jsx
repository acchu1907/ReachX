import MainLayout from "../../layouts/MainLayout";
import StatCard from "../../components/StatCard/StatCard";
import { FaUsers, FaShoppingCart, FaBullhorn } from "react-icons/fa";
import { MdMarkEmailRead } from "react-icons/md";
import { IoMdOpen } from "react-icons/io";
import { BsCursorFill } from "react-icons/bs";






function Dashboard() {
  return (
    <MainLayout>
      <div className="hero-card">
  <h2>Welcome back, Ashwitha 👋</h2>

  <p>
    Monitor campaigns, track engagement,
    and generate AI-powered customer insights.
  </p>
</div>
        
      
      <h1 className="page-title mb-4">
        ReachX Dashboard
      </h1>

      <div className="row g-4">

        <div className="col-md-4">
          <StatCard title="Customers" value="1250" icon={<FaUsers  color="#2563EB"/>} />
        </div>

        <div className="col-md-4">
          <StatCard title="Orders" value="4520" icon={<FaShoppingCart  color="#2563EB"/>} />
        </div>

        <div className="col-md-4">
          <StatCard title="Campaigns" value="120" icon={<FaBullhorn  color="#2563EB"/>} />
        </div>

        <div className="col-md-4">
          <StatCard title="Delivery Rate" value="92%" icon={<MdMarkEmailRead  color="#2563EB"/>} />
        </div>

        <div className="col-md-4">
          <StatCard title="Open Rate" value="74%" icon={<IoMdOpen  color="#2563EB"/>} />
        </div>

        <div className="col-md-4">
          <StatCard title="Click Rate" value="38%" icon={<BsCursorFill  color="#2563EB"/>} />
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
          <tr>
            <td>Summer Sale</td>
            <td>500</td>
            <td>Delivered</td>
          </tr>

          <tr>
            <td>Diwali Offer</td>
            <td>800</td>
            <td>Running</td>
          </tr>

        </tbody>

      </table>

    </div>

  </div>

  <div className="col-lg-4">

    <div className="card card-shadow p-4">

      <h4>AI Insights</h4>
      <div className="alert alert-primary">
  146 customers inactive for 60+ days
</div>

<div className="alert alert-success">
  WhatsApp predicted engagement: 78%
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

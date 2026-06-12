import { NavLink } from "react-router-dom";

import {
  MdDashboard,
} from "react-icons/md";

import {
  FaUsers,
  FaShoppingCart,
  FaBullhorn,
  FaChartBar,
  FaRobot,
} from "react-icons/fa";

function Sidebar() {
  return (
    <div className="sidebar">

      <div className="logo-section">
        <h2>✦ ReachX</h2>
        <p>AI CRM Platform</p>
      </div>

      <div className="menu">

        <NavLink to="/">
          <MdDashboard />
          Dashboard
        </NavLink>

        <NavLink to="/customers">
          <FaUsers />
          Customers
        </NavLink>

        <NavLink to="/orders">
          <FaShoppingCart />
          Orders
        </NavLink>

        <NavLink to="/campaigns">
          <FaBullhorn />
          Campaigns
        </NavLink>

        <NavLink to="/analytics">
          <FaChartBar />
          Analytics
        </NavLink>

        <NavLink to="/ai-builder">
          <FaRobot />
          AI Builder
        </NavLink>

      </div>

    </div>
  );
}

export default Sidebar;
import Sidebar from "../components/Sidebar/sidebar";
import { FaBell } from "react-icons/fa";

function MainLayout({ children }) {
  return (
    <div className="app-layout">

      <Sidebar />

      <div className="main-content">

        <div className="topbar">

          <input
            type="text"
            placeholder="Search customers, campaigns..."
            className="search-box"
          />

          <div className="topbar-right">

            <FaBell className="notification-icon" />

            <div className="profile-card">
              <div className="profile-avatar">
                A
              </div>

              <div>
                <h6>Ashwitha</h6>
                <small>Admin</small>
              </div>
            </div>

          </div>

        </div>

        {children}

      </div>

    </div>
  );
}

export default MainLayout;
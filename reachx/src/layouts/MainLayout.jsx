import Sidebar from "../components/Sidebar/sidebar";
import { FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function MainLayout({ children }) {

  const navigate = useNavigate();

  const handleLogout = () => {

  localStorage.removeItem("isLoggedIn");

  navigate("/login");

};
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

  <button
    className="btn btn-danger btn-sm me-3"
    onClick={handleLogout}
  >
    Logout
  </button>

  <div className="profile-card">

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
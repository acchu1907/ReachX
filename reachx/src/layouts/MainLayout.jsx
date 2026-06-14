import Sidebar from "../components/Sidebar/sidebar";
import { FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function MainLayout({ children }) {

  const [search, setSearch] = useState("");

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

         <div className="d-flex gap-2">
  <input
    type="text"
    placeholder="Search customers, campaigns..."
    className="search-box"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
<button
  className="btn btn-primary"
  onClick={() => {

    if (search.toLowerCase().includes("customer"))
      window.location.href = "/customers";

    else if (search.toLowerCase().includes("campaign"))
      window.location.href = "/campaigns";

    else if (search.toLowerCase().includes("order"))
      window.location.href = "/orders";

    else if (search.toLowerCase().includes("segment"))
      window.location.href = "/segments";

    else
      alert("No matching page found");

  }}
>
  Search
</button>
</div>

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
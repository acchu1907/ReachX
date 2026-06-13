import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/global.css";

import Dashboard from "./pages/Dashboard/Dashboard";
import Customers from "./pages/Customers/Customers";
import Orders from "./pages/Orders/Orders";
import Campaigns from "./pages/Campaigns/Campaigns";
import Analytics from "./pages/Analytics/Analytics";
import AIBuilder from "./pages/AIBuilder/AIBuilder";
import Login from "./pages/Login/Login";
import { Navigate } from "react-router-dom";


function ProtectedRoute({ children }) {

  const isLoggedIn =
    localStorage.getItem("isLoggedIn");

  return isLoggedIn
    ? children
    : <Navigate to="/login" />;
}


function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/login" element={<Login />} />

<Route
  path="/"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/customers"
  element={
    <ProtectedRoute>
      <Customers />
    </ProtectedRoute>
  }
/>

<Route
  path="/orders"
  element={
    <ProtectedRoute>
      <Orders />
    </ProtectedRoute>
  }
/>

<Route
  path="/campaigns"
  element={
    <ProtectedRoute>
      <Campaigns />
    </ProtectedRoute>
  }
/>

<Route
  path="/analytics"
  element={
    <ProtectedRoute>
      <Analytics />
    </ProtectedRoute>
  }
/>

<Route
  path="/ai-builder"
  element={
    <ProtectedRoute>
      <AIBuilder />
    </ProtectedRoute>
  }
/>

      </Routes>

    </BrowserRouter>
  );
}

export default App;
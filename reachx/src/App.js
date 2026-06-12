import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/global.css";

import Dashboard from "./pages/Dashboard/Dashboard";
import Customers from "./pages/Customers/Customers";
import Orders from "./pages/Orders/Orders";
import Campaigns from "./pages/Campaigns/Campaigns";
import Analytics from "./pages/Analytics/Analytics";
import AIBuilder from "./pages/AIBuilder/AIBuilder";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Dashboard />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/ai-builder" element={<AIBuilder />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
// API service for all backend calls
const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:8000";

const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  // Add auth token if available
  const token = localStorage.getItem("authToken");
  if (token) {
    defaultHeaders["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

export const api = {
  // Campaigns
  getCampaigns: () => apiCall("/api/campaigns/"),
  createCampaign: (data) =>
    apiCall("/api/campaigns/", { method: "POST", body: JSON.stringify(data) }),
  updateCampaign: (id, data) =>
    apiCall(`/api/campaigns/${id}/`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deleteCampaign: (id) =>
    apiCall(`/api/campaigns/${id}/`, { method: "DELETE" }),

  // Customers
  getCustomers: () => apiCall("/api/customers/"),
  createCustomer: (data) =>
    apiCall("/api/customers/", { method: "POST", body: JSON.stringify(data) }),
  updateCustomer: (id, data) =>
    apiCall(`/api/customers/${id}/`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deleteCustomer: (id) =>
    apiCall(`/api/customers/${id}/`, { method: "DELETE" }),

  // Orders
  getOrders: () => apiCall("/api/orders/"),
  createOrder: (data) =>
    apiCall("/api/orders/", { method: "POST", body: JSON.stringify(data) }),
  updateOrder: (id, data) =>
    apiCall(`/api/orders/${id}/`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deleteOrder: (id) =>
    apiCall(`/api/orders/${id}/`, { method: "DELETE" }),

  // Segments
  getSegments: () => apiCall("/api/segments/"),
  createSegment: (data) =>
    apiCall("/api/segments/", { method: "POST", body: JSON.stringify(data) }),
  updateSegment: (id, data) =>
    apiCall(`/api/segments/${id}/`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deleteSegment: (id) =>
    apiCall(`/api/segments/${id}/`, { method: "DELETE" }),

  // AI Builder
  generateAICampaign: (prompt) =>
    apiCall("/api/ai-builder/", {
      method: "POST",
      body: JSON.stringify({ prompt }),
    }),

  // Analytics
  getAnalytics: () => apiCall("/api/analytics/"),
};

export default api;

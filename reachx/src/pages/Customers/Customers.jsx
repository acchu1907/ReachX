import MainLayout from "../../layouts/MainLayout";
import { useState, useEffect } from "react";

function Customers() {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [totalSpent, setTotalSpent] = useState("");

  const [customers, setCustomers] = useState([]);

  


  useEffect(() => {
  fetch("http://127.0.0.1:8000/api/customers/")
    .then((response) => response.json())
    .then((data) => {
      setCustomers(data);
    })
    .catch((error) => {
      console.error("Error fetching customers:", error);
    });
}, []);

const addCustomer = async () => {
  const newCustomer = {
    name,
    email,
    city,
    total_spent: totalSpent,
    status: "Active",
  };

  try {
    const response = await fetch(
      "http://127.0.0.1:8000/api/customers/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCustomer),
      }
    );

    const data = await response.json();

    setCustomers([...customers, data]);

    setName("");
    setEmail("");
    setCity("");
    setTotalSpent("");

    setShowModal(false);

  } catch (error) {
    console.error("Error adding customer:", error);
  }
};


const editCustomer = (customer) => {

  setEditingId(customer.id);

  setName(customer.name);

  setEmail(customer.email);

  setCity(customer.city);

  setTotalSpent(customer.total_spent);

  setShowModal(true);
};


const updateCustomer = async () => {
  const updatedCustomer = {
    name,
    email,
    city,
    total_spent: totalSpent,
    status: "Active",
  };

  try {
    const response = await fetch(
  `http://127.0.0.1:8000/api/customers/update/${editingId}/`,
  {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedCustomer),
  }
)
    const data = await response.json();

    setCustomers(
      customers.map((customer) =>
        customer.id === editingId
          ? data
          : customer
      )
    );

    setEditingId(null);

    setName("");
    setEmail("");
    setCity("");
    setTotalSpent("");

    setShowModal(false);

  } catch (error) {
    console.error(
      "Error updating customer:",
      error
    );
  }
};

const deleteCustomer = async (id) => {
  try {
    await fetch(
      `http://127.0.0.1:8000/api/customers/${id}/`,
      {
        method: "DELETE",
      }
    );

    setCustomers(
      customers.filter(
        (customer) => customer.id !== id
      )
    );

  } catch (error) {
    console.error(
      "Error deleting customer:",
      error
    );
  }
};

  const filteredCustomers = customers.filter((customer) =>
  (customer.name || "")
    .toLowerCase()
    .includes(search.toLowerCase())
);
  return (
    <MainLayout>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="page-title">Customers</h1>

        <button
          className="btn btn-primary"
          onClick={() => {
  setEditingId(null);
  setName("");
  setEmail("");
  setCity("");
  setTotalSpent("");
  setShowModal(true);
}}
        >
          + Add Customer
        </button>
      </div>

      <input
        type="text"
        className="search-input mb-4"
        placeholder="Search Customer..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="card card-shadow p-4">

        <table className="table">

          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>City</th>
              <th>Total Spend</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {filteredCustomers.map((customer) => (
              <tr key={customer.id}>

                <td>
                  <div className="customer-name">

                    <div className="customer-avatar">
                      
                      
                      {(customer.name || "").charAt(0)}
                    </div>

                    <span>{customer.name}</span>

                  </div>
                </td>

                <td>{customer.email}</td>

                <td>{customer.city}</td>

                <td>₹{customer.total_spent}</td>

                <td>
                  {customer.status === "Active" ? (
                    <span className="status-active ">
                      Active
                    </span>
                  ) : (
                    <span className="status-draft">
                      Inactive
                    </span>
                  )}
                </td>

                <td>

                  <button className="btn btn-warning btn-sm me-2" onClick={() => editCustomer(customer)}>
                    Edit
                  </button>

                <button
  className="btn btn-danger btn-sm"
  onClick={() => {
    if (
      window.confirm(
        "Delete this customer?"
      )
    ) {
      deleteCustomer(customer.id);
    }
  }}
>
  Delete
</button>
     
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

      {showModal && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100"
          style={{
            background: "rgba(0,0,0,0.5)",
            zIndex: 9999,
          }}
        >

          <div
            className="bg-white p-4"
            style={{
              width: "500px",
              margin: "100px auto",
              borderRadius: "20px",
            }}
          >

            <h3 className="mb-3">
              👤 Add New Customer
            </h3>

            <input
              className="form-control my-2"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="form-control my-2"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className="form-control my-2"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />

            <input
              className="form-control my-2"
              placeholder="Total Spend"
              value={totalSpent}
              onChange={(e) => setTotalSpent(e.target.value)}
            />

            <div className="mt-3">

              <button
                className="btn btn-secondary me-2"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button
  className="btn btn-success"
  onClick={
    editingId
      ? updateCustomer
      : addCustomer
  }
>
  {editingId ? "Update Customer" : "Save Customer"}
</button>

            </div>

          </div>

        </div>
      )}

    </MainLayout>
  );
}

export default Customers;
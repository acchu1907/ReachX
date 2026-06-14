import MainLayout from "../../layouts/MainLayout";
import { useState, useEffect } from "react";

function Orders() {

  const [orders, setOrders] = useState([]);

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [customerName, setCustomerName] = useState("");
  const [productName, setProductName] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("Pending");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/orders/")
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  const addOrder = async () => {

  const newOrder = {
    customer_name: customerName,
    product_name: productName,
    amount,
    status,
  };

  try {

    const response = await fetch(
      "http://127.0.0.1:8000/api/orders/",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(newOrder),
      }
    );

    const data = await response.json();

    setOrders([
      ...orders,
      data,
    ]);

    setCustomerName("");
    setProductName("");
    setAmount("");
    setStatus("Pending");

    setShowModal(false);

  } catch (error) {
    console.error(error);
  }
};

const deleteOrder = async (id) => {

  try {

    await fetch(
      `http://127.0.0.1:8000/api/orders/${id}/`,
      {
        method: "DELETE",
      }
    );

    setOrders(
      orders.filter(
        (order) => order.id !== id
      )
    );

  } catch (error) {
    console.error(error);
  }
};

const editOrder = (order) => {

  setEditingId(order.id);

  setCustomerName(order.customer_name);

  setProductName(order.product_name);

  setAmount(order.amount);

  setStatus(order.status);

  setShowModal(true);
};

  const filteredOrders = orders.filter(
    (order) =>
      (order.customer_name || "")
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  const updateOrder = async () => {

  const updatedOrder = {
    customer_name: customerName,
    product_name: productName,
    amount,
    status,
  };

  try {

    const response = await fetch(
      `http://127.0.0.1:8000/api/orders/update/${editingId}/`,
      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(updatedOrder),
      }
    );

    const data = await response.json();

    setOrders(
      orders.map((order) =>
        order.id === editingId
          ? data
          : order
      )
    );

    setEditingId(null);

    setShowModal(false);

  } catch (error) {
    console.error(error);
  }
};

  return (
    <MainLayout>

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h1 className="page-title">
          Orders
        </h1>

        <button
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          + Add Order
        </button>

      </div>

      <input
        type="text"
        className="search-input mb-4"
        placeholder="Search Orders..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="card card-shadow p-4">

        <table className="table">

          <thead>
            <tr>
              <th>Customer</th>
              <th>Product</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {filteredOrders.map((order) => (

              <tr key={order.id}>

                <td>{order.customer_name}</td>

                <td>{order.product_name}</td>

                <td>₹{order.amount}</td>

                <td>

                  {order.status === "Delivered" && (
                    <span className="badge bg-success">
                      Delivered
                    </span>
                  )}

                  {order.status === "Pending" && (
                    <span className="badge bg-warning text-dark"
                    style={{
    background: "#e5bb46",
    color: "#fff",
    border: "none"
  }}>
                      
                      Pending
                    </span>
                  )}

                </td>

                <td>

                 <button
  className="btn btn-danger btn-sm"
  style={{
    background: "#4F46E5",
    color: "#fff",
    border: "none"
  }}
>
  Edit
</button>

                 <button
  className="btn btn-danger btn-sm"
  onClick={() => {
    if (
      window.confirm(
        "Delete this order?"
      )
    ) {
      deleteOrder(order.id);
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

      <h3>
  {editingId
    ? "Edit Order"
    : "Add Order"}
</h3>

      <input
        className="form-control my-2"
        placeholder="Customer Name"
        value={customerName}
        onChange={(e) =>
          setCustomerName(e.target.value)
        }
      />

      <input
        className="form-control my-2"
        placeholder="Product Name"
        value={productName}
        onChange={(e) =>
          setProductName(e.target.value)
        }
      />

      <input
        className="form-control my-2"
        placeholder="Amount"
        value={amount}
        onChange={(e) =>
          setAmount(e.target.value)
        }
      />

      <select
        className="form-control my-2"
        value={status}
        onChange={(e) =>
          setStatus(e.target.value)
        }
      >
        <option>Pending</option>
        <option>Delivered</option>
      </select>

      <div className="mt-3">

        <button
          className="btn btn-secondary me-2"
          onClick={() =>
            setShowModal(false)
          }
        >
          Cancel
        </button>

       <button
  className="btn btn-success"
  onClick={
    editingId
      ? updateOrder
      : addOrder
  }
>
  {editingId
    ? "Update Order"
    : "Save Order"}
</button>

      </div>

    </div>

  </div>

)}

    </MainLayout>
  );
}

export default Orders;
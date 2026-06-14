import MainLayout from "../../layouts/MainLayout";
import { useEffect, useState } from "react";

function Segments() {

  const [segments, setSegments] = useState([]);
  const [customers, setCustomers] = useState([]);

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [minSpend, setMinSpend] = useState("");

  useEffect(() => {
    fetchSegments();
  }, []);

  const fetchSegments = () => {
    fetch("http://127.0.0.1:8000/api/segments/")
      .then((response) => response.json())
      .then((data) => {
        setSegments(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const createSegment = async () => {

    const newSegment = {
      name,
      city,
      min_spend: minSpend,
    };

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/api/segments/",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(newSegment),
        }
      );

      const data = await response.json();

      setSegments([
        ...segments,
        data,
      ]);

      setName("");
      setCity("");
      setMinSpend("");

    } catch (error) {
      console.error(error);
    }
  };

  const viewCustomers = async (segmentId) => {

    try {

      const response = await fetch(
        `http://127.0.0.1:8000/api/segments/${segmentId}/customers/`
      );

      const data = await response.json();

      setCustomers(data);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MainLayout>

      <h1 className="page-title mb-4">
        Customer Segments
      </h1>

      {/* Create Segment */}

      <div className="card card-shadow p-4 mb-4">

        <h4>Create Segment</h4>

        <input
          className="form-control my-2"
          placeholder="Segment Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          className="form-control my-2"
          placeholder="City"
          value={city}
          onChange={(e) =>
            setCity(e.target.value)
          }
        />

        <input
          className="form-control my-2"
          placeholder="Minimum Spend"
          value={minSpend}
          onChange={(e) =>
            setMinSpend(e.target.value)
          }
        />

        <button
          className="btn btn-primary mt-2"
          onClick={createSegment}
        >
          Create Segment
        </button>

      </div>

      {/* Segments List */}

      <div className="card card-shadow p-4 mb-4">

        <h4>Saved Segments</h4>

        <table className="table mt-3">

          <thead>
            <tr>
              <th>Name</th>
              <th>City</th>
              <th>Min Spend</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {segments.map((segment) => (

              <tr key={segment.id}>

                <td>{segment.name}</td>

                <td>{segment.city}</td>

                <td>
                  ₹{segment.min_spend}
                </td>

                <td>

                  <button
                    className="btn btn-success btn-sm"
                    onClick={() =>
                      viewCustomers(segment.id)
                    }
                  >
                    View Customers
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Matching Customers */}

      <div className="card card-shadow p-4">

        <h4>Matching Customers</h4>

        <table className="table mt-3">

          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>City</th>
              <th>Total Spent</th>
            </tr>
          </thead>

          <tbody>

            {customers.map((customer) => (

              <tr key={customer.id}>

                <td>{customer.name}</td>

                <td>{customer.email}</td>

                <td>{customer.city}</td>

                <td>
                  ₹{customer.total_spent}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </MainLayout>
  );
}

export default Segments;
import MainLayout from "../../layouts/MainLayout";
import { useState, useEffect } from "react";

function Campaigns() {

 const [campaigns, setCampaigns] = useState([]);

 const [showModal, setShowModal] = useState(false);

 const [name, setName] = useState("");

 const [audience, setAudience] = useState("");

 const [status, setStatus] = useState("Draft");

 const [search, setSearch] = useState("");
 
 const [editingId, setEditingId] = useState(null);

 const [segmentCity, setSegmentCity] = useState("");

const [minSpend, setMinSpend] = useState("");

const [audienceCount, setAudienceCount] = useState(0);

 useEffect(() => {
  fetch("http://127.0.0.1:8000/api/campaigns/")
    .then((response) => response.json())
    .then((data) => {
      setCampaigns(data);
    })
    .catch((error) => {
      console.error(error);
    });
}, []);

/*add campaign*/
const addCampaign = async () => {

  const newCampaign = {
  name,
  audience,
  status,

  segment_city: segmentCity,

  segment_min_spend: minSpend,

  audience_count: audienceCount,
};
  try {

    const response = await fetch(
      "http://127.0.0.1:8000/api/campaigns/",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(newCampaign),
      }
    );

    const data = await response.json();

    setCampaigns([
      ...campaigns,
      data,
    ]);

    setName("");
    setAudience("");
    setStatus("Draft");

    setShowModal(false);

  } catch (error) {
    console.error(error);
  }
};

/*delete campaign*/

const deleteCampaign = async (id) => {

  try {

    await fetch(
      `http://127.0.0.1:8000/api/campaigns/${id}/`,
      {
        method: "DELETE",
      }
    );

    setCampaigns(
      campaigns.filter(
        (campaign) => campaign.id !== id
      )
    );

  } catch (error) {
    console.error(error);
  }
};

/*search*/

const filteredCampaigns = campaigns.filter(
  (campaign) =>
    (campaign.name || "")
      .toLowerCase()
      .includes(search.toLowerCase()))



/*edit campaign*/
const editCampaign = (campaign) => {

  setEditingId(campaign.id);

  setName(campaign.name);

  setAudience(campaign.audience);

  setStatus(campaign.status);

  setShowModal(true);

  setSegmentCity(
  campaign.segment_city || ""
);

setMinSpend(
  campaign.segment_min_spend || ""
);

setAudienceCount(
  campaign.audience_count || 0
);
};



/*update campaign*/
const updateCampaign = async () => {

 const updatedCampaign = {
  name,
  audience,
  status,

  segment_city: segmentCity,

  segment_min_spend: minSpend,

  audience_count: audienceCount,
};

  try {

    const response = await fetch(
      `http://127.0.0.1:8000/api/campaigns/update/${editingId}/`,
      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(updatedCampaign),
      }
    );

    const data = await response.json();

    setCampaigns(
      campaigns.map((campaign) =>
        campaign.id === editingId
          ? data
          : campaign
      )
    );

    setEditingId(null);

    setShowModal(false);

  } catch (error) {
    console.error(error);
  }
};

const previewAudience = async () => {

  try {

    const response = await fetch(
      `http://127.0.0.1:8000/api/campaigns/audience-preview/?city=${segmentCity}&min_spend=${minSpend}`
    );

    const data = await response.json();

    setAudienceCount(data.audience_count);

  } catch (error) {
    console.error(error);
  }
};


const totalCampaigns = campaigns.length;

const runningCampaigns = campaigns.filter(
  c => c.status === "Running"
).length;

const deliveredCampaigns = campaigns.filter(
  c => c.status === "Delivered"
).length;

const draftCampaigns = campaigns.filter(
  c => c.status === "Draft"
).length;
  return (

    



     <MainLayout>


    {/* HEADER + STATS */}

    <div className="campaign-header">

      <h1 className="page-title">
        Campaigns
      </h1>


      <button
        className="btn btn-primary"
        onClick={() => setShowModal(true)}
      >
        + Create Campaign
      </button>

    </div>


    <div className="stats-grid">

      <div className="stat-card stat-total">
        <h2>{totalCampaigns}</h2>
        <p>Total Campaigns</p>
      </div>


      <div className="stat-card stat-running">
        <h2>{runningCampaigns}</h2>
        <p>Running</p>
      </div>


      <div className="stat-card stat-delivered">
        <h2>{deliveredCampaigns}</h2>
        <p>Delivered</p>
      </div>


      <div className="stat-card stat-draft">
        <h2>{draftCampaigns}</h2>
        <p>Draft</p>
      </div>

    </div>



    {/* SEARCH BOX */}

    <input
      type="text"
      className="search-input mb-4"
      placeholder="Search Campaign..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />

      <div className="card card-shadow p-4 campaign-card">

        <table className="table">

          <thead>
            <tr>
              <th>Campaign Name</th>
              <th>Audience</th>
              <th>Status</th>
              <th>Actions</th>
              <th>City Filter</th>
              <th>Min Spend</th>
             
            </tr>
          </thead>

          <tbody>


         


            {filteredCampaigns.map((campaign) => (
              <tr key={campaign.id}>
                <td>{campaign.name}</td>
                <td>{campaign.audience_count} customers</td>
               <td>
  {campaign.status === "Delivered" && (
    <span className="status-delivered ">
      Delivered
    </span>
  )}

  {campaign.status === "Running" && (
    <span className="status-running ">
      Running
    </span>
  )}

  {campaign.status === "Draft" && (
    <span className="badge bg-secondary">
      Draft
    </span>
  )}
</td>

<td>
  <button
  className="btn btn-success btn-sm"
  style={{
    background: "#4F46E5",
    color: "#fff",
    border: "none"
  }}
>
  Edit
</button>
  <button
    className="btn btn-danger btn-sm me-2"
    onClick={() => deleteCampaign(campaign.id)}
  >
    Delete
  </button>

  <button
    className="btn btn-success btn-sm"
    onClick={async () => {

      const response = await fetch(
        "http://127.0.0.1:8000/api/channels/send/",
        {
          method: "POST"
        }
      );

      const data = await response.json();

      alert(
        `Campaign Sent!\n\nSent: ${data.sent}\nDelivered: ${data.delivered}\nOpened: ${data.opened}\nClicked: ${data.clicked}`
      );
    }}
  >
    🚀 Send
  </button>
</td>
<td>{campaign.segment_city}</td>

<td>
  ₹{campaign.segment_min_spend}
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
    ? "Edit Campaign"
    : "Create Campaign"}
</h3>

      <input
        className="form-control my-2"
        placeholder="Campaign Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="form-control my-2"
        placeholder="Audience Size"
        value={audience}
        onChange={(e) => setAudience(e.target.value)}
      />

      <select
        className="form-control my-2"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option>Draft</option>
        <option>Running</option>
        <option>Delivered</option>
      </select>

      <div className="mt-3">

        <button
          className="btn btn-secondary me-2"
          onClick={() => setShowModal(false)}
        >
          Cancel
        </button>
<hr />

<h5>Audience Segmentation</h5>

<input
  className="form-control my-2"
  placeholder="City"
  value={segmentCity}
  onChange={(e) =>
    setSegmentCity(e.target.value)
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
  className="btn btn-info mt-2"
  onClick={previewAudience}
>
  Preview Audience
</button>

<div className="alert alert-primary mt-3">
  🎯 Audience Size:
  <strong className="ms-2">
    {audienceCount} customers
  </strong>
</div>



       <button
  className="btn btn-success"
  onClick={
    editingId
      ? updateCampaign
      : addCampaign
  }
>
  {editingId
    ? "Update Campaign"
    : "Save Campaign"}
</button>
      </div>

    </div>

  </div>

)}


      

    </MainLayout>
  );
}

export default Campaigns;
import MainLayout from "../../layouts/MainLayout";

function Campaigns() {

  const campaigns = [
    {
      id: 1,
      name: "Summer Sale",
      audience: 500,
      status: "Delivered",
    },
    {
      id: 2,
      name: "Diwali Offer",
      audience: 800,
      status: "Running",
    },
    {
      id: 3,
      name: "Win Back Customers",
      audience: 146,
      status: "Draft",
    },
  ];

  return (
    <MainLayout>

      <div className="d-flex justify-content-between align-items-center mb-4">
  <h1 className="page-title">Campaigns</h1>

  <button className="btn btn-primary">
    + Create Campaign
  </button>
</div>
<input
  type="text"
  className="search-input mb-4"
  placeholder="Search Campaign..."
/>

      <div className="card card-shadow p-4 campaign-card">

        <table className="table">

          <thead>
            <tr>
              <th>Campaign Name</th>
              <th>Audience</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {campaigns.map((campaign) => (
              <tr key={campaign.id}>
                <td>{campaign.name}</td>
                <td>{campaign.audience}</td>
                <td>
  {campaign.status === "Delivered" && (
    <span className="badge bg-success">
      Delivered
    </span>
  )}

  {campaign.status === "Running" && (
    <span className="badge bg-warning text-dark">
      Running
    </span>
  )}

  {campaign.status === "Draft" && (
    <span className="badge bg-secondary">
      Draft
    </span>
  )}
</td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </MainLayout>
  );
}

export default Campaigns;
function StatCard({ title, value, icon }) {
  return (
    <div className="card card-shadow p-3 h-100">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h6 className="kpi-label">{title}</h6>
          <h2>{value}</h2>
        </div>

        <div style={{ fontSize: "32px" }}>
          {icon}
        </div>
      </div>
    </div>
  );
}

export default StatCard;
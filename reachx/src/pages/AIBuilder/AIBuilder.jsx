import MainLayout from "../../layouts/MainLayout";
import { useState } from "react";

function AIBuilder() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState(null);

  const generateSegment = () => {
  setResult({
    audience: 146,
    channel: "WhatsApp",
    reach: "78%",
    conversion: "12%",
    message:
      "Hi {{name}}, We've missed you! Enjoy 20% OFF on your next purchase.",
  });
};

  return (
    <MainLayout>
      <div className="hero-card">
  <h2>🤖 AI Campaign Builder</h2>

  <p>
    Describe your audience in natural language and let AI generate
    targeted campaigns instantly.
  </p>
</div>

      <div className="card card-shadow p-4">

        <label className="mb-2 fw-bold">
          Describe your audience
        </label>

        <textarea
          className="form-control"
          rows="5"
          placeholder="Example: Customers who spent more than ₹5000 and haven't ordered in 30 days"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <button
          className="btn btn-primary mt-3"
          onClick={generateSegment}
        >
          Generate Campaign
        </button>

      </div>

      {result && (
  <div className="card card-shadow p-4 mt-4">

    <h3 className="mb-4">
      🎯 Campaign Generated Successfully
    </h3>

    <div className="row g-3">

      <div className="col-md-3">
        <div className="card card-shadow p-3 text-center">
          <h6>Audience</h6>
          <h3>{result.audience}</h3>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card card-shadow p-3 text-center">
          <h6>Channel</h6>
          <h3>{result.channel}</h3>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card card-shadow p-3 text-center">
          <h6>Reach</h6>
          <h3>{result.reach}</h3>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card card-shadow p-3 text-center">
          <h6>Conversion</h6>
          <h3>{result.conversion}</h3>
        </div>
      </div>

    </div>

    <div className="alert alert-success mt-4">
      <strong>Generated Message:</strong>
      <br /><br />
      {result.message}
    </div>

    <div className="mt-3">
      <button className="btn btn-success me-2">
        Save Campaign
      </button>

      <button className="btn btn-primary">
        Launch Campaign
      </button>
    </div>

  </div>
)}
    </MainLayout>
  );
}

export default AIBuilder;
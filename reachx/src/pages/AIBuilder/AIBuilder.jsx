import MainLayout from "../../layouts/MainLayout";
import { useState } from "react";

function AIBuilder() {

  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState(null);

  const generateCampaign = async () => {

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/api/ai-builder/",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            prompt,
          }),
        }
      );

      const data = await response.json();

      setResult(data);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MainLayout>

      <h1 className="page-title mb-4">
        AI Campaign Builder
      </h1>

      <div className="card p-4">

        <textarea
          className="form-control mb-3"
          rows="4"
          placeholder="Describe audience..."
          value={prompt}
          onChange={(e) =>
            setPrompt(e.target.value)
          }
        />

        <button
          className="btn btn-primary"
          onClick={generateCampaign}
        >
          Generate Campaign
        </button>

      </div>

      {result && (

        <div className="card p-4 mt-4">

          <h4>Campaign Result</h4>

          <p>
            <strong>Audience:</strong>{" "}
            {result.audience}
          </p>

          <p>
            <strong>Channel:</strong>{" "}
            {result.channel}
          </p>

          <p>
            <strong>Reach:</strong>{" "}
            {result.reach}
          </p>

          <p>
            <strong>Conversion:</strong>{" "}
            {result.conversion}
          </p>

          <p>
            <strong>Message:</strong>{" "}
            {result.message}
          </p>

        </div>

      )}

    </MainLayout>
  );
}

export default AIBuilder;
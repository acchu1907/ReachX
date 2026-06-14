import MainLayout from "../../layouts/MainLayout";
import { useState } from "react";

function AIBuilder() {

  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);


/* create campaign in backend using result data */

  const createCampaign = async () => {

  const campaignData = {

    name: "AI Generated Campaign",

    audience: result.audience,

    status: "Draft",

    segment_city: "Chennai",

    segment_min_spend: 10000,

};

  try {

    const response = await fetch(
      "http://127.0.0.1:8000/api/campaigns/",
      {
        method:"POST",

        headers:{
          "Content-Type":"application/json"
        },

        body:JSON.stringify(campaignData)
      }
    );


    const data = await response.json();

    console.log(data);


    alert("Campaign Created Successfully");


  }
  catch(error){

    console.error(error);

  }

};


const generateCampaign = async () => {
    setLoading(true);

    try {
        const response = await fetch(
            "http://127.0.0.1:8000/api/ai-builder/",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    prompt: prompt
                })
            }
        );

        const data = await response.json();

        console.log("AI Response:", data);

        setResult(data);

    } catch (error) {
        console.error(error);
    }

    finally {
        setLoading(false);
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
  disabled={loading}
>
  {loading ? "Generating..." : "Generate Campaign"}
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
  <strong>Campaign Name:</strong>{" "}
  {result.name}
</p>

<p>
  <strong>City:</strong>{" "}
  {result.city}
</p>

<p>
  <strong>Minimum Spend:</strong>{" "}
  {result.min_spend}
</p>
          <button
  className="btn btn-success mt-3"
  onClick={createCampaign}
>
  Create Campaign
</button>

        </div>

      )}

    </MainLayout>
  );
}

export default AIBuilder;
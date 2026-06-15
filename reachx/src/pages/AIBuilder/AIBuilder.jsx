import MainLayout from "../../layouts/MainLayout";
import { useState } from "react";

function AIBuilder() {

  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);


/* create campaign in backend using result data */

  const createCampaign = async () => {

  if(!result){
    alert("Generate campaign first");
    return;
  }

 const campaignData = {

    name: result.name,

    audience: 1000,

    audience_count: 1000,

    status: "Draft",

    segment_city: result.city,

    segment_min_spend: result.min_spend,

};



  console.log("Sending campaign:", campaignData);


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


   const text = await response.text();

console.log("Backend response:", text);

if(response.ok){

    const data = JSON.parse(text);

    console.log("Created Campaign:", data);

    alert("Campaign Created Successfully");

    window.location.href="/campaigns";

}
else{

    console.error("Campaign Error:", text);

    alert("Campaign creation failed");

}


  }
  catch(error){

    console.error(error);

  }

};

const generateCampaign = async () => {

    if(!prompt.trim()){
        alert("Please describe your campaign first");
        return;
    }


    console.log("Generate clicked");

    if(!prompt){
        alert("Please enter a campaign description");
        return;
    }

    setLoading(true);

    try {

        console.log("Sending:", prompt);


        const response = await fetch(
            "http://127.0.0.1:8000/api/ai-builder/",
            {
                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify({
                    prompt:prompt
                })
            }
        );


        console.log("Status:", response.status);


        const text = await response.text();

        console.log("Backend response:", text);


        const data = JSON.parse(text);


        setResult(data);


    }
    catch(error){

        console.error("AI Error:",error);

    }

    finally{

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
<strong>Offer:</strong>{" "}
{result.offer}
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
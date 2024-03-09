"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [isop,setIsOp] =useState(false);
  const [output, setOutput] = useState("it's null right now");
  const [loading, setLoading] = useState(false);

  function HandleSubmit(e) {
    e.preventDefault();
    console.log("rurf", query);
    const formData = new FormData(e.target);
    setQuery(formData.get("llmQuery"))
    // console.log(formData.get("llmQuery"));
    fetchData()
  }

  async function fetchData() {
    try {
      const command= JSON.stringify({QUERY:query})
      console.log(command)
      setLoading(true);
      const response = await fetch("http://localhost:3000/api", {
        method: "POST",
        body: command,
      });
      const data = await response.json();
      setLoading(false);
      setIsOp(true);
      setOutput(JSON.stringify(data));
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
    
  }
  return (
    <main>
      <div>{loading ? "Loading..." : ResultLLM()}</div>
      <form onSubmit={HandleSubmit}>
        <label>
          Enter your name:
          <input
            type="text"
            name="llmQuery"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Please Enter Your Query ..."
          ></input>
        </label>
        <button type="submit">submit here</button>
      </form>

    </main>
  );
}

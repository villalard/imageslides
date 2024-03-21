"use client";

import { useState } from "react";

export default function Home() {
  const [imageUrl, setImageUrl] = useState(null);
  const [text, setText] = useState("");

  const fetchImage = async () => {
    const response = await fetch("/api/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    if (response.ok) {
      const data = await response.json();
      setImageUrl(data.imageUrl);
    }
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    fetchImage();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        gap: "10px",
      }}
    >
      <div
        id="imageDiv"
        style={{
          border: "2px solid white",
          width: "500px",
          height: "500px",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {imageUrl ? <img src={imageUrl} alt={text} /> : <p>Loading image...</p>}
      </div>
      <div id="controlsDiv">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text"
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

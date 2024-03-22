"use client";

import "./css/main.css";
import { useState } from "react";

export default function Home() {
  const [imageUrl, setImageUrl] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [imageReady, setimageReady] = useState(false);

  const fetchImage = async () => {
    setLoading(true);
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
    setLoading(false);
    setimageReady(true);
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setSubmitted(true);
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
        position: "relative",
        perspective: "800px",
      }}
    >
      <div
        id="controlsDiv"
        style={{
          transition: "transform 0.5s",
          transform: submitted ? "translateX(100vw)" : "translateX(0)",
        }}
      >
        <form onSubmit={handleSubmit}>
          <input
            className="textInput"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text"
          />

          <button className="btn" type="submit">
            Submit
          </button>
        </form>
      </div>

      <div
        id="loadingDiv"
        style={{
          position: "absolute",
          transition: "transform 0.5s",
          transform: loading ? "translateX(0)" : "translateX(-100vw)",
        }}
      >
        <div
          style={{
            border: "10px solid #f3f3f3",
            borderRadius: "50%",
            borderTop: "10px solid #3498db",
            width: "40px",
            height: "40px",
            animation: "spin 2s linear infinite",
          }}
        />
      </div>

      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>

      <div
        id="imageDiv"
        style={{
          border: "1px solid white",
          width: "500px",
          height: "500px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          position: "absolute",
          transition: "transform 0.5s",
          transformStyle: "preserve-3d",
          transform: imageReady
            ? "translateX(0) rotateX(20deg) rotateY(20deg)"
            : "translateX(-100vw)",

          boxShadow: "0 10px 20px 0 rgba(0,0,0,0.2)",
        }}
      >
        {imageUrl && <img src={imageUrl} alt={text} />}
      </div>
    </div>
  );
}

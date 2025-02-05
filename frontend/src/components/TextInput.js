import React, { useState } from "react";

const TextInput = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);

  const analyzeText = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error analyzing text:", error);
    }
  };

  return (
    <div className="text-analyze">
      <textarea
        className="textarea"
        placeholder="Enter your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="analyze-button" onClick={analyzeText}>
        Analyze Text
      </button>
      {result && (
        <div className="result-container">
          <h3>Analysis Result:</h3>
          <div className="result">
            <div className="score">
              <span className="label">Vectara Score:</span>
              <span className="value">{(result.vectara * 100).toFixed(2)}%</span>
            </div>
            <div className="score">
              <span className="label">Toxicity Score:</span>
              <span className="value">{(result.toxicity * 100).toFixed(2)}%</span>
            </div>
          </div>
          <p className="success-message">Text analyzed successfully!</p>
        </div>
      )}
    </div>
  );
};

export default TextInput;

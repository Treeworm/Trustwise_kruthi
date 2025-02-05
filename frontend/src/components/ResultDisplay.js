import React from "react";
import "../styles.css";

const ResultDisplay = ({ result }) => {
  return (
    <div className="result-display">
      {result ? (
        <div>
          <h3>Analysis Result:</h3>
          <p><strong>Vectara Score:</strong> {result.vectara_score}</p>
          <p><strong>Toxicity Score:</strong> {result.toxicity_score}</p>
        </div>
      ) : (
        <p>Enter text and click "Analyze" to see results.</p>
      )}
    </div>
  );
};

export default ResultDisplay;

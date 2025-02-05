import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "../styles.css";

const Analyze = () => {
  const [history, setHistory] = useState([]);
  const [activeTab, setActiveTab] = useState("trends");
  const [graphData, setGraphData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch("/api/history"); // Replace with your actual endpoint
        const data = await response.json();
        setHistory(data);
        generateGraphData(data);
      } catch (error) {
        console.error("Failed to fetch history data:", error);
      }
    };

    fetchHistory();
  }, []);

  const generateGraphData = (data) => {
    const labels = data.map((item) => item.date);
    const modelAData = data.map((item) => item.model_a_score);
    const modelBData = data.map((item) => item.model_b_score);

    setGraphData({
      labels,
      datasets: [
        {
          label: "Model A",
          data: modelAData,
          borderColor: "blue",
          backgroundColor: "rgba(0, 0, 255, 0.1)",
          pointBackgroundColor: "blue",
          fill: false,
        },
        {
          label: "Model B",
          data: modelBData,
          borderColor: "red",
          backgroundColor: "rgba(255, 0, 0, 0.1)",
          pointBackgroundColor: "red",
          fill: false,
        },
      ],
    });
  };

  return (
    <div className="analyse-container">
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === "trends" ? "active" : ""}`}
          onClick={() => setActiveTab("trends")}
        >
          Analysis Trends
        </button>
        <button
          className={`tab-button ${activeTab === "history" ? "active" : ""}`}
          onClick={() => setActiveTab("history")}
        >
          Analysis History
        </button>
      </div>

      {activeTab === "trends" && (
        <div className="trends">
          <Line
            data={graphData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "top",
                },
              },
            }}
          />
        </div>
      )}

      {activeTab === "history" && (
        <div className="history">
          <table className="history-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Model A Score</th>
                <th>Model B Score</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item, index) => (
                <tr key={index}>
                  <td>{item.date}</td>
                  <td>{item.model_a_score}</td>
                  <td>{item.model_b_score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Analyze;

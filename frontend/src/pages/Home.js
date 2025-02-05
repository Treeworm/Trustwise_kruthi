import React from "react";
import TextInput from "../components/TextInput";

const Home = () => {
  return (
    <div className="home-container">
      <header className="navbar">
        <h1 className="logo">TextAnalyzer</h1>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/analyze">Analyse</a></li>
          </ul>
        </nav>
      </header>
      <main className="main-content">
        <h2>Advanced Text Analysis</h2>
        <p>Analyze your text for Vectara similarity and toxicity scores using our cutting-edge AI technology.</p>
        <TextInput />
      </main>
    </div>
  );
};

export default Home;

import React, { useState, useEffect } from "react";
import "./Potter.css";



const Potter = () => {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState("books");
      const [loading, setLoading] = useState(false);

  const fetchPotterData = async (type) => {
    setLoading(true);
    try {
      const response = await fetch(`https://hp-api.onrender.com/api/${type}`);
      const result = await response.json();
   setData(result); 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPotterData(category);
  }, [category]);

  const renderContent = () => {
    if (loading) return <p>Loading...</p>;
    if (!data.length) return <p>No data found.</p>;

    return data.map((item, index) => (
      <div className="card" key={index}>
        {item.image && <img src={item.image} alt={item.name || item.title} />}
        <h3>{item.name || item.title}</h3>
        {item.author && <p>Author: {item.author}</p>}
        {item.house && <p>House: {item.house}</p>}
        {item.description && <p>Description: {item.description}</p>}
        {item.patronus && <p>Patronus: {item.patronus}</p>}
      </div>
    ));
  };

  return (
    <div className="app">
      <header>
        <h1>Harry Potter Universe</h1>
        <nav>
          <button onClick={() => setCategory("books")}>Books</button>
          <button onClick={() => setCategory("characters")}>Characters</button>
          <button onClick={() => setCategory("spells")}>Spells</button>
          <button onClick={() => setCategory("houses")}>Houses</button>
        </nav>
      </header>
      <main>{renderContent()}</main>
    </div>
  );
};

export default Potter;


import React, { useState } from 'react';
import './cocktail.css';  // Import the updated CSS

function Cocktail() {
  const [searchTerm, setSearchTerm] = useState('');
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDrink, setSelectedDrink] = useState(null);

  const fetchDrinks = async () => {
    if (!searchTerm) return; // Prevent empty search
    setLoading(true);

    try {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`
      );
      const data = await response.json();

      if (data.drinks) {
        setDrinks(data.drinks);
      } else {
        setDrinks([]); // No drinks found
      }
    } catch (error) {
      console.error('Error fetching drinks:', error);
    } finally {
      setLoading(false);
    }
  };
<h1>Welcome to drink world</h1>
  const fetchDrinkDetails = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      const data = await response.json();

      if (data.drinks) {
        setSelectedDrink(data.drinks[0]); // Get the first (and only) drink
      }
    } catch (error) {
      console.error('Error fetching drink details:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      {/* Search Box */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search for a cocktail..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button onClick={fetchDrinks} className="search-button">
          Search
        </button>
      </div>

      {/* Loading Indicator */}
      {loading && <p className="loading-text">Loading...</p>}

      {/* Drinks List */}
      <div className="drinks-list">
        {drinks.map((drink) => (
          <div
            key={drink.idDrink}
            onClick={() => fetchDrinkDetails(drink.idDrink)}
            className="drink-card"
          >
            <img
              src={drink.strDrinkThumb}
              alt={drink.strDrink}
              className="drink-image"
            />
            <h3 className="drink-name">{drink.strDrink}</h3>
          </div>
        ))}
        {drinks.length === 0 && !loading && (
          <p className="no-results">No drinks found. Try another search.</p>
        )}
      </div>

      {/* Drink Details */}
      {selectedDrink && (
        <div className="drink-details">
          <h2 className="drink-title">{selectedDrink.strDrink}</h2>
          <img
            src={selectedDrink.strDrinkThumb}
            alt={selectedDrink.strDrink}
            className="drink-details-image"
          />
          <p className="drink-category">
            <strong>Category:</strong> {selectedDrink.strCategory}
          </p>
          <p className="drink-instructions">
            <strong>Instructions:</strong> {selectedDrink.strInstructions}
          </p>
          <div className="ingredients">
            <p className="ingredients-title"><strong>Ingredients:</strong></p>
            {Object.keys(selectedDrink)
              .filter((key) => key.includes('strIngredient') && selectedDrink[key])
              .map((ingredientKey) => (
                <p key={ingredientKey} className="ingredient">
                  - {selectedDrink[ingredientKey]}
                </p>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Cocktail;

import React, { useState } from 'react'; // Ensure useState is imported
import { useParams } from 'react-router-dom';

const Mealinfo = () => {
  const { mealid } = useParams(); // Get meal ID from the URL
  const [info, setInfo] = useState(); // State to store meal info

  const getInfo = async () => {
    try {
      const get = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealid}`);
      const jsonData = await get.json();
      console.log(jsonData.meals[0]);
      setInfo(jsonData.meals[0]); 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  if (!info) {
    getInfo();
  }

  return (
    <div>
      {
        !info ? "Data Not Found" :
          <div className='mealInfo'>
            <img src={info.strMealThumb} alt={info.strMeal} />
            <div className='info'>
              <h1>RECIPE DETAIL</h1>
              <button>{info.strMeal}</button>
              <h3>Instructions</h3>
              <p>{info.strInstructions}</p>
            </div>
          </div>
      }
    </div>
  );
};

export default Mealinfo;

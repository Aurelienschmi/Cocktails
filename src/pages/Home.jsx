import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import axios from "axios";
import styles from '../styles/Home.module.css';

const URL_API = "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a";

const fetchDefaultDrinks = async (setDrinks, setBaseDrinks) => {
  try {
    const response = await axios.get(URL_API);
    const data = response.data.drinks;
    setDrinks(data);
    setBaseDrinks(data);
    console.log(data);
  } catch (error) {
    console.log(error);
    setDrinks([]);
    setBaseDrinks([]);
  }
};

export default function Home() {
  const [drinks, setDrinks] = useState([]);
  const [baseDrinks, setBaseDrinks] = useState([]);

  useEffect(() => {
    fetchDefaultDrinks(setDrinks, setBaseDrinks);
  }, []);

  return (
    <div className={styles.home}>
      <h2>Cocktails</h2>
      <SearchBar setDrinks={setDrinks} baseDrinks={baseDrinks} />
      <div className={styles['cocktail-list']}>
        {drinks.length > 0 ? (
          drinks.map((drink) => (
            <div key={drink.idDrink} className={styles['cocktail-item']}>
              <img src={drink.strDrinkThumb} alt={drink.strDrink} />
              <h3>{drink.strDrink}</h3>
              <p>{drink.strGlass}</p>
              <p>{drink.strAlcoholic}</p>
              <Link to={`/cocktail/${drink.idDrink}`}>Voir les details</Link>
            </div>
          ))
        ) : (
          <p>No cocktails found</p>
        )}
      </div>
    </div>
  );
}
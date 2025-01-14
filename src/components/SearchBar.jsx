import axios from 'axios';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Searchbar.module.css';

const URL_API = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

const fetchCocktails = async (query, setDrinks) => {
  try {
    const response = await axios.get(`${URL_API}${query}`);
    const data = response.data.drinks;
    setDrinks(data || []);
    console.log(data);
  } catch (error) {
    console.log(error);
    setDrinks([]);
  }
};

export default function SearchBar({ setDrinks, baseDrinks }) {
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (search === "") {
      setDrinks(baseDrinks);
    } else {
      fetchCocktails(search, setDrinks);
    }
  }, [search, setDrinks, baseDrinks]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className={styles.searchbar}>
      <form>
        <label htmlFor='search'>Rechercher un cocktail : </label>
        <input
          type='search'
          id='search'
          placeholder='Mojito, Margarita...'
          value={search}
          onChange={handleSearch}
        />
      </form>
    </div>
  );
}

SearchBar.propTypes = {
  setDrinks: PropTypes.func.isRequired,
  baseDrinks: PropTypes.array.isRequired,
};
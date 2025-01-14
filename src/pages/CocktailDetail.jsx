import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styles from '../styles/CocktailDetail.module.css';

const URL_API = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

function CocktailDetail() {
  const { id } = useParams();
  const [cocktail, setCocktail] = useState(null);

  const fetchDetailsCocktail = async (id) => {
    axios
      .get(`${URL_API}${id}`)
      .then((response) => {
        setCocktail(response.data.drinks[0]);
        console.log(response.data.drinks);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchDetailsCocktail(id);
  }, [id]);

  if (!cocktail) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <Link to={"/"} className={styles['back-link']}>Retour au menu</Link>
      <div className={styles.details}>
        <div className={styles['details-info']}>
          <h1>Cocktail: {cocktail.strDrink}</h1>
          <h2>Catégorie</h2>
          <p>{cocktail.strCategory}</p>
          <h2>Info</h2>
          <p>{cocktail.strAlcoholic}</p>
          <h2>Verre</h2>
          <p>{cocktail.strGlass}</p>
          <h2>Instructions</h2>
          <p>{cocktail.strInstructionsFR}</p>
          <h2>Ingrédients</h2>
          <ul>
            {Array.from({ length: 15 }, (_, index) => {
              const ingredient = cocktail[`strIngredient${index + 1}`];
              const measure = cocktail[`strMeasure${index + 1}`];
              return ingredient ? (
                <li key={index}>
                  {ingredient} {measure ? ` - ${measure}` : ""}
                </li>
              ) : null;
            })}
          </ul>
        </div>
        <div className={styles['details-image']}>
          <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
        </div>
      </div>
    </div>
  );
}

export default CocktailDetail;
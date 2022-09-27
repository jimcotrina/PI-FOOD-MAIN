import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes, orderByName, getHealthScore, filterDiets } from '../actions';
import { Link } from 'react-router-dom';
import SeachBar from './SearchBar';
import Card from './Card';
import Paginado from './Paginado';
import './css/Home.css';

export default function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);

  const [orden, setOrden] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage, setRecipesPerPage] = useState(9);
  const indexOfLastRecipe = currentPage + recipesPerPage; //9
  const indexOfFirtsRecipe = indexOfLastRecipe - recipesPerPage; //0
  const currentRecipes = allRecipes.slice(
    indexOfFirtsRecipe,
    indexOfLastRecipe
  );

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getRecipes());
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(`${e.target.value}`);
  }

  function handleHealthScore(e) {
    e.preventDefault();
    dispatch(getHealthScore(e.target.value));
    setCurrentPage(1);
    setOrden(e.target.value);
  }

  function handleDiets(e) {
    e.preventDefault();
    dispatch(filterDiets(e.target.value));
    setOrden(e.target.value);
    setCurrentPage(1);
  }

  return (
    <div className="all">
      <div className="header">
        <h1>HENRY FOOD</h1>
        <div className="createRecipe">
          <Link to="/recipe">CREATE RECIPE</Link>
        </div>
        <SeachBar />
      </div>
      <div>
        <div className="filters">
          <button
            onClick={(e) => {
              handleClick(e);
            }}
          >
            RELOAD ALL RECIPES
          </button>
          <select onChange={(e) => handleSort(e)}>
            <option value="A-Z">A to Z</option>
            <option value="Z-A">Z to A</option>
          </select>
          <select onChange={(e) => handleHealthScore(e)}>
            <option value="L-H">Low Health</option>
            <option value="H-L">High Health</option>
          </select>
          <select onChange={(e) => handleDiets(e)}>
            <option value="All diets">All Diets</option>
            <option value="gluten free">Gluten Free</option>
            <option value="ketogenic">ketogenic</option>
            <option value="lacto ovo vegetarian">lacto ovo vegetarian</option>
            <option value="vegan">vegan</option>
            <option value="pescatarian">pescatarian</option>
            <option value="paleolithic">paleolithic</option>
            <option value="primal">primal</option>
            <option value="whole 30">whole 30</option>
            <option value="dairy free">dairy free</option>
            <option value="fodmap friendly">fodmap friendly</option>
          </select>
          <Paginado
            recipesPerPage={recipesPerPage}
            allRecipes={allRecipes.length}
            paginado={paginado}
          />
        </div>
        <div className="grid">
          {currentRecipes?.map((el) => {
            return (
              <div>
                <Link to={'/detail/' + el.id}>
                  <Card
                    key={el.id}
                    name={el.name}
                    image={el.image} //<img src='url...'/>
                    healthScore={el.healthScore}
                    diets={el.diets}
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

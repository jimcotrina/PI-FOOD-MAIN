import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { postRecipe, getDiets } from '../actions/index';
import { useDispatch, useSelector } from 'react-redux';
import './css/RecipeCreate.css';

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = 'THE TITLE IS MISSING!!';
  } else if (!input.summary) {
    errors.summary = 'RECIPE SUMMARY MISSING!!';
  } else if (!input.healthScore) {
    errors.healthScore = 'ENTER HEALTH SCORE!!';
  }
  return errors;
}

export default function RecipeCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const dietsSelect = useSelector((state) => state.diets);
  //const listDiets = dietsSelect.map((e) => e.name);
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: '',
    summary: '',
    healthScore: '',
    image: '',
    steps: '',
    diets: [],
  });

  function handleChangue(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    console.log(input);
  }

  function handleSelect(e) {
    setInput({
      ...input,
      diets: [...input.diets, e.target.value],
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postRecipe(input));
    alert('receta creada');
    setInput({
      name: '',
      image: '',
      summary: '',
      healthScore: 0,
      steps: '',
      diets: [],
    });
    history.push('/home');
  }

  useEffect(() => {
    dispatch(getDiets());
  }, []);
  return (
    <div>
      <Link to="/home">
        <button>BACK</button>
      </Link>
      <h1>CREATE RECIPE</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>TITLE:</label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChangue(e)}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div>
          <label>HEALTH SCORE:</label>
          <input
            type="text"
            value={input.healthScore}
            name="healthScore"
            onChange={(e) => handleChangue(e)}
          />
          {errors.healthScore && <p className="error">{errors.healthScore}</p>}
        </div>
        <div>
          <label>SUMMARY:</label>
          <input
            type="text"
            value={input.summary}
            name="summary"
            onChange={(e) => handleChangue(e)}
          />
          {errors.summary && <p className="error">{errors.summary}</p>}
        </div>
        <div>
          <label>STEPS:</label>
          <input
            type="text"
            value={input.steps}
            name="steps"
            onChange={(e) => handleChangue(e)}
          />
        </div>
        <select onChange={(e) => handleSelect(e)}>
          {dietsSelect.map((d) => (
            <option value={d.name}>{d.name}</option>
          ))}
        </select>
        <ul>
          <li>{input.diets.map((el) => el + ' ,')}</li>
        </ul>
        <button type="submit">CREATE</button>
      </form>
    </div>
  );
}

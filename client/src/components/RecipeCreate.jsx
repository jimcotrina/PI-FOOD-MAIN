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
  } else if (!input.image) {
    errors.image = 'ENTER IMAGE!!';
  }
  return errors;
}

export default function RecipeCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const dietas = useSelector((state) => state.diets);
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: '',
    summary: '',
    healthScore: 0,
    image: '',
    steps: [],
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

  function handleSteps(e) {
    setInput({
      ...input,
      steps: [...input.steps, e.target.value],
    });
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
    console.log({ ...input });
    alert('SUCCESSFULLY CREATED RECIPE!!');
    setInput({
      name: '',
      image: '',
      summary: '',
      healthScore: 0,
      steps: [],
      diets: [],
    });
    history.push('/home');
  }

  useEffect(() => {
    dispatch(getDiets());
  }, []);

  return (
    <div className="container-form">
      <Link to="/home">
        <button>BACK</button>
      </Link>
      <h1>CREATE RECIPE</h1>
      <div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="title">
            <label>TITLE:</label>
            <input
              placeholder="recipe name"
              type="text"
              value={input.name}
              name="name"
              onChange={(e) => handleChangue(e)}
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
          <div className="healthScore">
            <label>HEALTH SCORE:</label>
            <h4>{input.healthScore}</h4>
            <input
              type="range"
              min="0"
              max="100"
              name="healthScore"
              onChange={(e) => handleChangue(e)}
              value={input.healthScore}
            />
            {errors.healthScore && (
              <p className="error">{errors.healthScore}</p>
            )}
          </div>
          <div className="summary">
            <label>SUMMARY:</label>
            <textarea
              placeholder="summary of your recipe"
              type="text"
              value={input.summary}
              name="summary"
              onChange={(e) => handleChangue(e)}
            />
            {errors.summary && <p className="error">{errors.summary}</p>}
          </div>
          <div className="steps">
            <label>STEPS:</label>
            <input
              placeholder="steps to follow"
              type="text"
              value={input.steps}
              name="steps"
              onChange={(e) => handleSteps(e)}
            />
          </div>
          <div className="select-diets">
            <h4>Diets: </h4>
            <select onChange={(e) => handleSelect(e)}>
              {dietas.map((d) => (
                <option value={d.name}>{d.name}</option>
              ))}
            </select>
            <ul>
              <li>{input.diets.map((el) => el + ' ,')}</li>
            </ul>
          </div>
          <button type="submit">CREATE</button>
        </form>
      </div>
    </div>
  );
}

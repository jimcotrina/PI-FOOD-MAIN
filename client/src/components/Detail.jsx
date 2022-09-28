import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail, pageDetail } from '../actions/index';
import './css/Detail.css';

export default function Detail(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
    return () => {
      dispatch(pageDetail());
    };
  }, [dispatch]);

  const myRecipe = useSelector((state) => state.detail);
  return (
    <div className="contenedor-detail">
      {myRecipe.length > 0 ? (
        <div className="contenedor-2">
          <div className="img-detail">
            <img
              src={myRecipe[0].image ? myRecipe[0].image : myRecipe[0].img}
              alt=""
            />
          </div>
          <Link to="/home">
            <button>BACK</button>
          </Link>
          <h1>{myRecipe[0].name}</h1>
          <h2>Health Score: ♥ {myRecipe[0].healthScore}</h2>
          <h2>Dishtypes: {myRecipe[0].dishTypes.join(' - ')}</h2>
          <h2>Diets: {myRecipe[0].diets.join(' - ')}</h2>
          <h2>Summary:</h2>
          <p>{myRecipe[0].summary.replaceAll(/<[^>]*>?/g, '')}</p>
          <h2>Instruccions:</h2>
          {myRecipe[0].steps?.map((e) => (
            <p>
              <strong>{e.number}</strong> - {e.step}
            </p>
          ))}
        </div>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
}

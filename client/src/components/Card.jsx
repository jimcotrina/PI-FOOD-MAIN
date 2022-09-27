import React from 'react';
import './css/Card.css';

export default function Card({ name, image, dishTypes, healthScore, diets }) {
  const dietas = diets.map((e, i) => {
    if (i === diets.length - 1) {
      return e;
    } else {
      return e + ' - ';
    }
  });

  return (
    <div className="card">
      <div className="card-details">
        <img
          className="imageCard"
          src={image}
          alt="img not found"
          width="300px"
          height="250px"
        />
        <h2>{name}</h2>
        <p>♥ {healthScore}</p>
        <h4>Diets: {dietas}</h4>
        <h4>{dishTypes}</h4>
      </div>
    </div>
  );
}

import React from 'react';
import './css/Card.css';

export default function Card({ name, image, healthScore, diets }) {
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
        <h4>Diets: {diets.join(' - ')}</h4>
      </div>
    </div>
  );
}

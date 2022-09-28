import React from 'react';
import { Link } from 'react-router-dom';
import './css/LandingPage.css';

export default function LandingPage() {
  return (
    <div className="landing-page">
      <div className="title-lp">
        <h1>HENRY FOOD</h1>
      </div>
      <div>
        <Link to="/home">
          <button className="button-lp">ENTER</button>
        </Link>
      </div>
    </div>
  );
}

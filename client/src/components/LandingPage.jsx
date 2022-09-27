import React from 'react';
import { Link } from 'react-router-dom';
import './css/LandingPage.css';

export default function LandingPage() {
  return (
    <div className="landing-page">
      <div className="title-lp">
        <h1>Welcome</h1>
      </div>
      <Link to="/home">
        <button>Ingresar</button>
      </Link>
    </div>
  );
}

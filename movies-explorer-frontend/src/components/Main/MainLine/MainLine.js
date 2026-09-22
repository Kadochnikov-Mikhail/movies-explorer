import React from 'react';
import './MainLine.css';

function MainLine({ text }) {
  return (
    <div className="main-line">
      <h2 className="main-line__text">{text}</h2>
    </div>
  );
}

export default MainLine;

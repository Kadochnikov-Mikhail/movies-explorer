import React from 'react';
import './BlueColor.css';
import Header from '../../Header/Header';
import Promo from '../Promo/Promo';

function BlueColor({ handleClick, loggedIn }) {
  return (
    <div className="blue-color">
      <Header isActive={loggedIn} />
      <Promo handleClick={handleClick} />
    </div>
  );
}

export default BlueColor;

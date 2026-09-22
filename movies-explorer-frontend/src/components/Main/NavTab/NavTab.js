import React from 'react';
import './NavTab.css';

function NavTab() {
  return (
    <div className="nav-tab">
      <div className="promo__info">
        <div className="promo__text">
          <h1 className="promo__text-title">
            Учебный проект студента факультета Веб-разработки.
          </h1>
          <p className="promo__text-pharagraph">
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </p>
        </div>
        <div className="promo__logo"></div>
      </div>
      <button className="promo__button">Узнать больше</button>
    </div>
  );
}

export default NavTab;

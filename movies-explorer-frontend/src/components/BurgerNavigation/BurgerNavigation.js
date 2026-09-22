import React, { useState } from 'react';
import './BurgerNavigation.css';
import Menu from './Menu/Menu';

function BurgerNavigation() {
  const [isNavOpen, setNavOpen] = useState(false);

  function toggleMenuState() {
    setNavOpen((isOpen) => !isOpen);
  }

  return (
    <div className="burger">
      <button
        type="button"
        className="burger__button"
        onClick={toggleMenuState}
      ></button>

      <Menu isOpen={isNavOpen} onClose={toggleMenuState} />
    </div>
  );
}

export default BurgerNavigation;

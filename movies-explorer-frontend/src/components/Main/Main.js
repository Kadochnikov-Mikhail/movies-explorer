import React from 'react';
import './Main.css';

import BlueColor from './BlueColor/BlueColor';
import AboutProject from './AboutProject/AboutProject';
import Techs from './Techs/Techs';
import AboutMe from './AboutMe/AboutMe';
import Portfolio from './Portfolio/Portfolio';
import Footer from '../Footer/Footer';

function Main({ loggedIn }) {
  const myRef = React.useRef(null);

  function handleClick() {
    myRef.current.scrollIntoView();
  }

  return (
    <div className="main">
      <BlueColor handleClick={handleClick} loggedIn={loggedIn} />
      <AboutProject ref={myRef} />
      <Techs />
      <AboutMe />
      <Portfolio />
      <Footer />
    </div>
  );
}

export default Main;

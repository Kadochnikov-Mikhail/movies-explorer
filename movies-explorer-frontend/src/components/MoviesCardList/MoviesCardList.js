import React, { useEffect, useState } from 'react';
import './MoviesCardList.css';

import MoviesCard from '../MoviesCard/MoviesCard';
import EvenMore from './EvenMore/EvenMore';
import {
  MAX_NUMBER_OF_CARDS_1280,
  ADDED_NUMBER_OF_CARDS_1280,
  MAX_NUMBER_OF_CARDS_768,
  ADDED_NUMBER_OF_CARDS_768,
  MAX_NUMBER_OF_CARDS_320,
  ADDED_NUMBER_OF_CARDS_320,
} from '../../utils/constants';
import { useWindowSize } from '../../customHooks/defineWindowSize';

function MoviesCardList({
  movies,
  isOpenSavedMovies = false,
  onButtonSaveMovieClick,
  onButtonDeleteMovieClick,
}) {
  const [numberOfCard, setNumberOfCard] = useState(0);
  const [addedNumberOfCard, setAddedNumberOfCard] = useState(0);
  const [isButtonEvenMoreVisible, setButtonEvenMoreVisible] = useState(false);

  const [width] = useWindowSize();

  useEffect(() => {
    if (movies.length > numberOfCard) {
      setButtonEvenMoreVisible(true);
    } else {
      setButtonEvenMoreVisible(false);
    }
  }, [numberOfCard, movies.length]);

  useEffect(() => {
    if (width > 1279) {
      setNumberOfCard(MAX_NUMBER_OF_CARDS_1280);
      setAddedNumberOfCard(ADDED_NUMBER_OF_CARDS_1280);
    } else if (width > 635) {
      setNumberOfCard(MAX_NUMBER_OF_CARDS_768);
      setAddedNumberOfCard(ADDED_NUMBER_OF_CARDS_768);
    } else {
      setNumberOfCard(MAX_NUMBER_OF_CARDS_320);
      setAddedNumberOfCard(ADDED_NUMBER_OF_CARDS_320);
    }
  }, [width]);

  function addCards() {
    setNumberOfCard((currentNumber) => currentNumber + addedNumberOfCard);
  }

  return (
    <div className="cards">
      <div className="card-list">
        {movies.slice(0, numberOfCard).map((item) => (
          <div className="card-item" key={item.movieId}>
            <MoviesCard
              movie={item}
              isOpenSavedMovies={isOpenSavedMovies}
              onButtonSaveMovieClick={onButtonSaveMovieClick}
              onButtonDeleteMovieClick={onButtonDeleteMovieClick}
            />
          </div>
        ))}
      </div>

      {!isOpenSavedMovies && isButtonEvenMoreVisible && (
        <EvenMore onClick={addCards} />
      )}
    </div>
  );
}

export default MoviesCardList;

import './SavedMovies.css';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import NotFound from '../NotFound/NotFound';
import ServerError from '../ServerError/ServerError';

function SavedMovies({
  movies,
  initMovies,
  isOpenSavedMovies,
  onButtonSearchClick,
  loading,
  isDataFound,
  onButtonDeleteMovieClick,
  isDataEmpty,
  isSomethingWrong,
}) {
  return (
    <div className="saved-movies">
      <div className="saved-movies__top">
        <Header isActive />

        <SearchForm onClick={onButtonSearchClick} isShort />

        {isSomethingWrong && <ServerError />}

        {loading && <Preloader />}

        {isDataFound &&
          (initMovies.length === 0 ? (
            <p className="saved-movies__empty">Пока нет сохранённых фильмов</p>
          ) : isDataEmpty ? (
            <NotFound />
          ) : (
            <MoviesCardList
              movies={movies}
              isOpenSavedMovies={isOpenSavedMovies}
              onButtonDeleteMovieClick={onButtonDeleteMovieClick}
            />
          ))}
      </div>

      <Footer />
    </div>
  );
}

export default SavedMovies;

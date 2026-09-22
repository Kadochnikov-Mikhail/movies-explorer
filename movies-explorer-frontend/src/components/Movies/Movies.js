import './Movies.css';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import NotFound from '../NotFound/NotFound';
import ServerError from '../ServerError/ServerError';

function Movies({
  movies,
  onButtonSearchClick,
  loading,
  isDataFound,
  onButtonSaveMovieClick,
  onButtonDeleteMovieClick,
  keywords,
  isShort,
  isDataEmpty,
  isSomethingWrong,
}) {
  return (
    <div className="movies">
      <div className="movies__top">
        <Header isActive />

        <SearchForm
          onClick={onButtonSearchClick}
          keywords={keywords}
          isShort={isShort}
        />

        {isSomethingWrong && <ServerError />}

        {loading && <Preloader />}

        {isDataFound &&
          (isDataEmpty ? (
            <NotFound />
          ) : (
            <MoviesCardList
              movies={movies}
              onButtonSaveMovieClick={onButtonSaveMovieClick}
              onButtonDeleteMovieClick={onButtonDeleteMovieClick}
            />
          ))}
      </div>

      <Footer />
    </div>
  );
}

export default Movies;

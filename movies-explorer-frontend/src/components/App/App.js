import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';

import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Error from '../Error/Error';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Preloader from '../Preloader/Preloader';

import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import { filterMoviesArray, markSavedMovies } from '../../utils/utils';
import {
  registerErrors,
  profileErrors,
  loginErrors,
} from '../../utils/errorMessage';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { usePathname } from '../../customHooks/pathname';

function App() {
  const [movies, setMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isMovieFound, setMovieFound] = useState(false);
  const [isSavedMovieFound, setSavedMovieFound] = useState(false);

  const [isMoviesDataEmpty, setMoviesDataEmpty] = useState(false);
  const [isSavedMoviesDataEmpty, setSavedMoviesDataEmpty] = useState(false);

  const [isSomethingWrongMovies, setSomethingWrongMovies] = useState(false);
  const [isSomethingWrongSavedMovies, setSomethingWrongSavedMovies] =
    useState(false);

  const [errorReg, setErrorReg] = useState('');
  const [errorLog, setErrorLog] = useState('');
  const [infoProf, setInfoProf] = useState({});

  const [loggedIn, setLoggedIn] = useState(false);
  const [isTokenValidated, setIsTokenValidated] = useState(false);

  const [currentUser, setCurrentUser] = useState({
    name: '',
    email: '',
  });

  const [currentSavedMovies, setCurrentSavedMovies] = useState([]);
  const [keywordsMovies, setKeywordsMovies] = useState('');
  const [keywordsSavedMovies, setKeywordsSavedMovies] = useState('');

  const [isShortSavedMovieSuitable, setShortSavedMovieSuitable] =
    useState(false);
  const [isShortMovieSuitable, setShortMovieSuitable] = useState(false);

  const history = useHistory();
  const url = usePathname();

  useEffect(() => {
    if (url === '/saved-movies') {
      setKeywordsSavedMovies('');
      setSavedMovies(currentSavedMovies);
    }
  }, [url, currentSavedMovies]);

  useEffect(() => {
    const jwt = localStorage.getItem('token');

    if (jwt) {
      mainApi
        .getContent(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .then(() => setIsTokenValidated(true));
    } else {
      setIsTokenValidated(true);
    }

    moviesApi
      .getMovies()
      .then((moviesData) => {
        setSomethingWrongMovies(false);
        setAllMovies(formMoviesData(moviesData));
      })
      .catch((err) => {
        setSomethingWrongMovies(true);
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (!loggedIn) {
      return;
    }

    Promise.all([mainApi.getUser(), mainApi.getSavedMovies()])
      .then(([userData, savedMoviesData]) => {
        setSomethingWrongSavedMovies(false);
        setCurrentUser(userData.user);
        setCurrentSavedMovies(savedMoviesData.movies);
        setSavedMovieFound(true);
        setSavedMovies(savedMoviesData.movies);
      })
      .catch((err) => {
        setSomethingWrongSavedMovies(true);
        console.log(err);
      });

    const initialKeywordsMovies = localStorage.getItem('keywords');

    if (initialKeywordsMovies) {
      setKeywordsMovies(initialKeywordsMovies);
    }

    const initialMoviesData = localStorage.getItem('initialMovies');

    if (initialMoviesData) {
      setMovies(JSON.parse(initialMoviesData));
      setMovieFound(true);
    }

    const initialShortMoviesData = localStorage.getItem('shortMovie');

    if (initialShortMoviesData) {
      setShortMovieSuitable(JSON.parse(initialShortMoviesData));
    }
  }, [loggedIn]);

  useEffect(() => {
    if (isMovieFound) {
      setMovies((currentMovies) =>
        markSavedMovies(currentMovies, currentSavedMovies)
      );
    }
  }, [currentSavedMovies, isMovieFound]);

  useEffect(() => {
    setSavedMovies(
      filterMoviesArray(
        isShortSavedMovieSuitable,
        currentSavedMovies,
        keywordsSavedMovies
      )
    );
  }, [currentSavedMovies, isShortSavedMovieSuitable, keywordsSavedMovies]);

  function formMoviesData(moviesArray) {
    return moviesArray.map((item) => ({
      country: item.country || 'unknown country',
      director: item.director || 'unknown director',
      duration: item.duration || 'unknown duration',
      year: item.year || 'unknown year',
      description: item.description || 'unknown description',
      image: `https://api.nomoreparties.co${item.image.url}`,
      trailerLink: item.trailerLink || 'https://www.youtube.com',
      nameRU: item.nameRU || 'unknown nameRU',
      nameEN: item.nameEN || 'unknown nameEN',
      thumbnail: `https://api.nomoreparties.co${item.image.formats.thumbnail.url}`,
      movieId: item.id || 'unknown director',
      isSaved: false,
    }));
  }

  function getMoviesData(keywordsData, shortData) {
    setMovies([]);
    localStorage.setItem('keywords', keywordsData);
    localStorage.setItem('shortMovie', shortData);

    setKeywordsMovies(keywordsData);
    setShortMovieSuitable(shortData);
    setMovieFound(true);
    setLoading(true);
    setMoviesDataEmpty(false);

    const suitableMovies = filterMoviesArray(
      shortData,
      allMovies,
      keywordsData,
      currentSavedMovies
    );

    if (suitableMovies.length === 0) {
      setMoviesDataEmpty(true);
    } else {
      setMovies(suitableMovies);
      localStorage.setItem('initialMovies', JSON.stringify(suitableMovies));
    }

    setSomethingWrongMovies(false);
    setLoading(false);
  }

  function handleRegister(name, email, password) {
    mainApi
      .register(name, email, password)
      .then(() => {
        handleLogin(email, password);
      })
      .catch((err) => {
        if (err.statusCode === 409) {
          setErrorReg(registerErrors.emailError);
        } else {
          setErrorReg(registerErrors.genError);
        }
      });
  }

  function handleLogin(email, password) {
    mainApi
      .login(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          setLoggedIn(true);
          history.push('/movies');
        }
      })
      .catch((err) => {
        if (err.statusCode === 401) {
          setErrorLog(loginErrors.wrongData);
        } else if (err.statusCode === 400) {
          setErrorLog(loginErrors.invalidToken);
        } else {
          setErrorLog(loginErrors.incorrectToken);
        }
      });
  }

  function handleProfile({ name, email }) {
    mainApi
      .patchUserData({ name, email })
      .then((data) => {
        setCurrentUser({
          name: data.user.name,
          email: data.user.email,
        });

        setInfoProf({
          type: 'success',
          text: 'Профиль успешно обновлен',
        });
      })
      .catch((err) => {
        if (err.statusCode === 409) {
          setInfoProf({
            type: 'error',
            text: profileErrors.emailError,
          });
        } else {
          setInfoProf({
            type: 'error',
            text: profileErrors.genError,
          });
        }
      });
  }

  function handleProfileSignOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('keywords');
    localStorage.removeItem('initialMovies');
    localStorage.removeItem('shortMovie');

    history.push('/');

    setLoggedIn(false);
    setMovieFound(false);
    setSavedMovieFound(false);
    setKeywordsMovies('');
    setMovies([]);
    setSavedMovies([]);
    setCurrentSavedMovies([]);
    setShortMovieSuitable(false);
  }

  function handleButtonSaveMovie(data) {
    mainApi
      .postSavedMovie(data)
      .then((data) => {
        setCurrentSavedMovies([data.movie, ...currentSavedMovies]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleButtonDeleteMovie(movieId) {
    mainApi
      .deleteMovie(movieId)
      .then((data) => {
        setCurrentSavedMovies(
          currentSavedMovies.filter((item) => item.movieId !== data.movieId)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getSavedMoviesData(keywordsData, shortData) {
    setSavedMovies([]);
    setLoading(true);
    setSavedMoviesDataEmpty(false);
    setSavedMovieFound(true);
    setKeywordsSavedMovies(keywordsData);
    setShortSavedMovieSuitable(shortData);

    const suitableMovies = filterMoviesArray(
      shortData,
      currentSavedMovies,
      keywordsData
    );

    if (suitableMovies.length === 0) {
      setSavedMoviesDataEmpty(true);
    } else {
      setSavedMovies(suitableMovies);
    }

    setSomethingWrongMovies(false);
    setLoading(false);
  }

  function clearErrorMessages() {
    if (Object.keys(infoProf).length !== 0) {
      setInfoProf({});
    }

    if (errorReg) {
      setErrorReg('');
    }

    if (errorLog) {
      setErrorLog('');
    }
  }

  if (!isTokenValidated) {
    return <Preloader />;
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root" onClick={clearErrorMessages}>
        <Switch>
          <Route path="/signup">
            {loggedIn ? (
              <Redirect to="/movies" />
            ) : (
              <Register onRegSubmit={handleRegister} error={errorReg} />
            )}
          </Route>

          <Route path="/signin">
            {loggedIn ? (
              <Redirect to="/movies" />
            ) : (
              <Login handleLogin={handleLogin} error={errorLog} />
            )}
          </Route>

          <Route exact path="/">
            <Main loggedIn={loggedIn} />
          </Route>

          <ProtectedRoute
            path="/profile"
            loggedIn={loggedIn}
            handleProfile={handleProfile}
            info={infoProf}
            handleSignOut={handleProfileSignOut}
            component={Profile}
          />

          <ProtectedRoute
            path="/movies"
            loggedIn={loggedIn}
            movies={movies}
            onButtonSearchClick={getMoviesData}
            loading={loading}
            isDataFound={isMovieFound}
            keywords={keywordsMovies}
            onButtonSaveMovieClick={handleButtonSaveMovie}
            onButtonDeleteMovieClick={handleButtonDeleteMovie}
            isShort={isShortMovieSuitable}
            isDataEmpty={isMoviesDataEmpty}
            isSomethingWrong={isSomethingWrongMovies}
            component={Movies}
          />

          <ProtectedRoute
            path="/saved-movies"
            loggedIn={loggedIn}
            initMovies={currentSavedMovies}
            movies={savedMovies}
            onButtonSearchClick={getSavedMoviesData}
            loading={loading}
            isDataFound={isSavedMovieFound}
            onButtonDeleteMovieClick={handleButtonDeleteMovie}
            isOpenSavedMovies
            isDataEmpty={isSavedMoviesDataEmpty}
            isSomethingWrong={isSomethingWrongSavedMovies}
            component={SavedMovies}
          />

          <Route path="*">
            <Error />
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

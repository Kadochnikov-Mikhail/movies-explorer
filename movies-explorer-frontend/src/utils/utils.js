import { SHORT_FILM_DURATION } from './constants';

export function filterMoviesArray(
  isShort,
  moviesArray,
  keywords,
  savedMoviesArray = []
) {
  const normalizedKeywords = keywords.replace(/\s{2,}/g, ' ').trim();

  let resultMovies;

  if (normalizedKeywords === '') {
    resultMovies =
      savedMoviesArray.length !== 0
        ? markSavedMovies(moviesArray, savedMoviesArray)
        : moviesArray;
  } else {
    const keywordsArr = normalizedKeywords
      .split(' ')
      .map((item) => item.toLowerCase());

    const regExp = new RegExp(keywordsArr.join('|'));

    resultMovies =
      savedMoviesArray.length !== 0
        ? markSavedMovies(
            moviesArray.filter((item) =>
              regExp.test(item.nameRU.toLowerCase())
            ),
            savedMoviesArray
          )
        : moviesArray.filter((item) => regExp.test(item.nameRU.toLowerCase()));
  }

  if (isShort) {
    return resultMovies.filter((item) => item.duration <= SHORT_FILM_DURATION);
  }

  return resultMovies;
}

export function markSavedMovies(moviesArray, savedMoviesArray) {
  return moviesArray.map((item) => {
    const resultItem = item;

    resultItem.isSaved = false;

    for (let i = 0; i < savedMoviesArray.length; i += 1) {
      if (item.movieId === savedMoviesArray[i].movieId) {
        resultItem.isSaved = true;
        resultItem._id = savedMoviesArray[i]._id;
        break;
      }
    }

    return resultItem;
  });
}

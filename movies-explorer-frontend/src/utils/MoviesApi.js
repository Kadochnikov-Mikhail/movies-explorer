import { moviesUrl } from './constants';

class MoviesApi {
  constructor(moviesUrl) {
    this._moviesUrl = moviesUrl;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  }

  getMovies() {
    return fetch(this._moviesUrl).then(this._getResponseData);
  }
}

const moviesApi = new MoviesApi(moviesUrl);

export default moviesApi;

import { mainUrl } from './constants';

class MainApi {
  constructor(mainUrl) {
    this._mainUrl = mainUrl;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }

    const error = new Error(`Ошибка: ${res.status}`);
    error.statusCode = res.status;

    return Promise.reject(error);
  }

  register(name, email, password) {
    return fetch(`${this._mainUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password,
        email,
        name,
      }),
    }).then(this._getResponseData);
  }

  login(email, password) {
    return fetch(`${this._mainUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password,
        email,
      }),
    }).then(this._getResponseData);
  }

  getUser() {
    return fetch(`${this._mainUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then(this._getResponseData);
  }

  patchUserData(newData) {
    return fetch(`${this._mainUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: newData.name,
        email: newData.email,
      }),
    }).then(this._getResponseData);
  }

  getSavedMovies() {
    return fetch(`${this._mainUrl}/movies`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then(this._getResponseData);
  }

  postSavedMovie(data) {
    return fetch(`${this._mainUrl}/movies`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: data.image,
        trailerLink: data.trailerLink,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
        thumbnail: data.thumbnail,
        movieId: data.movieId,
      }),
    }).then(this._getResponseData);
  }

  deleteMovie(movieId) {
    return fetch(`${this._mainUrl}/movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    }).then(this._getResponseData);
  }

  getContent(token) {
    return fetch(`${this._mainUrl}/users/me`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());
  }
}

const mainApi = new MainApi(mainUrl);

export default mainApi;

import React, { useEffect, useState } from 'react';
import './SearchForm.css';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';

function SearchForm({ onClick, keywords = '', isShort }) {
  const [film, setFilm] = useState(keywords);
  const [filmError, setFilmError] = useState('');
  const [filmDirty, setFilmDirty] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [isShortSuitable, setShortSuitable] = useState(isShort);

  function handleFilmChange(e) {
    const value = e.target.value;

    setFilm(value);

    if (value.length === 0) {
      setFilmError('');
      onClick('', isShortSuitable);
    } else {
      setFilmError('');
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    onClick(film, isShortSuitable);
  }

  function handleShortChange(value) {
    setShortSuitable(value);
    onClick(film, value);
  }

  function handleBlur(e) {
    if (e.target.name === 'film') {
      setFilmDirty(true);
    }
  }

  useEffect(() => {
    setFormValid(!filmError);
  }, [filmError]);

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-form__find">
        <label className="search-form__field">
          <input
            id="film-input"
            type="text"
            className="search-form__input"
            name="film"
            required
            placeholder="Фильм"
            value={film}
            onChange={handleFilmChange}
            onBlur={handleBlur}
          />

          <span
            className={`search-form__error ${
              filmDirty && filmError ? 'search-form__error_show' : ''
            }`}
          >
            {filmError}
          </span>
        </label>

        <button
          type="submit"
          className={`search-form__button ${
            !formValid || !film ? 'search-form__button_disabled' : ''
          }`}
          disabled={!formValid || !film}
        >
          Найти
        </button>
      </div>

      <FilterCheckbox onCheckBoxClick={handleShortChange} initState={isShort} />
    </form>
  );
}

export default SearchForm;

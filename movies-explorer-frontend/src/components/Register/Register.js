import { useEffect } from 'react';
import './Register.css';

import Logo from '../Logo/Logo';
import { Link } from 'react-router-dom';
import validator from 'validator';
import { useFormWithValidation } from '../../customHooks/validation';

function Register({ onRegSubmit, error }) {
  const { values, handleChange, resetForm, errors, isValid } =
    useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();

    if (!values.name || !validator.isEmail(values.email) || !values.pass) {
      return;
    }

    onRegSubmit(values.name, values.email, values.pass);
  }

  useEffect(() => {
    resetForm({}, {}, false);
  }, [resetForm]);

  return (
    <section className="register">
      <div className="register__container">
        <Logo />

        <form
          className="register__form"
          name="register"
          onSubmit={handleSubmit}
        >
          <h2 className="register__greeting">Добро пожаловать!</h2>

          <label className="register__form-field">
            Имя
            <input
              id="register-name-input"
              type="text"
              className="register__input"
              name="name"
              required
              placeholder="Имя"
              minLength="2"
              maxLength="30"
              value={values.name || ''}
              onChange={handleChange}
            />
            <span className="register__error-validation register__error-validation_show">
              {errors.name || ''}
            </span>
          </label>

          <label className="register__form-field">
            Email
            <input
              id="register-email-input"
              type="email"
              className="register__input"
              name="email"
              required
              placeholder="Email"
              value={values.email || ''}
              onChange={handleChange}
            />
            <span className="register__error-validation register__error-validation_show">
              {values.email
                ? validator.isEmail(values.email)
                  ? ''
                  : 'Некорректный email'
                : errors.email || ''}
            </span>
          </label>

          <label className="register__form-field">
            Пароль
            <input
              id="register-password-input"
              type="password"
              className="register__input"
              name="pass"
              required
              placeholder="Пароль"
              value={values.pass || ''}
              onChange={handleChange}
            />
            <span className="register__error-validation register__error-validation_show">
              {errors.pass || ''}
            </span>
          </label>

          <label className="register__submit">
            <span className="register__error register__error_show">
              {error || ''}
            </span>

            <button
              className={`register__button ${
                !isValid ? 'register__button_disabled' : ''
              }`}
              type="submit"
              disabled={!isValid}
            >
              Зарегистрироваться
            </button>
          </label>

          <div className="register__caption">
            <p className="register__caption-text">Уже зарегистрированы?</p>

            <Link to="/signin" className="register__caption-link">
              Войти
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Register;

import { useEffect } from 'react';
import './Login.css';

import Logo from '../Logo/Logo';
import { Link } from 'react-router-dom';
import validator from 'validator';
import { useFormWithValidation } from '../../customHooks/validation';

function Login({ handleLogin, error }) {
  const { values, handleChange, resetForm, errors, isValid } =
    useFormWithValidation();

  useEffect(() => {
    resetForm({}, {}, false);
  }, [resetForm]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!values.email || !values.pass) {
      return;
    }

    handleLogin(values.email, values.pass);
  }

  return (
    <section className="login">
      <div className="login__container">
        <Logo />

        <form className="login__form" name="login" onSubmit={handleSubmit}>
          <h2 className="login__greeting">Рады видеть!</h2>

          <label className="login__form-field">
            Email
            <input
              id="login-email-input"
              type="email"
              className="login__input"
              name="email"
              required
              placeholder="Email"
              value={values.email || ''}
              onChange={handleChange}
            />
            <span className="login__error-validation login__error-validation_show">
              {values.email
                ? validator.isEmail(values.email)
                  ? ''
                  : 'Некорректный email'
                : errors.email || ''}
            </span>
          </label>

          <label className="login__form-field">
            Password
            <input
              id="login-password-input"
              type="password"
              className="login__input"
              name="pass"
              required
              placeholder="Пароль"
              minLength="2"
              value={values.pass || ''}
              onChange={handleChange}
            />
            <span className="login__error-validation login__error-validation_show">
              {errors.pass || ''}
            </span>
          </label>

          <label className="login__submit">
            <span className="login__error login__error_show">
              {error || ''}
            </span>

            <button
              className={`login__button ${
                !isValid ? 'login__button_disabled' : ''
              }`}
              type="submit"
              disabled={!isValid}
            >
              Войти
            </button>
          </label>

          <div className="login__caption">
            <p className="login__caption-text">Ещё не зарегистрированы?</p>

            <Link to="/signup" className="login__caption-link">
              Регистрация
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Login;

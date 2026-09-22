import { NavLink } from 'react-router-dom';
import './Menu.css';

function Menu({ isOpen, onClose }) {
  return (
    <div className={`menu ${isOpen ? 'menu_opened' : ''}`}>
      <div className="menu__container">
        <button
          type="button"
          className="menu__close-button"
          onClick={onClose}
          aria-label="Закрыть меню"
        ></button>

        <div className="menu__links">
          <nav className="menu__nav">
            <NavLink
              to="/"
              className="menu__link"
              exact
              activeClassName="menu__link_active"
              onClick={onClose}
            >
              Главная
            </NavLink>

            <NavLink
              to="/movies"
              className="menu__link"
              exact
              activeClassName="menu__link_active"
              onClick={onClose}
            >
              Фильмы
            </NavLink>

            <NavLink
              to="/saved-movies"
              className="menu__link"
              exact
              activeClassName="menu__link_active"
              onClick={onClose}
            >
              Сохраненные фильмы
            </NavLink>
          </nav>

          <NavLink
            to="/profile"
            className="menu__link-profile"
            onClick={onClose}
          >
            Аккаунт
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Menu;

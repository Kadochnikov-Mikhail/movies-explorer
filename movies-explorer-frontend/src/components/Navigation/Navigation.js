import { NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  return (
    <nav className="navigation">
      <div className="navigation__links">
        <NavLink
          to="/movies"
          className="navigation__link"
          exact
          activeClassName="navigation__link_active"
        >
          Фильмы
        </NavLink>

        <NavLink
          to="/saved-movies"
          className="navigation__link"
          exact
          activeClassName="navigation__link_active"
        >
          Сохраненные фильмы
        </NavLink>
      </div>

      <NavLink to="/profile" className="navigation__link-profile">
        Аккаунт
      </NavLink>
    </nav>
  );
}

export default Navigation;

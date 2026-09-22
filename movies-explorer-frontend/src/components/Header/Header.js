import { Link, useHistory } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import BurgerNavigation from '../BurgerNavigation/BurgerNavigation';
import Logo from '../Logo/Logo';
import { useWindowSize } from '../../customHooks/defineWindowSize';
import './Header.css';

function Header({ isActive }) {
  const history = useHistory();
  const [width] = useWindowSize();

  function onButtonSignInClick() {
    history.push('/signin');
  }

  return (
    <header className="header">
      <Logo />

      {isActive && (width > 768 ? <Navigation /> : <BurgerNavigation />)}

      <div className={`header__inter ${isActive ? 'header__inter_hide' : ''}`}>
        <Link to="/signup" className="header__text">
          Регистрация
        </Link>

        <button
          type="button"
          className="header__button-signin"
          onClick={onButtonSignInClick}
        >
          Войти
        </button>
      </div>
    </header>
  );
}

export default Header;

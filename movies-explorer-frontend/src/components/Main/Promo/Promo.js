import './Promo.css';

function Promo({ handleClick }) {
  return (
    <div className="promo">
      <div className="promo__info">
        <div className="promo__text">
          <h1 className="promo__text-title">
            Movies Explorer — приложение для поиска и сохранения фильмов.
          </h1>

          <p className="promo__text-paragraph">
            Поиск фильмов, фильтрация по длительности и сохранение понравившихся
            фильмов в личную коллекцию.
          </p>
        </div>

        <div className="promo__logo"></div>
      </div>

      <button type="button" className="promo__button" onClick={handleClick}>
        Узнать больше
      </button>
    </div>
  );
}

export default Promo;

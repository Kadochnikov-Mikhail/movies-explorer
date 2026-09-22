import './AboutMe.css';
import MainLine from '../MainLine/MainLine';

function AboutMe() {
  return (
    <div className="about-me">
      <MainLine text="Обо мне" />

      <div className="about-me__info">
        <div className="about-me__text">
          <h2 className="about-me__name">Михаил</h2>

          <p className="about-me__about">Junior Go / React Developer</p>

          <p className="about-me__desc">
            Разрабатываю веб-приложения на Go и React. Работаю с REST API, HTTP,
            JSON, базами данных и внешними API. В backend использую middleware,
            интерфейсы, dependency injection и unit-тестирование. На frontend
            работаю с React, JavaScript, HTML и CSS. Использую Git, Docker и
            CI/CD для разработки и деплоя проектов.
          </p>

          <div className="about-me__links">
            <a
              href="https://github.com/Kadochnikov-Mikhail"
              target="_blank"
              rel="noreferrer"
              className="about-me__link"
            >
              Github
            </a>

            <a
              href="https://t.me/Mihoooil"
              target="_blank"
              rel="noreferrer"
              className="about-me__link"
            >
              Telegram
            </a>
          </div>
        </div>

        <div className="about-me__img"></div>
      </div>
    </div>
  );
}

export default AboutMe;

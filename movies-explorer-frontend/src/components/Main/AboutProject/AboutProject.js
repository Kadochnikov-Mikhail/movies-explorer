import React from 'react';
import './AboutProject.css';
import MainLine from '../MainLine/MainLine';

const AboutProject = React.forwardRef((_, ref) => (
  <div className="about-project" ref={ref}>
    <MainLine text="О проекте" />

    <div className="about-project__info">
      <div className="about-project__text">
        <h2 className="about-project__text-title">Сначала Express</h2>

        <p className="about-project__text-paragraph">
          Первая версия backend была реализована на Express.js с MongoDB,
          авторизацией пользователей и REST API.
        </p>
      </div>

      <div className="about-project__text">
        <h2 className="about-project__text-title">Затем Go</h2>

        <p className="about-project__text-paragraph">
          Backend был переписан на Go, чтобы применить знания о REST API,
          middleware, HTTP и работе с базой данных.
        </p>
      </div>
    </div>

    <div className="about-project__scale">
      <div className="about-project__scale-back">
        <div className="about-project__ceil about-project__ceil_gray">
          Express.js
        </div>
        <p className="about-project__caption">Предыдущая версия</p>
      </div>

      <div className="about-project__scale-front">
        <div className="about-project__ceil">Go</div>
        <p className="about-project__caption">Текущая версия</p>
      </div>
    </div>
  </div>
));

export default AboutProject;

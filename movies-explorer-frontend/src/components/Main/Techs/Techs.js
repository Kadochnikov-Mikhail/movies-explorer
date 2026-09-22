import './Techs.css';
import MainLine from '../MainLine/MainLine';

function Techs() {
  return (
    <div className="techs">
      <MainLine text="Технологии" />

      <h2 className="techs__title">8 технологий</h2>

      <p className="techs__paragraph">
        В проекте используются технологии для разработки frontend, backend и
        взаимодействия с API.
      </p>

      <ul className="techs__list">
        <li className="techs__item">HTML</li>
        <li className="techs__item">CSS</li>
        <li className="techs__item">JavaScript</li>
        <li className="techs__item">React</li>
        <li className="techs__item">Go</li>
        <li className="techs__item">REST API</li>
        <li className="techs__item">MongoDB</li>
        <li className="techs__item">Git</li>
      </ul>
    </div>
  );
}

export default Techs;

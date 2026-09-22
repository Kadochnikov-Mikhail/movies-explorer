import './Portfolio.css';

function Portfolio() {
  return (
    <div className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>

      <a
        href="https://github.com/Kadochnikov-Mikhail/github-insights"
        target="_blank"
        rel="noreferrer"
        className="portfolio__link"
      >
        <p className="portfolio__text">GitHub Insights</p>
        <div className="portfolio__ico"></div>
      </a>

      <a
        href="https://github.com/Kadochnikov-Mikhail/mesto"
        target="_blank"
        rel="noreferrer"
        className="portfolio__link"
      >
        <p className="portfolio__text">Mesto</p>
        <div className="portfolio__ico"></div>
      </a>

      <a
        href="https://github.com/Kadochnikov-Mikhail/movies-explorer"
        target="_blank"
        rel="noreferrer"
        className="portfolio__link"
      >
        <p className="portfolio__text">Movies Explorer</p>
        <div className="portfolio__ico"></div>
      </a>
    </div>
  );
}

export default Portfolio;

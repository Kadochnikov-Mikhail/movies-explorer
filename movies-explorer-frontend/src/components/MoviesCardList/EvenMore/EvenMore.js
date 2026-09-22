import './EvenMore.css';

function EvenMore({ onClick }) {
  return (
    <button type="button" className="even-more" onClick={onClick}>
      Еще
    </button>
  );
}

export default EvenMore;

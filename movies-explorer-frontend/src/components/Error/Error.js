import './Error.css';

import { useHistory } from 'react-router-dom';
import { notFoundPage } from '../../utils/errorMessage';

function Error() {
  const history = useHistory();

  function handleGoBack() {
    history.push('/');
  }

  return (
    <section className="error">
      <h3 className="error__code">{notFoundPage.code}</h3>

      <p className="error__text">{notFoundPage.text}</p>

      <p className="error__go-back" onClick={handleGoBack}>
        Назад
      </p>
    </section>
  );
}

export default Error;

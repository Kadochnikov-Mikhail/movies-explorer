import './ServerError.css';

import { errorOnServer } from '../../utils/errorMessage';

function ServerError() {
  return (
    <div className="server-error">
      <p className="server-error__text">{errorOnServer.text}</p>
    </div>
  );
}

export default ServerError;

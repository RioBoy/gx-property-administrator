import React from 'react';
import { useHistory } from 'react-router-dom';
import { Buttons } from '../components/button/Buttons';
import * as path from '../routes/path';

const NotFound = ({ children }) => {
  const history = useHistory();

  return (
    <div className="d-flex flex-column gap-2 full-height justify-content-center align-items-center">
      <div className="d-flex align-items-center not-found">
        <div className="code fs-7 fw-light text-brand-yankees">404</div>
        <div className="message fs-8 fw-light text-brand-yankees">
          Not Found
        </div>
      </div>
      <Buttons
        type="button"
        isPrimary
        className="fw-light px-5 py-2 text-white"
        onClick={() => history.push(path.URLHome)}
      >
        {children}
      </Buttons>
    </div>
  );
};

export default NotFound;

import React from 'react';
import propTypes from 'prop-types';

const Spinner = ({ height, isInButton, children }) => {
  if (isInButton) {
    return (
      <div className="d-flex align-items-center justify-content-center gap-2">
        {children}
        <div className="spinner-border spinner-border-sm" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={[
        'd-flex justify-content-center align-items-center',
        height,
      ].join(' ')}
    >
      <div className="spinner-border text-primary-orange" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

Spinner.propTypes = {
  height: propTypes.string,
  isInButton: propTypes.bool,
};

export default Spinner;

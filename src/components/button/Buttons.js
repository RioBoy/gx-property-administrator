import React from 'react';
import propTypes from 'prop-types';

export const ButtonPrimary = (props) => {
  const className = [props.className];
  if (props.isMedium) className.push('fw-medium');
  if (props.isSemiBold) className.push('fw-semibold');
  if (props.isBold) className.push('fw-bold');

  return (
    <button className={className.join(' ')} type={props.type}>
      {props.children}
    </button>
  );
};

ButtonPrimary.propTypes = {
  type: propTypes.oneOf(['button', 'link', 'submit']),
  isMedium: propTypes.bool,
  isSemiBold: propTypes.bool,
  isBold: propTypes.bool,
};
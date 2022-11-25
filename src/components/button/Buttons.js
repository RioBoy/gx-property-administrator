import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

export const Buttons = (props) => {
  const className = [props.className];
  if (props.isPrimary) className.push('btn-primary-orange');
  if (props.isMedium) className.push('fw-medium');
  if (props.isSemiBold) className.push('fw-semibold');
  if (props.isBold) className.push('fw-bold');

  const onClick = () => {
    if (props.onClick) props.onClick();
  };

  if (props.type === 'link') {
    return (
      <Link
        to={props.href}
        className={className.join(' ')}
        style={props.style}
        onClick={onClick}
      >
        {props.children}
      </Link>
    );
  }

  if (props.isDisabled) {
    return (
      <button className={className.join(' ')} style={props.style} disabled>
        {props.children}
      </button>
    );
  }

  return (
    <button className={className.join(' ')} type={props.type}>
      {props.children}
    </button>
  );
};

Buttons.propTypes = {
  type: propTypes.oneOf(['button', 'link', 'submit']),
  onClick: propTypes.func,
  href: propTypes.string,
  isPrimary: propTypes.bool,
  isMedium: propTypes.bool,
  isSemiBold: propTypes.bool,
  isBold: propTypes.bool,
  isDisabled: propTypes.bool,
};

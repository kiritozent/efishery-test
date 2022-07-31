import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const Button = ({ children, onClick, disabled, variant = 'primary' }) => {
  return (
    <div className="button-container">
      <div className={`button ${variant} ${disabled ? 'disabled' : ''}`} onClick={onClick}>
        {children}
      </div>
    </div>
  );
};

Button.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'warning', 'danger'])
};

export default Button;

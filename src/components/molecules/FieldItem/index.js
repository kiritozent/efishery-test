import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const FieldItem = ({ children, label }) => {
  return (
    <div className="item-container">
      <div className="label">{label}</div>
      {children}
    </div>
  );
};

FieldItem.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string
};

export default FieldItem;

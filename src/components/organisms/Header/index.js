import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const Header = (props) => {
  return (
    <div className="header-container">
      <div className="header-title">{props?.title}</div>
      {props?.trailing}
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string,
  trailing: PropTypes.node
};

export default Header;

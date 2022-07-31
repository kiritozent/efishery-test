import React from 'react';
import images from '../../../images';
import './styles.scss';

const Header = () => {
  return (
    <div className="header-container">
      <img className="header-logo" src={images.logo.efisheryLogo} />
    </div>
  );
};

export default Header;

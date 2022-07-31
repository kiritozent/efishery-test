import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../organisms/Header';
import './styles.scss';

const BaseContent = (props) => {
  return (
    <div className="base-container">
      <Header />
      <div className="body-container">{props?.children}</div>
    </div>
  );
};

BaseContent.propTypes = {
  children: PropTypes.node
};

export default BaseContent;

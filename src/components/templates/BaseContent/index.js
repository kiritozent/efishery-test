import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../organisms/Header';
import './styles.scss';

const BaseContent = (props) => {
  return (
    <div className="base-container">
      <Header title={props?.title} trailing={props?.trailing} />
      <div className="body-container">{props?.children}</div>
    </div>
  );
};

BaseContent.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  trailing: PropTypes.node
};

export default BaseContent;

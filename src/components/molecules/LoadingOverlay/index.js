import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Loading from '../../atoms/Loading';
import './styles.scss';

const LoadingOverlay = ({ children, loading }) => {
  return (
    <Fragment>
      {children}
      {loading && (
        <div className="loading-overlay-container">
          <Loading />
        </div>
      )}
    </Fragment>
  );
};

LoadingOverlay.propTypes = {
  children: PropTypes.node,
  loading: PropTypes.bool
};

export default LoadingOverlay;

import React from 'react';
import { ImSpinner2 } from 'react-icons/im';
import colors from '../../../styles/theme';
import './styles.scss';

const Loading = () => {
  return <ImSpinner2 className="logo" size={'32px'} color={colors.primary} />;
};

export default Loading;

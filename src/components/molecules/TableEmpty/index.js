import React from 'react';
import { FaDropbox } from 'react-icons/fa';
import './styles.scss';

const TableEmpty = () => {
  return (
    <div className="table-empty-container">
      <FaDropbox size={64} />
    </div>
  );
};

export default TableEmpty;

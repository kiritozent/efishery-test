import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import FilterField from '../../molecules/FilterField';

const TableFilter = ({ filters }) => {
  return (
    <div className="table-header-container">
      {filters?.map((item, index) => (
        <FilterField key={`filter-${index}`} {...item} />
      ))}
    </div>
  );
};

TableFilter.propTypes = {
  title: PropTypes.string,
  filters: PropTypes.arrayOf(PropTypes.shape(FilterField.propTypes))
};

export default TableFilter;

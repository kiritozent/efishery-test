import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';

const DefaultColumnFilter = ({ column: { filterValue, setFilter } }) => {
  return (
    <Input
      value={filterValue || ''}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search...`}
    />
  );
};

DefaultColumnFilter.propTypes = {
  column: PropTypes.arrayOf(PropTypes.shape({}))
};

export default DefaultColumnFilter;

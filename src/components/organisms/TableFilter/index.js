import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import FilterField from '../../molecules/FilterField';
import Button from '../../atoms/Button';
import { BiReset } from 'react-icons/bi';
import { useSetRecoilState } from 'recoil';
import { globalTableFilterAtom } from '../../../stores/global/atoms';

const TableFilter = ({ filters }) => {
  const setGlobalFilter = useSetRecoilState(globalTableFilterAtom);
  return (
    <div className="table-header-container">
      {filters?.map((item, index) => (
        <FilterField key={`filter-${index}`} {...item} />
      ))}
      <Button
        variant="danger"
        onClick={() => {
          setGlobalFilter({});
        }}>
        <BiReset />
        Reset Filter
      </Button>
    </div>
  );
};

TableFilter.propTypes = {
  title: PropTypes.string,
  filters: PropTypes.arrayOf(PropTypes.shape(FilterField.propTypes))
};

export default TableFilter;

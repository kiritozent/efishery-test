/* eslint-disable react/display-name */

import React, { useMemo } from 'react';
import { Input } from 'reactstrap';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { globalTableFilterAtom } from '../../../stores/global/atoms';
import PropTypes from 'prop-types';
import Select from '../Select';
import './styles.scss';
import FieldItem from '../FieldItem';

const FilterField = (props) => {
  const { filterKey, type, label, selectType, selectOptions, placeholder } = props;

  const filterData = useRecoilValue(globalTableFilterAtom);

  const onChangeFilter = useRecoilCallback(
    ({ set }) =>
      (filterKey, filterValue) => {
        set(globalTableFilterAtom, (currVal) => ({
          ...currVal,
          [filterKey]: filterValue
        }));
      },
    []
  );

  const childField = useMemo(() => {
    console.log(filterData?.[filterKey]?.value);
    switch (type) {
      case 'select':
        return () => (
          <Select
            type={selectType}
            options={selectOptions}
            value={filterData?.[filterKey]?.value}
            valueKey={selectType}
            labelKey={selectType}
            onChange={(value) => {
              onChangeFilter(filterKey, {
                type: 'select',
                value
              });
            }}
            placeholder={placeholder}
          />
        );
      case 'search':
        return () => (
          <Input
            value={filterData?.[filterKey]?.value ?? ''}
            onChange={(e) => {
              onChangeFilter(filterKey, {
                type: 'search',
                value: e.target.value
              });
            }}
            placeholder={placeholder ?? 'Search...'}
          />
        );
      case 'number-range':
        return () => (
          <div className="number-range-container">
            <Input
              type="number"
              value={filterData?.[filterKey]?.value?.['min'] ?? ''}
              placeholder={'Min'}
              onChange={(e) => {
                onChangeFilter(filterKey, {
                  type: 'number-range',
                  value: {
                    ...filterData?.[filterKey]?.value,
                    min: parseInt(e.target.value)
                  }
                });
              }}
            />
            <Input
              type="number"
              min={filterData?.[filterKey]?.['min'] ?? 0}
              value={filterData?.[filterKey]?.value?.['max'] ?? ''}
              placeholder={'Max'}
              onChange={(e) => {
                onChangeFilter(filterKey, {
                  type: 'number-range',
                  value: {
                    ...filterData?.[filterKey]?.value,
                    max:
                      parseInt(e.target.value) < filterData?.[filterKey]?.value?.['min']
                        ? null
                        : parseInt(e.target.value)
                  }
                });
              }}
            />
          </div>
        );
      default:
        return null;
    }
  }, [props, filterData]);

  if (!childField) return null;

  return <FieldItem label={label}>{childField?.()}</FieldItem>;
};

FilterField.propTypes = {
  filterKey: PropTypes.string,
  type: PropTypes.oneOf(['search', 'select', 'number-range']),
  filterValue: PropTypes.any,
  label: PropTypes.any,
  selectType: PropTypes.oneOf(['size', 'city', 'province']),
  selectOptions: PropTypes.array,
  placeholder: PropTypes.string
};

export default FilterField;

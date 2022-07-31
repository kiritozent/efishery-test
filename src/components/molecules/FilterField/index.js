/* eslint-disable react/display-name */

import React, { useEffect, useMemo, useState } from 'react';
import { Input } from 'reactstrap';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { isEmptyOrSpaces } from '../../../libs/helper';
import { globalTableFilterAtom } from '../../../stores/global/atoms';
import PropTypes from 'prop-types';
import Select from '../Select';
import FieldItem from '../FieldItem';
import { debounce } from 'lodash';

const FilterField = (props) => {
  const { filterKey, type, filterValue, label, selectType, selectOptions, placeholder } = props;

  const filterData = useRecoilValue(globalTableFilterAtom);
  const [isVisible, setIsVisible] = useState(true);

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

  const onSearchFunc = debounce(onChangeFilter, 3000);

  useEffect(() => {
    if (isEmptyOrSpaces(filterData[filterKey]?.filter) && type === 'select') {
      setIsVisible(false);
    }
  }, [filterData]);

  useEffect(() => {
    if (!isVisible) {
      setTimeout(() => {
        setIsVisible(true);
      });
    }
  }, [isVisible]);

  const childField = useMemo(() => {
    switch (type) {
      case 'select':
        return () => (
          <Select
            type={selectType}
            options={selectOptions}
            value={filterValue}
            valueKey={filterKey}
            labelKey={filterKey}
            onChange={(value) => {
              onSearchFunc(filterKey, value);
            }}
            placeholder={placeholder}
          />
        );
      case 'search':
        return () => (
          <Input
            value={filterData?.[filterKey]}
            onChange={(value) => {
              onSearchFunc(filterKey, value);
            }}
            placeholder={placeholder ?? 'Search...'}
          />
        );
      default:
        return null;
    }
  }, [props]);

  if (!childField) return null;

  return <FieldItem label={label}>{childField && isVisible && childField()}</FieldItem>;
};

FilterField.propTypes = {
  filterKey: PropTypes.string,
  type: PropTypes.oneOf(['search', 'select']),
  filterValue: PropTypes.any,
  label: PropTypes.any,
  selectType: PropTypes.oneOf(['size', 'city', 'province']),
  selectOptions: PropTypes.array,
  placeholder: PropTypes.string
};

export default FilterField;

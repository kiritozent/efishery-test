import React, { useMemo } from 'react';
import _ from 'lodash';
import useGetSelectOption from '@services/global/queries/useGetSelectOption';
import ReactSelect from 'react-select';
import PropTypes from 'prop-types';

const Select = (props) => {
  const {
    type,
    options,
    disabled,
    value,
    valueKey = 'value',
    labelKey = 'label',
    onChange
  } = props;

  const { data: queryData = options || [], isLoading: queryIsLoading } = useGetSelectOption(type);

  const selectValue = useMemo(() => {
    let result;
    if (value) {
      const temp = [...queryData];
      const findData = temp.find((option) => _.get(option, valueKey || 'value') === value);
      if (findData) result = findData;
    }
    return result;
  }, [queryData, value, valueKey, type]);

  return (
    <ReactSelect
      styles={{
        container: (provided) => ({
          ...provided,
          width: '100%'
        })
      }}
      isDisabled={disabled}
      isClearable
      value={selectValue}
      isLoading={queryIsLoading}
      onChange={(option) => {
        const value = _.get(option, valueKey);
        onChange?.(value);
      }}
      options={queryData}
      getOptionLabel={(option) => _.get(option, labelKey)}
      getOptionValue={(option) => _.get(option, valueKey)}
    />
  );
};

Select.propTypes = {
  type: PropTypes.oneOf(['province', 'size', 'city']),
  options: PropTypes.array,
  disabled: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.string]),
  valueKey: PropTypes.string,
  labelKey: PropTypes.string,
  onChange: PropTypes.func
};

export default Select;

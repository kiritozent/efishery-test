import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useGetAreaList from '../../../services/queries/useGetAreaList';
import Select from '../../molecules/Select';
import FieldItem from '../../molecules/FieldItem';

const AreaSelect = ({ onChange, value, name }) => {
  const [selectedArea, setSelectedArea] = useState({
    ['province']: null,
    ['city']: null
  });
  const { data, isLoading: getAreaLoading } = useGetAreaList();

  useEffect(() => {
    if (value) {
      setSelectedArea(value);
    }
  }, [value]);

  console.log({ value });

  return (
    <>
      <FieldItem label={'Province'}>
        <Select
          name={name}
          options={data?.province}
          value={selectedArea?.['province']}
          valueKey={'province'}
          labelKey={'province'}
          onChange={(value) => {
            setSelectedArea({ ['province']: value, ['city']: null });
            onChange?.({ ['province']: value, ['city']: null });
          }}
          placeholder={'Select Province'}
          loading={getAreaLoading}
        />
      </FieldItem>
      <FieldItem label={'City'}>
        <Select
          name={name}
          disabled={!selectedArea?.['province']}
          options={data?.city?.filter?.((item) =>
            selectedArea?.['province'] ? item?.province === selectedArea?.['province'] : true
          )}
          value={selectedArea?.['city']}
          valueKey={'city'}
          labelKey={'city'}
          onChange={(value) => {
            setSelectedArea({ ...selectedArea, ['city']: value });
            onChange?.({ ...selectedArea, ['city']: value });
          }}
          placeholder={'Select City'}
          loading={getAreaLoading}
        />
      </FieldItem>
    </>
  );
};

AreaSelect.propTypes = {
  onChange: PropTypes.array,
  value: PropTypes.object,
  name: PropTypes.string
};

export default AreaSelect;

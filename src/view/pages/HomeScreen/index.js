import React from 'react';
import { FaPlus } from 'react-icons/fa';
import Button from '../../../components/atoms/Button';

import BaseContent from '../../../components/templates/BaseContent';
import DataTable from '../../../components/templates/DataTable';

const HomeScreen = () => {
  return (
    <BaseContent
      title="Fish Price List"
      trailing={
        <Button variant="primary">
          <FaPlus />
          Add Fish Price
        </Button>
      }>
      <DataTable
        dataUrl="list"
        filters={[
          {
            type: 'search',
            label: 'Fish Name',
            filterKey: 'komoditas'
          },
          {
            type: 'select',
            label: 'Province',
            filterKey: 'area_provinsi',
            selectType: 'province'
          },
          {
            type: 'select',
            label: 'Size',
            filterKey: 'size',
            selectType: 'size'
          },
          {
            type: 'number-range',
            label: 'Price',
            filterKey: 'price'
          }
        ]}
        columns={[
          {
            Header: 'Fish Name',
            accessor: 'komoditas'
          },
          {
            Header: 'Province',
            accessor: 'area_provinsi'
          },
          {
            Header: 'City',
            accessor: 'area_kota'
          },
          {
            Header: 'Size',
            accessor: 'size'
          },
          {
            Header: 'Price',
            accessor: 'price'
          }
        ]}
      />
    </BaseContent>
  );
};

export default HomeScreen;

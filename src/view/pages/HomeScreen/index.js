import React from 'react';
import Table from '../../../components/organisms/Table';
import BaseContent from '../../../components/templates/BaseContent';
import useGetTableList from '../../../services/queries/useGetTableList';

const HomeScreen = () => {
  const { data: tableData = [], isLoading: tableLoading } = useGetTableList('list', { filter: {} });
  return (
    <BaseContent>
      <Table
        data={tableData}
        loading={tableLoading}
        columns={[
          {
            Header: 'Name',
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

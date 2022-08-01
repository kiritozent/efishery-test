import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { useSetRecoilState } from 'recoil';
import Button from '../../../components/atoms/Button';

import BaseContent from '../../../components/templates/BaseContent';
import DataTable from '../../../components/templates/DataTable';
import { globalOpenedModalKeyAtom } from '../../../stores/global/atoms';
import CreatePriceModal from '../../modals/CreatePrice';

const HomeScreen = () => {
  const setOpenedModalKey = useSetRecoilState(globalOpenedModalKeyAtom);

  const openCreatePriceModal = () => {
    setOpenedModalKey('MODAL_CREATE_PRICE');
  };
  return (
    <BaseContent
      title="Fish Price List"
      trailing={
        <Button variant="primary" onClick={openCreatePriceModal}>
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
            type: 'area',
            label: 'Area',
            filterKey: 'area_provinsi,area_kota'
          },
          {
            type: 'select',
            label: 'Size',
            filterKey: 'size',
            selectType: 'size',
            placeholder: 'Select Size'
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
      <CreatePriceModal />
    </BaseContent>
  );
};

export default HomeScreen;

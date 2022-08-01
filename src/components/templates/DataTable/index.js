import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Table from '../../organisms/Table';
import './styles.scss';
import useGetTableList from '../../../services/queries/useGetTableList';
import TableFilter from '../../organisms/TableFilter';
import FilterField from '../../molecules/FilterField';
import { useRecoilValue } from 'recoil';
import { globalRefreshHashAtom } from '../../../stores/global/atoms';

const DataTable = ({ columns, filters, dataUrl }) => {
  const refreshHash = useRecoilValue(globalRefreshHashAtom);
  const {
    data: tableData = [],
    isLoading: tableLoading,
    refetch
  } = useGetTableList(dataUrl, {
    filter: {}
  });

  useEffect(() => {
    refetch();
  }, [refreshHash]);

  return (
    <div className="datatable-container">
      <TableFilter filters={filters} />
      <Table columns={columns} loading={tableLoading} data={tableData} />
    </div>
  );
};

DataTable.propTypes = {
  title: PropTypes.string,
  columns: PropTypes.array,
  filters: PropTypes.arrayOf(PropTypes.shape(FilterField.propTypes)),
  data: PropTypes.array,
  dataUrl: PropTypes.string.isRequired
};

export default DataTable;

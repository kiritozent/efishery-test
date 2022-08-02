import React, { useEffect, useState } from 'react';
import { usePagination, useSortBy, useTable } from 'react-table';
import LoadingOverlay from '../../molecules/LoadingOverlay';
import PropTypes from 'prop-types';
import './styles.scss';
import TableEmpty from '../../molecules/TableEmpty';
import { useRecoilValue } from 'recoil';
import { globalTableFilterAtom } from '../../../stores/global/atoms';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { filterData } from '../../../libs/helper';
import { debounce } from 'lodash';
import TablePagination from '../../molecules/TablePagination';
const Table = (props) => {
  const { columns, data, loading } = props;
  const [filteredData, setFilteredData] = useState([...data]);
  const tableFilter = useRecoilValue(globalTableFilterAtom);

  useEffect(() => {
    debounce(filterData, 1000)(data, tableFilter, (result) => {
      setFilteredData(result);
    });
  }, [tableFilter, data]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page
    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions: { length },
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable(
    {
      columns,
      data: filteredData,
      initialState: { pageIndex: 0, pageSize: 10 }
    },
    useSortBy,
    usePagination
  );

  // Render the UI for your table
  return (
    <>
      <div className="table-container">
        <LoadingOverlay loading={loading}>
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup, groupIndex) => (
                <tr key={`header-${groupIndex}`} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, index) => (
                    <th
                      key={`header-${groupIndex}-${index}`}
                      {...column.getHeaderProps(column.getSortByToggleProps())}>
                      {column.render('Header')}
                      <span>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <FaArrowDown />
                          ) : (
                            <FaArrowUp />
                          )
                        ) : (
                          ''
                        )}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.length === 0 ? (
                <tr>
                  <td colSpan={5}>
                    <TableEmpty />
                  </td>
                </tr>
              ) : (
                page.map((row, rowIndex) => {
                  prepareRow(row);
                  return (
                    <tr key={`row-${rowIndex}`} {...row.getRowProps()}>
                      {row.cells.map((cell, cellIndex) => {
                        return (
                          <td key={`cell-${rowIndex}-${cellIndex}`} {...cell.getCellProps()}>
                            {cell.render('Cell')}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </LoadingOverlay>
      </div>
      <TablePagination
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        pageLength={length}
        pageCount={pageCount}
        gotoPage={gotoPage}
        nextPage={nextPage}
        previousPage={previousPage}
        setPageSize={setPageSize}
        pageSize={pageSize}
        pageIndex={pageIndex}
      />
    </>
  );
};

Table.propTypes = {
  columns: PropTypes.array,
  dataUrl: PropTypes.string,
  filter: PropTypes.object,
  data: PropTypes.array,
  loading: PropTypes.bool
};

export default Table;

import React from 'react';
import { usePagination, useTable } from 'react-table';
import LoadingOverlay from '../../molecules/LoadingOverlay';
import PropTypes from 'prop-types';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import './styles.scss';
import TableEmpty from '../../molecules/TableEmpty';
const Table = (props) => {
  const { columns, data, loading } = props;

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
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 }
    },
    usePagination
  );

  // Render the UI for your table
  return (
    <>
      <div className="table-container">
        <LoadingOverlay loading={loading}>
          <table {...getTableProps()} striped bordered>
            <thead>
              {headerGroups.map((headerGroup, groupIndex) => (
                <tr key={`header-${groupIndex}`} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, index) => (
                    <th key={`header-${groupIndex}-${index}`} {...column.getHeaderProps()}>
                      {column.render('Header')}
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
      {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
      <div className="pagination">
        <div className="pagination-meta">
          <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
          </span>
        </div>
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}>
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
        <Pagination style={{ margin: 0 }}>
          <PaginationItem disabled={!canPreviousPage} onClick={() => gotoPage(0)}>
            <PaginationLink>{'<<'}</PaginationLink>
          </PaginationItem>
          <PaginationItem disabled={!canPreviousPage} onClick={() => previousPage()}>
            <PaginationLink>{'<'}</PaginationLink>
          </PaginationItem>
          <PaginationItem disabled={!canNextPage} onClick={() => nextPage()}>
            <PaginationLink>{'>'}</PaginationLink>
          </PaginationItem>
          <PaginationItem disabled={!canNextPage} onClick={() => gotoPage(pageCount - 1)}>
            <PaginationLink>{'>>'}</PaginationLink>
          </PaginationItem>
        </Pagination>
      </div>
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

import React from 'react';
import { BiChevronLeft, BiChevronRight, BiFirstPage, BiLastPage } from 'react-icons/bi';
import PropTypes from 'prop-types';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const TablePagination = ({
  pageIndex,
  pageSize,
  setPageSize,
  canPreviousPage,
  canNextPage,
  gotoPage,
  previousPage,
  nextPage,
  pageCount,
  pageLength
}) => {
  return (
    <div className="pagination">
      <div className="pagination-meta">
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageLength}
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
      <Pagination style={{ margin: 0, padding: 0, paddingLeft: '8px' }} size="sm">
        <PaginationItem disabled={!canPreviousPage} onClick={() => gotoPage(0)}>
          <PaginationLink>
            <BiFirstPage size={'24px'} />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem disabled={!canPreviousPage} onClick={() => previousPage()}>
          <PaginationLink>
            <BiChevronLeft size={'24px'} />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem disabled={!canNextPage} onClick={() => nextPage()}>
          <PaginationLink>
            <BiChevronRight size={'24px'} />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem disabled={!canNextPage} onClick={() => gotoPage(pageCount - 1)}>
          <PaginationLink>
            <BiLastPage size={'24px'} />
          </PaginationLink>
        </PaginationItem>
      </Pagination>
    </div>
  );
};

TablePagination.propTypes = {
  pageIndex: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  setPageSize: PropTypes.func.isRequired,
  canPreviousPage: PropTypes.bool.isRequired,
  canNextPage: PropTypes.bool.isRequired,
  gotoPage: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
  pageCount: PropTypes.number.isRequired,
  pageLength: PropTypes.number.isRequired
};

export default TablePagination;

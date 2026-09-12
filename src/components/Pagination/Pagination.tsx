// import classNames from 'classnames';
import './Pagination.scss';

import React from 'react';
import ReactPaginate from 'react-paginate';

type PaginationProps = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage = 16,
  currentPage = 1,
  onPageChange,
}) => {
  // const pageNumber = [];

  // for (let i = 1; i <= Math.ceil(total / Number(perPage)); i++) {
  //   pageNumber.push(i);
  // }

  return (
    <div className="pagination">
      <ReactPaginate
        pageCount={Math.ceil(total / Number(perPage))}
        onPageChange={page => onPageChange(page.selected + 1)}
        forcePage={currentPage - 1}
        pageRangeDisplayed={4}
        marginPagesDisplayed={1}
        previousLabel="&lsaquo;"
        nextLabel="&rsaquo;"
        containerClassName="pagination__container"
        pageClassName="pagination__button"
        disabledClassName="pagination__button--disabled"
        previousLinkClassName="pagination__button"
        nextLinkClassName="pagination__button"
        pageLinkClassName="pagination__button"
        activeClassName="pagination__button--active"
      />
      {/* <ul className="pagination__container">
        <li>
          <button
            disabled={currentPage === 1}
            className={classNames('pagination__button', {
              'pagination__button--disabled': currentPage === 1,
            })}
            onClick={() => {
              onPageChange(currentPage - 1);
              // if (currentPage !== 1) {
              // }
            }}
          >
            &lsaquo;
          </button>
        </li>
        {pageNumber.map(page => (
          <li key={page}>
            <button
              className={classNames('pagination__button', {
                'pagination__button--active': page === currentPage,
              })}
              onClick={() => {
                if (page !== currentPage) {
                  onPageChange(page);
                }
              }}
            >
              {page}
            </button>
          </li>
        ))}
        <li>
          <button
            className={classNames('pagination__button', {
              'pagination__button--disabled': currentPage === pageNumber.length,
            })}
            disabled={currentPage === pageNumber.length}
            // aria-disabled={currentPage === pageNumber.length ? 'true' : 'false'}
            onClick={() => {
              onPageChange(currentPage + 1);
              // if (currentPage !== pageNumber.length) {
              // якщо щось повернути обидва onPageChange в цю перевірку
              // }
            }}
          >
            &rsaquo;
          </button>
        </li>
      </ul> */}
    </div>
  );
};

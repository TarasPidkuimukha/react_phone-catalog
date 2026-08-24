import classNames from 'classnames';
import './Pagination.scss';

import React from 'react';

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
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(total / Number(perPage)); i++) {
    pageNumber.push(i);
  }

  return (
    <div className="pagination">
      <ul className="pagination__container">
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
            {/* <img src="" alt="prev" /> */}
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
            {/* <img src="" alt="next" /> */}
          </button>
        </li>
      </ul>
    </div>
  );
};

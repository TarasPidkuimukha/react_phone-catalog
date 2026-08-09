import classNames from 'classnames';

import React from 'react';

type PaginationProps = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage = 4,
  currentPage = 1,
  onPageChange,
}) => {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(total / Number(perPage)); i++) {
    pageNumber.push(i);
  }

  return (
    <div>
      <ul>
        <li
          className={classNames('page-item', { disabled: currentPage === 1 })}
        >
          <button
            onClick={() => {
              if (currentPage !== 1) {
                onPageChange(currentPage - 1);
              }
            }}
          >
            &lsaquo;
            <img src="" />
          </button>
        </li>
        {pageNumber.map(page => (
          <li
            key={page}
            className={classNames('page-item', {
              active: page === currentPage,
            })}
          >
            <button
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
        <li
          className={classNames('page-item', {
            disabled: currentPage === pageNumber.length,
          })}
        >
          <button
            aria-disabled={currentPage === pageNumber.length ? 'true' : 'false'}
            onClick={() => {
              if (currentPage !== pageNumber.length) {
                onPageChange(currentPage + 1);
              }
            }}
          >
            &rsaquo;
            <img src="" />
          </button>
        </li>
      </ul>
    </div>
  );
};
//дати логіку стрілкам, бо решта наче працює все,
//  хіба може треба шоб додавався в адресу page=1

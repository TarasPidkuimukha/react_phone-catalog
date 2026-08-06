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
  perPage,
  currentPage = 0,
  onPageChange,
}) => {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(total / perPage); i++) {
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
              if (currentPage !== 0) {
                onPageChange(currentPage - 1);
              }
            }}
          >
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
            <img src="" />
          </button>
        </li>
      </ul>
    </div>
  );
};
//стрілочку можна додати як < > але її візуалізувати
//чомусь не переключається з третьої на другу, а першої взагалі нема
//при першому виборі кількості відображених товарів, показує порожню сторінку
// коли обираєш 4 товара на сторінці, показує всі сторінки, а має показувати лише 4 сторінки, а не всі 16. тут треба зробити за принципом каруселі(таке завдання було)

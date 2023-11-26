import React from "react";
import styles from "./paginate.module.scss";
import clsx from "clsx";

type PaginationProps = {
  productsPerPage: number;
  totalProducts: number;
  setCurrentPage: (currentPage: number) => void;
  currentPage: number;
};
export const Pagination = ({
  productsPerPage,
  totalProducts,
  setCurrentPage,
  currentPage,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const pages = Array.from(Array(totalPages), (_, index) => index + 1);

  return (
    <div className={styles.paginationContainer}>
      {pages.map((page, index) => {
        return (
          <button
            key={currentPage}
            onClick={() => {
              setCurrentPage(page);
              console.log(page, "page"); // ok
              console.log(currentPage, "Currentpage");
            }}
            className={clsx(
              styles.button,
              page === currentPage && styles.buttonActive
            )}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};

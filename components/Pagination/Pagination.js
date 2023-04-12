import React from "react";
import styles from "./Pagination.module.css";

const Pagination = ({ items, pageSize, currentPage, onPageChange }) => {
  const pagesCount = Math.ceil(items / pageSize); // 100/20 ==> 5

  if (pagesCount === 1) return null;

  return (
    <div>
      <button
        className={styles.page}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &larr; Previous
      </button>
      <span className={styles.pageNum}>{currentPage}</span>
      <button
        className={styles.page}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === pagesCount}
      >
        Next &rarr;
      </button>
    </div>
  );
};

export default Pagination;

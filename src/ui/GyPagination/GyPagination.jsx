import classNames from "classnames";
import React, { useMemo } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

import "./index.scss";

/**
 *
 * @param { row, currentPage, total, pageRow }
 * row: the number of items per page
 * currentPage: current page number
 * pageRow: the number of pages
 * hasPageBtn: whether it has page buttons
 * @returns
 */
const GyPagination = ({
  row,
  curPage,
  pageRow,
  onCurPageChange,
  hasPageBtn = true,
}) => {
  const range = (start, end) => {
    const arr = [];
    for (let i = start; i <= end; i++) {
      arr.push(i);
    }
    return arr;
  };

  const rowArray = useMemo(() => {
    const getPageItems = (pageRow, c) => {
      if (pageRow <= 8) {
        return range(1, pageRow);
      }
      if (c <= 5) {
        return [...range(1, 7), -1, pageRow];
      } else if (c >= pageRow - 4) {
        return [1, -1, ...range(pageRow - 6, pageRow)];
      } else {
        return [1, -1, c - 2, c - 1, c, c + 1, c + 2, -1, pageRow];
      }
    };
    return getPageItems(pageRow, curPage);
  }, [curPage, pageRow]);

  const setPage = (item, active) => {
    if (active || item === -1) return;
    onCurPageChange(item);
  };

  const nextPage = () => {
    if (curPage === pageRow) return;
    onCurPageChange(curPage + 1);
  };

  const prevPage = () => {
    if (curPage === 1) return;
    onCurPageChange(curPage - 1);
  };

  return (
    <section className="gy-pagination">
      <ul>
        <li className="pagination-btn" onClick={prevPage}>
          <AiOutlineArrowLeft />
        </li>
        {hasPageBtn &&
          rowArray.map((item, index) => {
            return (
              <li
                key={index}
                className={classNames("pagination-btn", {
                  active: item === curPage,
                  dot: item === -1
                })}
                onClick={() => setPage(item, item === curPage)}
              >
                {item === -1 ? "..." : `${item}`}
              </li>
            );
          })}
        <li className="pagination-btn" onClick={nextPage}>
          <AiOutlineArrowRight />
        </li>
      </ul>
    </section>
  );
};

export default GyPagination;

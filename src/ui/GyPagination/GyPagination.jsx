import classNames from "classnames";
import React, { useMemo } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

import "./index.scss";
import GyButton from "../GyButton/GyButton";

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
  paginationObj,
  onCurPageChange,
  hasPageBtn = true,
  className,
  ...props
}) => {
  const { row, curPage, pageRow } = paginationObj;
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

  if (row === undefined || curPage === undefined || pageRow === undefined)
    return <></>;

  return (
    <section className={classNames("gy-pagination", className)} {...props}>
      <ul>
        <li>
          <GyButton
            className={classNames("pagination-btn", {
              inactive: curPage === 1,
            })}
            onClick={prevPage}
          >
            <AiOutlineArrowLeft />
          </GyButton>
        </li>
        {hasPageBtn &&
          rowArray.map((item, index) => {
            return (
              <li key={index}>
                <GyButton
                  onClick={() => setPage(item, item === curPage)}
                  className={classNames("pagination-btn", {
                    active: item === curPage,
                    dot: item === -1,
                  })}
                >
                  {item === -1 ? "..." : `${item}`}
                </GyButton>
              </li>
            );
          })}
        <li>
          <GyButton
            className={classNames("pagination-btn", {
              inactive: curPage === rowArray.length,
            })}
            onClick={nextPage}
          >
            <AiOutlineArrowRight />
          </GyButton>
        </li>
      </ul>
    </section>
  );
};

export default GyPagination;

import React, { useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
/**
 *
 * @param { row, currentPage, total, pageRow }
 * row: the number of items per page
 * total: the number of items
 * currentPage: current page number
 * pageRow: the number of pages
 * @returns
 */
const GyPagination = ({ row, currentPage, total, pageRow }) => {
  const [curPage, setCurrentPage] = useState(currentPage);
  const rowArray = Array(row)
    .fill()
    .map((_, i) => i + 1);

  const setPage = (item, active) => {
    if (active) return;
    setCurrentPage(item);
  };

  const nextPage = () => {
    if(curPage === pageRow) return;
    setCurrentPage(curPage + 1);
  }

  const prevPage = () => {
    if(curPage === 1) return;
    setCurrentPage(curPage - 1);
  }

  return (
    <section className="gy-pagination grid place-items-center pt-8 pb-8">
      <ul className="flex gap-2">
        <li className="pagination-btn" onClick={prevPage}>
          <AiOutlineArrowLeft />
        </li>
        {rowArray.map((item, index) => {
          const active = item === curPage ? "active" : "";
          return (
            <li
              key={index}
              className={`pagination-btn ${active}`}
              onClick={() => setPage(item, active)}
            >
              {item}
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

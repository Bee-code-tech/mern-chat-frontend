import React from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="fixed  bottom-0 left-0 w-full bg-white flex justify-center items-center py-3 shadow-lg border-t">
     <div className="mx-auto flex ">
     <button
        className="px-4 cursor-pointer text-slate-400 py-2 flex items-center gap-2"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <IoIosArrowBack />
        Previous
      </button>
      {pages.map(page => (
        <React.Fragment key={page}>
          {Math.abs(page - currentPage) <= 1 ? (
            <button
              className={`px-4 cursor-pointer py-2 border border-slate-400 rounded mx-1 ${page === currentPage ? 'bg-green-500 text-white' : 'text-slate-400'}`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          ) : (
            Math.abs(page - currentPage) === 2 && (
              <span className="mx-2">...</span>
            )
          )}
        </React.Fragment>
      ))}
      <button
        className="px-4 cursor-pointer text-slate-400 py-2 flex items-center gap-2"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
        <IoIosArrowForward />
      </button>
     </div>
    </div>
  );
};

export default Pagination;

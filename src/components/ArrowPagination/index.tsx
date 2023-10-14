import React from 'react';

const ArrowPagination = ({
  children,
  currentPage,
  totalPages,
  onPageChange,
}: {
  children: React.ReactNode;
  currentPage: number;
  totalPages: number;
  onPageChange: (n: number) => void;
}) => {
  return (
    <div className="flex justify-between items-center">
      <button
        type="button"
        onClick={() => {
          onPageChange(currentPage - 1);
        }}
        disabled={currentPage === 1}
        className="material-icons cursor-pointer p-1 disabled:text-white/20 text-white"
      >
        arrow_back_ios
      </button>
      {children}
      <button
        type="button"
        onClick={() => {
          onPageChange(currentPage + 1);
        }}
        disabled={currentPage === totalPages}
        className="material-icons cursor-pointer p-1 disabled:text-white/20 text-white"
      >
        arrow_forward_ios
      </button>
    </div>
  );
};

export default ArrowPagination;

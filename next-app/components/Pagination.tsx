'use client';
import React from 'react';
import { Pagination as MuiPagination, PaginationChangeEvent } from '@mui/material';

type Props = {
  total: number;
  page: number;
  onPageChange: (page: number) => void;
  itemsPerPage?: number;
};

const Pagination: React.FC<Props> = ({ total, page, onPageChange, itemsPerPage = 9 }) => {
  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    onPageChange(value);
  };

  return (
    <div className="flex justify-center mt-4">
      <MuiPagination
        count={Math.ceil(total / itemsPerPage)}
        page={page}
        onChange={handleChange}
      />
    </div>
  );
};

export default Pagination;

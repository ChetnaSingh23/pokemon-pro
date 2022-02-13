import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

interface PaginationProps {
	currentPage: number;
	limitCount: number;
	totalCount: number;
	handlePagination: (page: number) => void;
}

export default function BasicPagination({currentPage, limitCount, totalCount, handlePagination}: PaginationProps) {
  return (
    <Stack spacing={2} style={{margin: "20px 0"}}>
      <Pagination
				page={currentPage}
				count={Math.floor(totalCount/limitCount)}
				color="primary"
				onChange={(e, page) => handlePagination(page)}
			/>
    </Stack>
  );
}

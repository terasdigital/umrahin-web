import { DEFAULT_LIMITS, DEFAULT_PAGE } from "@/constants/data-table-constant";
import { useState } from "react";

export default function useDataTable() {
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);
  const [currentLimit, setCurrentLimit] = useState(DEFAULT_LIMITS);

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const handleChangeLimit = (limit: number) => {
    setCurrentLimit(limit);
    setCurrentPage(DEFAULT_PAGE);
  };

  return {
    currentPage,
    currentLimit,
    handleChangePage,
    handleChangeLimit,
  };
}

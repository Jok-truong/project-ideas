import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

type Props = {
  searchKeyword?: string;
  setSearchKeyword?: (value: string) => void;
  currentPage: number;
  setCurrentPage: (value: number) => void;
  queryFn: () => any;
  queryKey: string;
};

let isFirstRun = true;

export const useDataTable = ({
  queryFn,
  queryKey,
  setSearchKeyword,
  setCurrentPage,
  currentPage,
}: Props) => {
  const queryClient = useQueryClient();

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryFn: queryFn,
    queryKey: [queryKey],
  });

  useEffect(() => {
    if (isFirstRun) {
      isFirstRun = false;
      return;
    }
    refetch();
  }, [refetch, currentPage]);

  const searchKeywordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchKeyword?.(value);
  };

  const submitSearchKeywordHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentPage?.(1);
    refetch();
  };
  return {
    queryClient,
    data,
    isLoading,
    isFetching,
    submitSearchKeywordHandler,
    searchKeywordHandler,
    currentPage,
  };
};

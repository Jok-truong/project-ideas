import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import toast from "react-hot-toast";

type Props = {
  setSearchKeyword?: (value: string) => void;
  currentPage: number;
  setCurrentPage: (value: number) => void;
  queryFn: () => any;
  queryKey: string;
  mutateDeleteFn?: ({ slug, token }: { slug: string; token: string }) => any;
  deleteDataMessage?: string;
};

let isFirstRun = true;

export const useDataTable = ({
  queryFn,
  queryKey,
  setSearchKeyword,
  setCurrentPage,
  currentPage,
  mutateDeleteFn,
  deleteDataMessage = "",
}: Props) => {
  const queryClient = useQueryClient();

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryFn: queryFn,
    queryKey: [queryKey],
  });

  const { mutate: mutateDeletePost, isPending: isPendingDeleteData } =
    useMutation({
      mutationFn: mutateDeleteFn,
      onSuccess: (_data) => {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
        toast.success(deleteDataMessage);
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
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

  const deleteDataHandler = ({
    slug,
    token,
  }: {
    slug: string;
    token: string;
  }) => {
    if (window.confirm("Do you want to delete this record?")) {
      mutateDeletePost({ slug, token });
    }
  };

  return {
    queryClient,
    data,
    isLoading,
    isFetching,
    submitSearchKeywordHandler,
    searchKeywordHandler,
    currentPage,
    deleteDataHandler,
    isPendingDeleteData,
  };
};

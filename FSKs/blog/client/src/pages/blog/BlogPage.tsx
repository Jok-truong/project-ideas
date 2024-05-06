import { useQuery } from "@tanstack/react-query";
import MainLayout from "../../components/MainLayout";
import Search from "../../components/Search";
import { useSearchParams } from "react-router-dom";
import { getAllPosts } from "../../services/post";
import ArticleCardSkeleton from "../../components/ArticleCardSkeleton";
import ErrorMessage from "../../components/ErrorMessage";
import ArticleCard from "../../components/ArticleCard";
import Pagination from "../../components/Pagination";
import { useEffect } from "react";
import toast from "react-hot-toast";

type TQueryParams = {
  page: string;
  search: string;
};

let isFirstRun = true;

const BlogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchParamsValue = Object.fromEntries([
    ...searchParams,
  ]) as TQueryParams;

  const currentPage = parseInt(searchParamsValue?.page) || 1;
  const searchKeyword = searchParamsValue?.search || "";
  const { data, isLoading, isError, isFetching, refetch, error } = useQuery({
    queryFn: () => getAllPosts(searchKeyword, currentPage, 12),
    queryKey: ["posts"],
  });

  useEffect(() => {
    if (isError) {
      toast.error(error.message);
      console.log(error);
    }
  }, [isError]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (isFirstRun) {
      isFirstRun = false;
      return;
    }
    refetch();
  }, [currentPage, searchKeyword, refetch]);

  const paginationConfig = data?.data?.config;

  const handlePageChange = (page: number) => {
    setSearchParams({ page: String(page), search: searchKeyword });
  };

  const handleSearch = ({ searchKeyword }: { searchKeyword: string }) => {
    setSearchParams({ page: String(1), search: searchKeyword });
  };

  return (
    <MainLayout>
      <section className="flex flex-wrap container mx-auto px-5 py-10 flex-col">
        <Search
          onSearchKeyword={handleSearch}
          className="w-full max-w-xl mb-10"
        />
        <div className="flex flex-wrap md:gap-x-5 gap-y-5 pb-10">
          {isLoading || isFetching ? (
            [...Array(3)].map((_item, index) => (
              <ArticleCardSkeleton
                key={index}
                className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
              />
            ))
          ) : isError ? (
            <ErrorMessage message="Couldn't fetch the posts data" />
          ) : data?.data.length === 0 ? (
            <p className="text-orange-500">No Posts Found!</p>
          ) : (
            data?.data?.posts.map((post: any) => (
              <ArticleCard
                key={post._id}
                post={post}
                className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
              />
            ))
          )}
        </div>

        {!isLoading && (
          <Pagination
            onPageChange={(page) => handlePageChange(page)}
            currentPage={currentPage}
            totalPageCount={paginationConfig?.totalPageCount}
          />
        )}
      </section>
    </MainLayout>
  );
};

export default BlogPage;

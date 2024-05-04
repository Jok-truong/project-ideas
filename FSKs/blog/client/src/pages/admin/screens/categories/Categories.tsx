import {
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  ReactPortal,
  useState,
} from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
} from "../../../../services/postCategories";
import toast from "react-hot-toast";
import { useAppSelector } from "../../../../hooks";
import { TUserState } from "../../../../types/user";
import { useDataTable } from "../../../../hooks/useDataTable";
import Table from "../../components/Table";
import { Link } from "react-router-dom";

const Categories = () => {
  const queryClient = useQueryClient();
  const userState = useAppSelector((state: TUserState) => state.user);

  const [categoryTitle, seTCategoryTitle] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { mutate: mutateCreateCategory, isPending: isPendingCreateCategory } =
    useMutation({
      mutationFn: ({ token, title }: { token: string; title: string }) => {
        return createCategory({ token, title });
      },
      onSuccess: (_data) => {
        queryClient.invalidateQueries({ queryKey: ["categories"] });
        toast.success("Category is created");
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });

  const {
    data: categoriesData,
    isLoading,
    isFetching,
    submitSearchKeywordHandler,
    searchKeywordHandler,
    deleteDataHandler,
    isPendingDeleteData,
  } = useDataTable({
    setSearchKeyword,
    currentPage,
    setCurrentPage,
    queryFn: () => getAllCategories(searchKeyword, currentPage),
    queryKey: "categories",
    deleteDataMessage: "Category is deleted",
    mutateDeleteFn: ({ slug, token }) => {
      return deleteCategory({
        slug,
        token,
      });
    },
  });

  const handleCreateCategory = () => {
    mutateCreateCategory({
      token: userState.userInfo.token,
      title: categoryTitle,
    });
  };

  return (
    <div className="grid grid-cols-12 gap-x-4">
      <div className="col-span-4 py-8">
        <h4 className="text-lg leading-tight">Add New Category</h4>
        <div className="d-form-control w-full mt-6">
          <input
            value={categoryTitle}
            className="d-input d-input-bordered border-slate-300 !outline-slate-300 text-xl font-medium text-dark-hard"
            onChange={(e) => seTCategoryTitle(e.target.value)}
          />
          <button
            disabled={isPendingCreateCategory}
            type="button"
            onClick={handleCreateCategory}
            className="w-fit mt-3 bg-green-500 text-white font-semibold rounded-lg px-4 py-2 disabled:cursor-not-allowed disabled:opacity-70"
          >
            Add Category
          </button>
        </div>
      </div>
      <div className="col-span-8">
        <Table
          isLoading={isLoading}
          isFetching={isFetching}
          tableHeaderTitleList={["Title", "Created At", ""]}
          searchInputPlaceHolder="Category title..."
          pageTitle=""
          dataListName="Categories"
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          searchKeywordOnSubmitHandler={submitSearchKeywordHandler}
          searchKeywordOnChangeHandler={searchKeywordHandler}
          searchKeyword={searchKeyword}
          data={categoriesData?.data?.categories}
          paginationConfig={categoriesData?.data?.config}
        >
          {categoriesData?.data?.categories?.map?.(
            (category: { title: string; createdAt: Date; _id: string }) => (
              <tr key={category._id}>
                <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                  <div className="flex items-center">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {category.title}
                    </p>
                  </div>
                </td>
                <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {new Date(category.createdAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </td>
                <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 space-x-5">
                  <button
                    disabled={isPendingDeleteData}
                    type="button"
                    className="text-red-600 hover:text-red-900 disabled:opacity-70 disabled:cursor-not-allowed"
                    onClick={() => {
                      deleteDataHandler({
                        slug: category?._id,
                        token: userState.userInfo.token,
                      });
                    }}
                  >
                    Delete
                  </button>
                  <Link
                    to={`/admin/categories/edit/${category?._id}`}
                    className="text-green-600 hover:text-green-900"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            )
          )}
        </Table>
      </div>
    </div>
  );
};

export default Categories;

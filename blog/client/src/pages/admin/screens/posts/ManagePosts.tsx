import { useState } from "react";
import { useDataTable } from "../../../../hooks/useDataTable";
import { deletePost, getAllPosts } from "../../../../services/post";
import Table from "../../components/Table";
import stables from "../../../../constants/stables";
import images from "../../../../constants/images";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../../hooks";
import { TUserState } from "../../../../types/user";

type TCategory = {
  title: string;
};
type TPost = {
  _id: string;
  photo: string;
  title: string;
  categories: TCategory[];
  createdAt: Date;
  tags: string[];
  slug: string;
};

const ManagePosts = () => {
  const userState = useAppSelector((state: TUserState) => state.user);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: postsData,
    submitSearchKeywordHandler,
    searchKeywordHandler,
    isLoading,
    isFetching,
    isPendingDeleteData,
    deleteDataHandler,
  } = useDataTable({
    setSearchKeyword,
    currentPage,
    setCurrentPage,
    queryFn: () => getAllPosts(searchKeyword, currentPage),
    queryKey: "posts",
    deleteDataMessage: "Post is deleted",
    mutateDeleteFn: ({ slug, token }) => {
      return deletePost({
        slug,
        token,
      });
    },
  });

  return (
    <Table
      pageTitle="Manage Posts"
      dataListName="Posts"
      searchInputPlaceHolder="Post title..."
      searchKeywordOnSubmitHandler={submitSearchKeywordHandler}
      searchKeywordOnChangeHandler={searchKeywordHandler}
      searchKeyword={searchKeyword}
      tableHeaderTitleList={["Title", "Category", "Created At", "Tags", ""]}
      isLoading={isLoading}
      isFetching={isFetching}
      data={postsData?.data}
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}
      paginationConfig={postsData?.data?.config}
      titleForm="Create Post"
    >
      {postsData?.data?.posts?.map((post: TPost) => (
        <tr key={post._id}>
          <td className="p-5 text-sm bg-white border-b border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <a href="/" className="relative block">
                  <img
                    src={
                      post?.photo
                        ? stables.UPLOAD_FOLDER_BASE_URL + post?.photo
                        : images.samplePostImage
                    }
                    alt={post.title}
                    className="mx-auto object-cover rounded-lg w-10 aspect-square"
                  />
                </a>
              </div>

              <div className="ml-3">
                <p className="text-gray-900 whitespace-no-wrap">{post.title}</p>
              </div>
            </div>
          </td>

          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <p className="text-gray-900 whitespace-no-wrap">
              {post?.categories?.length > 0
                ? post.categories
                    .slice(0, 3)
                    .map(
                      (category, index) =>
                        `${category.title}${
                          post.categories.slice(0, 3).length === index + 1
                            ? ""
                            : ", "
                        }`
                    )
                : "UnCategorized"}
            </p>
          </td>

          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <p className="text-gray-900 whitespace-no-wrap">
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </td>

          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <div className="flex gap-x-2">
              {post.tags.length > 0
                ? post.tags.map((tag, index) => (
                    <p>
                      {tag}
                      {post.tags.length - 1 !== index && ","}
                    </p>
                  ))
                : "No tags"}
            </div>
          </td>

          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 space-x-5">
            <button
              disabled={isPendingDeleteData}
              type="button"
              className="text-red-600 hover:text-red-900 disabled:opacity-70 disabled:cursor-not-allowed"
              onClick={() => {
                deleteDataHandler({
                  slug: post?.slug,
                  token: userState.userInfo.token,
                });
              }}
            >
              Delete
            </button>
            <Link
              to={`/admin/posts/edit/${post?.slug}`}
              className="text-green-600 hover:text-green-900"
            >
              Edit
            </Link>
          </td>
        </tr>
      ))}
    </Table>
  );
};

export default ManagePosts;

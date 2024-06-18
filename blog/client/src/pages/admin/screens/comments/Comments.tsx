import { useState } from "react";
import { useAppSelector } from "../../../../hooks";
import { TUserState } from "../../../../types/user";
import { useDataTable } from "../../../../hooks/useDataTable";
import {
  deleteComment,
  getAllComments,
  updateComment,
} from "../../../../services/comment";
import Table from "../../components/Table";
import stables from "../../../../constants/stables";
import images from "../../../../constants/images";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

type TComment = {
  user: { avatar: string; name: string };
  replyOnUser: {
    name: string;
  } | null;
  post: {
    slug: string;
    title: string;
  };
  _id: string;
  desc: string;
  createdAt: Date;
  check: boolean;
};

const Comments = () => {
  const userState = useAppSelector((state: TUserState) => state.user);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: commentsData,
    isLoading,
    isFetching,
    queryClient,
    isPendingDeleteData,
    searchKeywordHandler,
    submitSearchKeywordHandler,
    deleteDataHandler,
  } = useDataTable({
    setSearchKeyword,
    currentPage,
    setCurrentPage,
    queryFn: () =>
      getAllComments(userState.userInfo.token, searchKeyword, currentPage),
    queryKey: "comments",
    deleteDataMessage: "Comment is deleted",
    mutateDeleteFn: ({ slug, token }) => {
      return deleteComment({
        commentId: slug,
        token,
      });
    },
  });

  const { mutate: mutateUpdateCommentCheck } = useMutation({
    mutationFn: ({ token, check, commentId }: TUpdateComment) => {
      return updateComment({ token, check, commentId });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      toast.success(
        data?.check ? "Comment is approved" : "Comment is not approved"
      );
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  return (
    <Table
      pageTitle="Manage Comments"
      dataListName="Comments"
      searchInputPlaceHolder="Search Comments..."
      searchKeywordOnSubmitHandler={submitSearchKeywordHandler}
      searchKeywordOnChangeHandler={searchKeywordHandler}
      searchKeyword={searchKeyword}
      tableHeaderTitleList={[
        "Author",
        "Comment",
        "In Respond to",
        "Created At",
        "",
      ]}
      isLoading={isLoading}
      isFetching={isFetching}
      data={commentsData?.data?.comments}
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}
      paginationConfig={commentsData?.data?.config}
      titleForm="Create Post"
    >
      {commentsData?.data?.comments?.map?.((comment: TComment) => (
        <tr>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <a href="/" className="relative block">
                  <img
                    src={
                      comment?.user?.avatar
                        ? stables.UPLOAD_FOLDER_BASE_URL + comment?.user?.avatar
                        : images.userImage
                    }
                    alt={comment?.user?.name}
                    className="mx-auto object-cover rounded-lg w-10 aspect-square"
                  />
                </a>
              </div>
              <div className="ml-3">
                <p className="text-gray-900 whitespace-no-wrap">
                  {comment?.user?.name}
                </p>
              </div>
            </div>
          </td>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            {comment?.replyOnUser !== null && (
              <p className="text-gray-900 whitespace-no-wrap">
                In reply to{" "}
                <Link
                  to={`/blog/${comment?.post?.slug}/#comment-${comment?._id}`}
                  className="text-blue-500"
                >
                  {comment?.replyOnUser?.name}
                </Link>
              </p>
            )}
            <p className="text-gray-900 whitespace-no-wrap">{comment?.desc}</p>
          </td>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <p className="text-gray-900 whitespace-no-wrap">
              <Link
                to={`/blog/${comment?.post?.slug}`}
                className="text-blue-500"
              >
                {comment?.post?.title}
              </Link>
            </p>
          </td>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <p className="text-gray-900 whitespace-no-wrap">
              {new Date(comment.createdAt).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
                hour: "numeric",
                minute: "numeric",
              })}
            </p>
          </td>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 space-x-5">
            <button
              disabled={isPendingDeleteData}
              type="button"
              className={`${
                comment?.check
                  ? "text-yellow-600 hover:text-yellow-900"
                  : "text-green-600 hover:text-green-900"
              } disabled:opacity-70 disabled:cursor-not-allowed`}
              onClick={() => {
                mutateUpdateCommentCheck({
                  token: userState.userInfo.token,
                  check: comment?.check ? false : true,
                  commentId: comment._id,
                });
              }}
            >
              {comment?.check ? "Unapprove" : "Approve"}
            </button>
            <button
              disabled={isPendingDeleteData}
              type="button"
              className="text-red-600 hover:text-red-900 disabled:opacity-70 disabled:cursor-not-allowed"
              onClick={() => {
                deleteDataHandler({
                  slug: comment?._id,
                  token: userState.userInfo.token,
                });
              }}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </Table>
  );
};

export default Comments;

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useAppSelector } from "../../hooks";
import { TUserState } from "../../types/user";
import {
  createNewComment,
  deleteComment,
  updateComment,
} from "../../services/comment";
import toast from "react-hot-toast";
import CommentForm from "./CommentForm";
import Comment from "./Comment";

export const getCommentsData = [
  {
    _id: "10",
    user: {
      _id: "a",
      name: "Mohammad Rezaii",
    },
    desc: "it was a nice post, Thank you!",
    post: "1",
    parent: null,
    replyOnUser: null,
    createdAt: "2022-12-31T17:22:05.092+0000",
  },
  {
    _id: "11",
    user: {
      _id: "b",
      name: "Paul M. Williams",
    },
    desc: "a reply for Mohammad",
    post: "1",
    parent: "10",
    replyOnUser: "a",
    createdAt: "2022-12-31T17:22:05.092+0000",
  },
  {
    _id: "12",
    user: {
      _id: "b",
      name: "Paul M. Williams",
    },
    desc: "keep it up bro <3",
    post: "1",
    parent: null,
    replyOnUser: null,
    createdAt: "2022-12-31T17:22:05.092+0000",
  },
  {
    _id: "13",
    user: {
      _id: "c",
      name: "Jessica C. Stephens",
    },
    desc: "I'm always interested in your content :)",
    post: "1",
    parent: null,
    replyOnUser: null,
    createdAt: "2022-12-31T17:22:05.092+0000",
  },
];

type CommentsContainerProps = {
  comments: any;
  className: string;
  userId: string;
  postSlug: string;
  refetch: any;
};

const CommentsContainer = ({
  comments,
  className,
  userId,
  postSlug,
  refetch,
}: CommentsContainerProps) => {
  const queryClient = useQueryClient();
  const userState = useAppSelector((state: TUserState) => state.user);
  const [affectedComment, setAffectedComment] =
    useState<TAffectedComment>(null);

  const { mutate: mutateNewComment, isPending: isPendingNewComment } =
    useMutation({
      mutationFn: ({
        token,
        desc,
        slug,
        parent,
        replyOnUser,
      }: TCreateComment) => {
        return createNewComment({ token, desc, slug, parent, replyOnUser });
      },
      onSuccess: () => {
        toast.success(
          "Your comment is sent successfully, it will be visible after the confirmation of the Admin"
        );
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });

  const { mutate: mutateUpdateComment } = useMutation({
    mutationFn: ({
      token,
      desc,
      commentId,
    }: {
      token: string;
      desc: string;
      commentId: string;
    }) => {
      return updateComment({ token, desc, commentId });
    },
    onSuccess: () => {
      toast.success("Your comment is updated successfully");
      queryClient.invalidateQueries({ queryKey: ["blog", postSlug] });
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const { mutate: mutateDeleteComment } = useMutation({
    mutationFn: ({
      token,
      commentId,
    }: {
      token: string;
      commentId: string;
    }) => {
      return deleteComment({ token, commentId });
    },
    onSuccess: () => {
      toast.success("Your comment is deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["blog", postSlug] });
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const addCommentHandler = (
    value: string,
    parent = null,
    replyOnUser = null
  ) => {
    mutateNewComment({
      desc: value,
      parent,
      replyOnUser,
      token: userState.userInfo.token,
      slug: postSlug,
    });
  };

  const updateCommentHandler = (value: string, commentId: string) => {
    mutateUpdateComment({
      token: userState.userInfo.token,
      desc: value,
      commentId,
    });
    refetch();
    setAffectedComment(null);
  };

  const deleteCommentHandler = (commentId: string) => {
    mutateDeleteComment({ token: userState.userInfo.token, commentId });
    refetch();
  };

  return (
    <div className={className}>
      <CommentForm
        btnLabel="Send"
        formSubmitHandler={(value) => addCommentHandler(value)}
        pending={isPendingNewComment}
      />
      <div className="space-y-4 mt-8">
        {(comments ?? getCommentsData).map((comment: any) => (
          <Comment
            affectedComment={affectedComment}
            setAffectedComment={setAffectedComment}
            key={comment._id}
            comment={comment}
            userId={userId}
            deleteComment={deleteCommentHandler}
            updateComment={updateCommentHandler}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentsContainer;

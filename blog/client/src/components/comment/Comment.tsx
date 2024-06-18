import { FiEdit2, FiTrash } from "react-icons/fi";
import images from "../../constants/images";
import stables from "../../constants/stables";
import CommentForm from "./CommentForm";

type TCommentProps = {
  comment: any;
  userId: string;
  affectedComment: TAffectedComment;
  setAffectedComment: (value: TAffectedComment) => void;
  updateComment: (value: string, commentId: string) => void;
  deleteComment: (commentId: string) => void;
};

const Comment = ({
  comment,
  userId,
  affectedComment,
  setAffectedComment,
  updateComment,
  deleteComment,
}: TCommentProps) => {
  const commentBelongsToUser = userId === comment.user._id;

  const isEditing =
    affectedComment &&
    affectedComment.type === "editing" &&
    affectedComment._id === comment._id;

  return (
    <div
      className="flex flex-nowrap items-start gap-x-3 bg-[#F2F4F5] p-3 rounded-lg"
      id={`comment-${comment?._id}`}
    >
      <img
        src={
          comment?.user?.avatar
            ? stables.UPLOAD_FOLDER_BASE_URL + comment.user.avatar
            : images.userImage
        }
        alt="user profile"
        className="w-9 h-9 object-cover rounded-full"
      />
      <div className="flex-1 flex flex-col">
        <h5 className="font-bold text-dark-hard text-xs lg:text-sm">
          {comment.user.name}
        </h5>
        <span className="text-xs text-dark-light">
          {new Date(comment.createdAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
          })}
        </span>
        {!isEditing && (
          <p className="font-opensans mt-[10px] text-dark-light">
            {comment.desc}
          </p>
        )}
        {isEditing && (
          <CommentForm
            btnLabel="Update"
            formSubmitHandler={(value) => updateComment(value, comment._id)}
            formCancelHandler={() => setAffectedComment(null)}
            initialText={comment.desc}
          />
        )}
        <div className="flex items-center gap-x-3 text-dark-light font-roboto text-sm mt-3 mb-3">
          <>
            <button
              disabled={!commentBelongsToUser}
              className={`${
                !commentBelongsToUser && "cursor-no-drop"
              } flex items-center space-x-2`}
              onClick={() =>
                setAffectedComment({ type: "editing", _id: comment._id })
              }
            >
              <FiEdit2 className="w-4 h-auto" />
              <span>Edit</span>
            </button>
            <button
              disabled={!commentBelongsToUser}
              className={`${
                !commentBelongsToUser && "cursor-no-drop"
              } flex items-center space-x-2`}
              onClick={() => deleteComment(comment._id)}
            >
              <FiTrash className="w-4 h-auto" />
              <span>Delete</span>
            </button>
          </>
        </div>
      </div>
    </div>
  );
};

export default Comment;

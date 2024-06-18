import { useState } from "react";

type CommentFormProps = {
  btnLabel: string;
  formSubmitHandler: (value: string) => void;
  initialText?: string;
  pending?: boolean;
  formCancelHandler?: any;
};

const CommentForm = ({
  btnLabel,
  formSubmitHandler,
  initialText = "",
  pending = false,
  formCancelHandler,
}: CommentFormProps) => {
  const [value, setValue] = useState(initialText);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formSubmitHandler(value);
    setValue("");
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="flex flex-col items-end border border-primary rounded-lg p-4">
        <textarea
          className="w-full focus:outline-none bg-transparent"
          rows={5}
          placeholder="Leave your comment here..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        ></textarea>
      </div>

      <div className="flex flex-col-reverse gap-y-2 items-center gap-x-2 pt-2 min-[420px]:flex-row">
        {formCancelHandler && (
          <button
            onClick={formCancelHandler}
            className="px-6 py-2.5 rounded-lg border border-red-500 text-red-500"
          >
            Cancel
          </button>
        )}
        <button
          disabled={pending}
          type="submit"
          className="px-6 py-2.5 rounded-lg bg-primary
         text-white font-semibold disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {btnLabel}
        </button>
      </div>
    </form>
  );
};

export default CommentForm;

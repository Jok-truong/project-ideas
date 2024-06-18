import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { createPost } from "../services/post";
import toast from "react-hot-toast";
import { useAppSelector } from "../hooks";
import { TUserState } from "../types/user";
import { IoClose } from "react-icons/io5";

type Props = {
  setOpenForm: (value: boolean) => void;
  title: string;
};

type TInput = {
  title: string;
  caption: string;
};
const UpsertForm = ({ title, setOpenForm }: Props) => {
  const queryClient = useQueryClient();
  const userState = useAppSelector((state: TUserState) => state.user);

  const { mutate, isPending } = useMutation({
    mutationFn: ({ token, dataForm }: { token: string; dataForm: TInput }) => {
      return createPost<TInput>({
        token: token,
        dataForm: dataForm,
      });
    },
    onSuccess: (_data) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post is created, edit that now!");
    },

    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      title: "",
      caption: "",
      content: "",
    },
    mode: "onChange",
  });

  const submitHandler = (data: TInput) => {
    const { title, caption } = data;
    mutate({
      token: userState?.userInfo?.token,
      dataForm: {
        title: title,
        caption: caption,
      },
    });

    setOpenForm(false);
  };

  return (
    <div className="fixed z-[1000] inset-0 bg-black/50 flex justify-center p-5 overflow-auto">
      <div className="bg-white h-fit w-full sm:max-w-[350px] p-5 rounded-lg">
        <h1 className=" flex justify-between font-roboto text-2xl font-bold text-center text-dark-hard mb-8">
          {title}
          <IoClose
            className="cursor-pointer"
            onClick={() => setOpenForm(false)}
          />
        </h1>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="flex flex-col mb-6 w-full">
            <label
              htmlFor="title"
              className="text-[#5a7184] font-semibold block"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              {...register("title", {
                required: {
                  value: true,
                  message: "title is required",
                },
              })}
              placeholder="Enter title"
              className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${
                errors.title ? "border-red-500" : "border-[#c3cad9]"
              }`}
            />
            {errors.title?.message && (
              <p className="text-red-500 text-xs mt-1">
                {errors.title?.message}
              </p>
            )}
          </div>
          <div className="flex flex-col mb-6 w-full">
            <label
              htmlFor="caption"
              className="text-[#5a7184] font-semibold block"
            >
              caption
            </label>
            <input
              type="text"
              id="caption"
              {...register("caption", {
                required: {
                  value: true,
                  message: "caption is required",
                },
              })}
              placeholder="Enter caption"
              className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${
                errors.caption ? "border-red-500" : "border-[#c3cad9]"
              }`}
            />
            {errors.caption?.message && (
              <p className="text-red-500 text-xs mt-1">
                {errors.caption?.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!isValid || isPending}
            className="bg-primary text-white font-bold text-lg py-4 px-8 w-full rounded-lg my-6 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpsertForm;

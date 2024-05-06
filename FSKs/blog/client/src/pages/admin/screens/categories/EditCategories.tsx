import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getSingleCategory,
  updateCategory,
} from "../../../../services/postCategories";
import { useAppSelector } from "../../../../hooks";
import { TUserState } from "../../../../types/user";
import toast from "react-hot-toast";

const EditCategories = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { slug } = useParams();
  const userState = useAppSelector((state: TUserState) => state.user);

  const [categoryTitle, setCategoryTitle] = useState("");

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryFn: () => slug && getSingleCategory({ slug }),
    queryKey: ["categories", slug],
    refetchOnWindowFocus: false,
  });

  const { mutate: mutateUpdateCategory, isPending: isPendingUpdateCategory } =
    useMutation({
      mutationFn: ({
        title,
        slug,
        token,
      }: {
        token: string;
        title: string;
        slug: string;
      }) => {
        return updateCategory({
          title,
          slug,
          token,
        });
      },
      onSuccess: (_data) => {
        queryClient.invalidateQueries({ queryKey: ["categories", slug] });
        toast.success("Category is updated");
        navigate(`/admin/categories/manage`, {
          replace: true,
        });
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });

  useEffect(() => {
    if (isSuccess) {
      setCategoryTitle(data?.title);
    }
  }, [isSuccess]);

  const handleUpdateCategory = () => {
    if (!categoryTitle) return;
    mutateUpdateCategory({
      title: categoryTitle,
      slug: slug ?? "",
      token: userState.userInfo.token,
    });
  };

  return (
    <div className="col-span-4 py-8">
      <h4 className="text-lg leading-tight">Update Category</h4>
      <div className="d-form-control w-full mt-6">
        <input
          value={categoryTitle}
          className="d-input d-input-bordered border-slate-300 !outline-slate-300 text-xl font-medium font-roboto text-dark-hard"
          onChange={(e) => setCategoryTitle(e.target.value)}
          placeholder="category title"
        />
        <button
          disabled={isPendingUpdateCategory || isLoading || isError}
          type="button"
          onClick={handleUpdateCategory}
          className="w-fit mt-3 bg-green-500 text-white font-semibold rounded-lg px-4 py-2 disabled:cursor-not-allowed disabled:opacity-70"
        >
          Update Category
        </button>
      </div>
    </div>
  );
};

export default EditCategories;

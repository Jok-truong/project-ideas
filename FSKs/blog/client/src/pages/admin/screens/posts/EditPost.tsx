import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getSinglePost, updatePost } from "../../../../services/post";
import { Link, useNavigate, useParams } from "react-router-dom";
import stables from "../../../../constants/stables";
import { HiOutlineCamera } from "react-icons/hi";
import CreatableSelect from "react-select/creatable";
import Editor from "../../../../components/editor/Editor";
import { useAppSelector } from "../../../../hooks";
import { TUserState } from "../../../../types/user";
import toast from "react-hot-toast";
import ArticleDetailSkeleton from "../../../articleDetail/components/ArticleDetailSkeleton";
import ErrorMessage from "../../../../components/ErrorMessage";
import MultiSelectTagDropdown from "../../components/select-dropdown/MultiSelectTagDropdown";
import { getAllCategories } from "../../../../services/postCategories";
import { categoryToOption, filterCategories } from "../../../../utils";
import { TCategoryOption } from "../../../../types/postCategories";

const promiseOptions = async (inputValue: string) => {
  const {
    data: { categories },
  } = await getAllCategories();
  console.log(categories, "categories");

  return filterCategories(inputValue, categories);
};

const EditPost = () => {
  const { slug } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const userState = useAppSelector((state: TUserState) => state.user);

  const [initialPhoto, setInitialPhoto] = useState<string | null>(null);
  const [photo, setPhoto] = useState<null | File>(null);
  const [body, setBody] = useState(null);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<null | string[]>(null);
  const [caption, setCaption] = useState("");
  const [categories, setCategories] = useState<null | string[]>(null);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryFn: () => slug && getSinglePost({ slug: slug }),
    queryKey: ["blog", slug],
    refetchOnWindowFocus: false,
  });

  const { mutate: mutateUpdatePostDetail, isPending: isPendingPostDetail } =
    useMutation({
      mutationFn: ({
        updatedData,
        slug,
        token,
      }: {
        updatedData: FormData;
        slug: string;
        token: string;
      }) => {
        return updatePost({
          updatedData,
          slug,
          token,
        });
      },
      onSuccess: (_data) => {
        queryClient.invalidateQueries({ queryKey: ["blog", slug] });
        toast.success("Post is updated");
        navigate(`/admin/posts/manage`, { replace: true });
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });

  useEffect(() => {
    if (isSuccess) {
      setInitialPhoto(data?.photo);
      setTitle(data?.title);
      setTags(data.tags);
    }
  }, [isSuccess]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    file && setPhoto(file);
  };

  const handleDeleteImage = () => {
    if (window.confirm("Do you want to delete your Post picture?")) {
      setInitialPhoto(null);
      setPhoto(null);
    }
  };

  const handleUpdatePost = async () => {
    let updatedData = new FormData();

    if (!initialPhoto && photo) {
      updatedData.append("postPicture", photo);
    } else if (initialPhoto && !photo) {
      const urlToObject = async (url: string) => {
        let response = await fetch(url);
        let blob = await response.blob();
        const file = new File([blob], initialPhoto, { type: blob.type });
        return file;
      };
      const picture = await urlToObject(
        stables.UPLOAD_FOLDER_BASE_URL + data?.photo
      );

      updatedData.append("postPicture", picture);
    }

    updatedData.append(
      "document",
      JSON.stringify({ body, categories, title, tags, caption })
    );

    mutateUpdatePostDetail({
      updatedData,
      slug: slug ?? "",
      token: userState.userInfo.token,
    });
  };

  let isPostDataLoaded = !isLoading && !isError;

  return (
    <>
      {isLoading ? (
        <ArticleDetailSkeleton />
      ) : isError ? (
        <ErrorMessage message="Couldn't fetch the post detail" />
      ) : (
        <section className="container mx-auto max-w-5xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start">
          <article className="flex-1">
            <label htmlFor="postPicture" className="w-full cursor-pointer">
              {photo ? (
                <img
                  src={URL.createObjectURL(photo)}
                  alt={data?.title}
                  className="rounded-xl w-full"
                />
              ) : initialPhoto ? (
                <img
                  src={stables.UPLOAD_FOLDER_BASE_URL + data?.photo}
                  alt={data?.title}
                  className="rounded-xl w-full"
                />
              ) : (
                <div className="w-full min-h-[200px] border-2 rounded-lg bg-blue-50/50 flex justify-center items-center">
                  <HiOutlineCamera className="w-7 h-auto text-primary" />
                </div>
              )}
            </label>
            <input
              type="file"
              className="sr-only"
              id="postPicture"
              onChange={(e) => handleFileChange(e)}
            />
            <button
              type="button"
              onClick={handleDeleteImage}
              className="w-fit bg-red-500 text-sm text-white font-semibold rounded-lg px-2 py-1 mt-5"
            >
              Delete Image
            </button>
            <div className="mt-4 flex gap-2">
              {data?.categories?.map((category: { name: string }) => (
                <Link
                  to={`/blog?category=${category.name}`}
                  className="text-primary text-sm font-roboto inline-block md:text-base"
                >
                  {category.name}
                </Link>
              ))}
            </div>
            <div className="d-form-control w-full">
              <label className="d-label" htmlFor="title">
                <span className="d-label-text">Title</span>
              </label>
              <input
                id="title"
                value={title}
                className="d-input d-input-bordered border-slate-300 !outline-slate-300 text-xl font-medium font-roboto text-dark-hard"
                onChange={(e) => setTitle(e.target.value)}
                placeholder="title"
              />
            </div>
            <div className="d-form-control w-full">
              <label className="d-label" htmlFor="caption">
                <span className="d-label-text">Caption</span>
              </label>
              <input
                id="caption"
                value={caption}
                className="d-input d-input-bordered border-slate-300 !outline-slate-300 text-xl font-medium font-roboto text-dark-hard"
                onChange={(e) => setCaption(e.target.value)}
                placeholder="caption"
              />
            </div>

            <div className="d-form-control w-full">
              <label className="d-label">
                <span className="d-label-text">Categories</span>
              </label>
              {isPostDataLoaded && (
                <MultiSelectTagDropdown
                  loadOptions={promiseOptions}
                  defaultValue={data.categories.map(categoryToOption)}
                  onChange={(newValue: TCategoryOption[]) =>
                    setCategories(newValue.map((item) => item.value))
                  }
                />
              )}
            </div>

            <div className="mb-5 mt-2">
              <label className="d-label">
                <span className="d-label-text">Tags</span>
              </label>
              {isPostDataLoaded && (
                <CreatableSelect
                  defaultValue={data?.tags.map((tag: string) => ({
                    value: tag,
                    label: tag,
                  }))}
                  isMulti
                  onChange={(newValue) =>
                    setTags(newValue.map((item) => item.value))
                  }
                  className="relative z-[15]"
                />
              )}
            </div>
            <div className="w-full">
              {isPostDataLoaded && (
                <Editor
                  content={data?.body}
                  editable={true}
                  onDataChange={(data: any) => {
                    setBody(data);
                  }}
                />
              )}
            </div>

            <button
              disabled={isPendingPostDetail}
              type="button"
              onClick={handleUpdatePost}
              className="w-full bg-green-500 text-white font-semibold rounded-lg px-4 py-2 disabled:cursor-not-allowed disabled:opacity-70"
            >
              Update Post
            </button>
          </article>
        </section>
      )}
    </>
  );
};

export default EditPost;

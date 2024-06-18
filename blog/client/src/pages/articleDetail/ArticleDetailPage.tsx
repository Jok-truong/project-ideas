import { Link, useParams } from "react-router-dom";
import MainLayout from "../../components/MainLayout";
import ArticleDetailSkeleton from "./components/ArticleDetailSkeleton";
import ErrorMessage from "../../components/ErrorMessage";
import { getAllPosts, getSinglePost } from "../../services/post";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks";
import { TUserState } from "../../types/user";
import BreadCrumbs from "../../components/BreadCrumbs";
import stables from "../../constants/stables";
import images from "../../constants/images";
import Editor from "../../components/editor/Editor";
import CommentsContainer from "../../components/comment/CommentsContainer";
import { getAllComments } from "../../services/comment";
import SuggestedPosts from "./components/SuggestedPosts";
import SocialShareButtons from "../../components/SocialShareButtons";

export type TBreadCrumb = { name: string; link: string };

const ArticleDetailPage = () => {
  const { slug } = useParams();

  const userState = useAppSelector((state: TUserState) => state.user);

  const [breadCrumbsData, setBreadCrumbsData] = useState<TBreadCrumb[]>([]);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryFn: () => slug && getSinglePost({ slug }),
    queryKey: ["blog", slug],
  });

  const { data: postsData } = useQuery({
    queryFn: () => getAllPosts(),
    queryKey: ["posts"],
  });

  const { data: commentsData, refetch } = useQuery({
    queryFn: () => getAllComments(userState.userInfo.token),
    queryKey: ["comments"],
  });

  const comments = commentsData?.data?.comments?.filter((comment: any) => {
    if (comment?.check && data?.slug === comment?.post?.slug) {
      return comment;
    }
    return null;
  });

  useEffect(() => {
    if (isSuccess) {
      setBreadCrumbsData([
        { name: "Home", link: "/" },
        { name: "Blog", link: "/blog" },
        { name: "Article title", link: `/blog/${data.slug}` },
      ]);
    }
  }, [isSuccess]);

  return (
    <MainLayout>
      {isLoading ? (
        <ArticleDetailSkeleton />
      ) : isError ? (
        <ErrorMessage message="Couldn't fetch the post detail" />
      ) : (
        <>
          <section className="container mx-auto max-w-5xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start">
            <article className="flex-1">
              <BreadCrumbs data={breadCrumbsData} />
              <img
                className="rounded-xl w-full"
                src={
                  data?.photo
                    ? stables.UPLOAD_FOLDER_BASE_URL + data?.photo
                    : images.samplePostImage
                }
                alt={data?.title}
              />
              <div className="mt-4 flex gap-2">
                {data?.categories.map((category: { name: string }) => (
                  <Link
                    to={`/blog?category=${category.name}`}
                    className="text-primary text-sm font-roboto inline-block md:text-base"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
              <h1 className="text-xl font-medium font-roboto mt-4 text-dark-hard md:text-[26px]">
                {data?.title}
              </h1>
              <div className="w-full">
                {!isLoading && !isError && (
                  <Editor content={data?.body} editable={false} />
                )}
              </div>
              <CommentsContainer
                refetch={refetch}
                comments={comments}
                className="mt-10"
                userId={userState?.userInfo?._id}
                postSlug={slug ?? ""}
              />
            </article>

            <>
              <SuggestedPosts
                header="Latest Article"
                posts={postsData?.data?.posts}
                tags={data?.tags}
                className="mt-8 lg:mt-0 lg:max-w-xs"
              />
            </>
          </section>
          <div className="mt-7 d-form-control items-center">
            <h2 className="font-roboto font-medium text-dark-hard mb-4 md:text-xl">
              Share on:
            </h2>
            <SocialShareButtons
              url={encodeURI(window.location.href)}
              title={encodeURIComponent(data?.title)}
            />
          </div>
        </>
      )}
    </MainLayout>
  );
};

export default ArticleDetailPage;

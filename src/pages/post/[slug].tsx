import {
  Author,
  Categories,
  Comments,
  CommentsForm,
  PostDetail,
  PostWidget,
} from "@/components";
import { getPostDetails } from "@/services";
import { PostDB } from "@/types";
import { GetServerSideProps, NextPage } from "next/types";

type SinglePostPageProps = {
  post: PostDB;
};

const SinglePostPage: NextPage<SinglePostPageProps> = ({ post }) => {
  return (
    <div className="container px-10 mx-auto mb-8">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="col-span-1 lg:col-span-8">
          <PostDetail post={post} />
          <Author author={post.author} />
          <CommentsForm slug={post.slug} />
          <Comments slug={post.slug} />
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <PostWidget
              slug={post.slug}
              categories={post.categories.map((category) => category.slug)}
            />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  let data;
  if (params) {
    const { slug } = params;
    data = await getPostDetails(slug as string);
  }
  return {
    props: { post: data },
  };
};

export default SinglePostPage;

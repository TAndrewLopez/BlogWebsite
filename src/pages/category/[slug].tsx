import { Loader, PostCard } from "@/components";
import { getCategoryPost } from "@/services";
import { PostDB } from "@/types";
import { useRouter } from "next/router";
import { GetServerSideProps, NextPage } from "next/types";

interface CategoryPageProps {
  posts: Array<{
    node: PostDB;
  }>;
}

const CategoryPage: NextPage<CategoryPageProps> = ({ posts }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <div className="container px-10 mx-auto mb-8">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="col-span-1 lg:col-span-8">
          {posts.map((post, i) => (
            <PostCard post={post.node} key={i} />
          ))}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8"></div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  let posts;
  if (params) {
    const { slug } = params;
    posts = await getCategoryPost(slug as string);
  }
  return {
    props: { posts },
  };
};

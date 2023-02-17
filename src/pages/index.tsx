import { Categories, PostWidget, PostCard, FeaturedPost } from "@/components";
import { getPosts } from "@/services";
import { GetServerSideProps, GetStaticProps, NextPage } from "next";

type HomeProps = {
  posts: Array<any>;
};

const Home: NextPage<HomeProps> = ({ posts }) => {
  return (
    <div className="container px-10 mx-auto mb-8">
      <FeaturedPost />
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="col-span-1 lg:col-span-8">
          {posts.map((post, i) => (
            <PostCard post={post.node} key={i} />
          ))}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = (await getPosts()) || [];
  return {
    props: {
      posts,
    },
  };
};

export default Home;

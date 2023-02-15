import { Categories, PostWidget, PostCard } from "../components";
import { getPosts } from "@/services";
import { NextPage } from "next";

const posts: Array<{ title: string; excerpt: string }> = [
  { title: "Introduction", excerpt: "Learn something about your developer" },
  { title: "Seconds Post", excerpt: "We are blogging now" },
  {
    title: "Third Post",
    excerpt:
      "Now I can write post that are so long because it is so natural and I can do this all day every day. The trick is not to overthink but just go with the flow, be like water, RIP Bruce Lee",
  },
];

interface HomeProps {
  posts: [];
}

const Home: NextPage<HomeProps> = ({ posts }) => {
  return (
    <div className="container px-10 mx-auto mb-8">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="col-span-1 lg:col-span-8">
          {posts?.map((post, i) => (
            <PostCard post={post} key={i} />
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

export const getStaticProps = async () => {
  const posts = (await getPosts()) || [];

  return {
    props: {
      posts,
    },
  };
};
export default Home;

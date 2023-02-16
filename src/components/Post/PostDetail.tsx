import { PostDB } from "@/types";

interface PostDetailProps {
  post: PostDB;
}

const PostDetail: React.FC<PostDetailProps> = ({ post }) => {
  return (
    <div>
      <h1>PostDetail</h1>
      <h1>{post.title}</h1>
    </div>
  );
};

export default PostDetail;

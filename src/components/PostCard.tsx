interface PostCardProps {
  post: {
    title: string;
    excerpt: string;
  };
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div>
      {post.title}
      {post.excerpt}
    </div>
  );
};

export default PostCard;

import moments from "moment";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getRecentPosts, getSimilarPosts } from "@/services";

interface PostWidgetProps {
  slug: string;
  categories: Array<string>;
}

const PostWidget: React.FC<PostWidgetProps> = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((result) =>
        setRelatedPosts(result)
      );
    } else {
      getRecentPosts().then((result) => setRelatedPosts(result));
    }
  }, []);

  console.log(relatedPosts);

  return <div>PostWidget</div>;
};

export default PostWidget;

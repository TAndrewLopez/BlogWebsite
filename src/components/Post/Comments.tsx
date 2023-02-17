import { useState, useEffect } from "react";
import moment from "moment";
import parse from "html-react-parser";
import { getComments } from "@/services";
import { CommentDB } from "@/types";

interface CommentsProps {
  slug: string;
}

const Comments: React.FC<CommentsProps> = ({ slug }) => {
  const [comments, setComments] = useState<Array<CommentDB>>([]);

  useEffect(() => {
    getComments(slug).then((res) => setComments(res));
  }, []);

  console.log(comments);
  return (
    <>
      {comments.length > 0 && (
        <div className="p-8 pb-12 mb-8 bg-white rounded-lg shadow-lg">
          <h3 className="pb-4 mb-8 text-xl font-semibold border-b">
            {comments.length} Comments
          </h3>
          {comments.map((comment) => (
            <div
              className="pb-4 mb-4 border-b border-gray-100"
              key={comment.createdAt}>
              <p className="mb-4">
                <span className="font-semibold">
                  {comment.name} on{" "}
                  {moment(comment.createdAt).format("MMM DD, YYYY")}
                </span>
              </p>
              <p className="w-full text-gray-600 whitespace-pre-line">
                {parse(comment.comment)}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Comments;

import { useState, useEffect, useRef } from "react";
import { submitComment } from "@/services";

interface CommentsFormProps {
  slug: string;
}

const CommentsForm: React.FC<CommentsFormProps> = ({ slug }) => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const commentEl = useRef<HTMLTextAreaElement>(null);
  const nameEl = useRef<HTMLInputElement | null>(null);
  const emailEl = useRef<null | HTMLInputElement>(null);
  const storeDataEl = useRef<HTMLInputElement>(null);

  const handleCommentSubmission = () => {
    setError(false);
    const { value: comment } = commentEl.current!;
    const { value: name } = nameEl.current!;
    const { value: email } = emailEl.current!;
    const { checked: storeData } = storeDataEl.current!;

    if (!comment || !name || !email) {
      setError(true);
      return;
    }
    const commentObj = {
      name,
      email,
      comment,
      slug,
    };

    if (storeData && window) {
      window.localStorage.setItem("name", name);
      window.localStorage.setItem("email", email);
    } else {
      window.localStorage.removeItem("name");
      window.localStorage.removeItem("email");
    }

    submitComment(commentObj).then((res) => {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2500);
    });
  };

  useEffect(() => {
    if (window) {
      if (nameEl.current && emailEl.current) {
        nameEl.current.value = window.localStorage.getItem("name") as string;
        emailEl.current.value = window.localStorage.getItem("email") as string;
      }
    }
  }, []);

  return (
    <div className="p-8 pb-12 mb-8 bg-white rounded-lg shadow-lg">
      <h3 className="pb-4 mb-8 text-xl font-semibold border-b">
        Leave a reply
      </h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea
          ref={commentEl}
          className="w-full p-4 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
          placeholder="Comment"
          name="comment"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4 lg:grid-cols-2">
        <input
          ref={nameEl}
          type="text"
          className="w-full px-4 py-2 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
          placeholder="Name"
          name="name"
        />
        <input
          ref={emailEl}
          type="email"
          className="w-full px-4 py-2 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
          placeholder="Email"
          name="email"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input
            ref={storeDataEl}
            type="checkbox"
            id="storeData"
            name="storeData"
            value="true"
          />
          <label
            className="ml-2 text-gray-500 cursor-pointer"
            htmlFor="storeData">
            Save my email and name for the next time I comment.
          </label>
        </div>
      </div>
      {error && (
        <p className="text-xs text-red-500">All fields are required.</p>
      )}
      <div className="mt-8">
        <button
          type="button"
          onClick={handleCommentSubmission}
          className="inline-block px-8 py-3 text-lg text-white transition duration-500 bg-pink-600 rounded-full cursor-pointer ease hover:bg-indigo-900">
          Post Comment
        </button>
        {showSuccess && (
          <span className="float-right mt-3 text-xl font-semibold text-green-500">
            Comment submitted for review.
          </span>
        )}
      </div>
    </div>
  );
};

export default CommentsForm;

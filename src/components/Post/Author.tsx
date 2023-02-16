import { AuthorDB } from "@/types";

interface AuthorProps {
  author: AuthorDB;
}

const Author: React.FC<AuthorProps> = ({ author }) => {
  return (
    <div>
      <h1>Author</h1>
    </div>
  );
};

export default Author;

import { AuthorDB } from "@/types";
import Image from "next/image";

interface AuthorProps {
  author: AuthorDB;
}

const Author: React.FC<AuthorProps> = ({ author }) => {
  return (
    <div className="relative p-12 mt-20 mb-8 text-center bg-black rounded-lg bg-opacity-20">
      <div className="absolute left-0 right-0 flex justify-center -top-14 item-center">
        <Image
          alt={author.name}
          height="100"
          width="100"
          className="align-middle rounded-full"
          src={author.photo?.url as string}
          unoptimized
        />
      </div>
      <h3 className="my-4 text-xl font-bold text-white">{author.name}</h3>
      <p className="text-lg text-white">{author.bio}</p>
    </div>
  );
};

export default Author;

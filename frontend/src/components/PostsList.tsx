import { useEffect, useState } from "react";
import { PostProps } from "../types/types";
import PostCard from "./PostCard";

const getData = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");

  if (!res.ok) {
    throw new Error("Something went wrong");
  }
  return res.json();
};

const PostsList: React.FC = () => {
  const [data, setData] = useState<PostProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData();
        // console.log(result);
        setData(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = (postId: number) => {
    const filterData = data.filter((post) => post.id !== postId);
    setData(filterData);
  };

  return (
    <>
      {data.map((post: PostProps) => (
        <PostCard
          key={post.id}
          id={post.id}
          title={post.title}
          body={post.body}
          onDelete={handleDelete}
        />
      ))}
    </>
  );
};

export default PostsList;

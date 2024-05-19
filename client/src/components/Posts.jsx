import React, { useEffect, useState } from "react";
import PostItem from "./PostItem";
import axios from "axios";
import Loader from "../components/Loader";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/posts`
        );
        setPosts(response?.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    fetchPost();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="posts">
      {posts.length > 0 ? (
        <div className="container post_container">
          {posts.map((post) => (
            <PostItem key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <h2 className="center">No posts founds</h2>
      )}
    </section>
  );
};

export default Posts;

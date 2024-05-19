import React, { useState, useEffect } from "react";
import PostItem from "../components/PostItem";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";

const CategoryPosts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { category } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/posts/categories/${category}`
        );
        setPosts(response?.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    fetchPost();
  }, [category]);

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

export default CategoryPosts;

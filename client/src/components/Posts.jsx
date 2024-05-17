import React, { useState } from "react";
import PostItem from "./PostItem";
import { DUMMY_POSTS } from "../data";

const Posts = () => {
  const [posts, setPosts] = useState(DUMMY_POSTS);

  return (
    <section className="posts">
      {posts.length > 0 ? (
        <div className="container post_container">
          {posts.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <h2 className="center">No posts founds</h2>
      )}
    </section>
  );
};

export default Posts;

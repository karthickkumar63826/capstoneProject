import React from "react";
import { Link } from "react-router-dom";
import PostAuthor from "./PostAuthor";

const PostItem = ({ post }) => {
  const shortDescription =
    post.desc.length > 145 ? post.desc.substr(0, 145) + "..." : post.desc;
  const shortTitle =
    post.title.length > 30 ? post.title.substr(0, 30) + "..." : post.title;
  return (
    <article className="post">
      <div className="post_thumbnail">
        <img src={post.thumbnail} alt={post.title} />
      </div>
      <div className="post_content">
        <Link to={`/posts/${post.id}`}>
          <h3>{shortTitle}</h3>
        </Link>
        <p>{shortDescription}</p>
        <div className="post_footer">
          <PostAuthor />
          <Link
            to={`/posts/categories/${post.category}`}
            className="btn category"
          >
            {post.category}
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PostItem;

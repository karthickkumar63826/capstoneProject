import React from "react";
import { Link } from "react-router-dom";
import PostAuthor from "./PostAuthor";

const PostItem = ({ post }) => {
  const shortdescription =
    post.description.length > 145
      ? post.description.substr(0, 145) + "..."
      : post.description;
  const shortTitle =
    post.title.length > 30 ? post.title.substr(0, 30) + "..." : post.title;
  return (
    <article className="post">
      <div className="post_thumbnail">
        <img
          src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${post.thumbnail}`}
          alt={post.title}
        />
      </div>
      <div className="post_content">
        <Link to={`/posts/${post._id}`}>
          <h3>{shortTitle}</h3>
        </Link>
        <p dangerouslySetInnerHTML={{ __html: shortdescription }} />

        <div className="post_footer">
          <PostAuthor authorId={post.creator} createdAt={post.createdAt} />
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

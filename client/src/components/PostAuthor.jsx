import React from "react";
import Avatar from "../images/avatar1.jpg";
import { Link } from "react-router-dom";

const PostAuthor = ({createdAt, authorId}) => {
  return (
    <Link to={`/posts/users/sdfsdf`} className="post_author">
      <div className="post_author-avatar">
        <img src={Avatar} alt="" />
      </div>
      <div className="post_author-details">
        <h5>By: Ernest Achiever</h5>
        <small>Just Now</small>
      </div>
    </Link>
  );
};

export default PostAuthor;

import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Avatar1 from "../images/avatar1.jpg";
import Avatar2 from "../images/avatar2.jpg";
import Avatar3 from "../images/avatar3.jpg";
import Avatar4 from "../images/avatar4.jpg";
import Avatar5 from "../images/avatar5.jpg";

const authorsData = [
  { id: 1, avatar: Avatar1, name: "Ernest Achiever", posts: 3 },
  { id: 2, avatar: Avatar2, name: "Jane Don", posts: 5 },
  { id: 3, avatar: Avatar3, name: "Dramani Mahama", posts: 0 },
  { id: 4, avatar: Avatar4, name: "Nana Addo", posts: 2 },
  { id: 5, avatar: Avatar5, name: "Najia Bintu", posts: 1 },
];

const Authors = () => {
  const [authors, setAuthors] = useState(authorsData);

  return (
    <section className="authors">
      {authors.length > 0 ? (
        <div className="container authors_container">
          {authors.map((author) => (
            <Link
              key={author.id}
              to={`/posts/users/${author.id}`}
              className="author"
            >
              <div className="author_avatar">
                <img src={author.avatar} alt="" />
              </div>
              <div className="author_info">
                <h4>{author.name}</h4>
                <p>Posts : {author.posts}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <h2 className="center">No users/author found</h2>
      )}
    </section>
  );
};

export default Authors;

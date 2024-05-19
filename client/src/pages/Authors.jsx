import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const getAuthors = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/users`
        );
        setAuthors(response.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    if (isLoading) {
      return <Loader />;
    }
    getAuthors();
  }, []);

  return (
    <section className="authors">
      {authors.length > 0 ? (
        <div className="container authors_container">
          {authors.map((author) => (
            <Link
              key={author.id}
              to={`/posts/users/${author._id}`}
              className="author"
            >
              <div className="author_avatar">
                <img
                  src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${author.avatar}`}
                  alt=""
                />
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

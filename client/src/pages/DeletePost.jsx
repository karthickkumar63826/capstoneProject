import React from "react";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";

const DeletePost = ({ id }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const token = currentUser?.token;

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  const removePost = async (id) => {
    setIsLoading(true);
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/posts/${id}`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.status);
      if (response.status == 200) {
        if (location.pathname == `/myposts/${currentUser.id}`) {
          navigate(0);
        } else {
          navigate("/");
        }
      }
      navigate("/");
      setIsLoading(false);
    } catch (err) {
      console.log("Couldn't delete the post");
      console.log(err);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Link className="btn sm danger" onClick={() => removePost(id)}>
      Delete
    </Link>
  );
};

export default DeletePost;

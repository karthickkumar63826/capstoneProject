import React from "react";
import { useEffect, useContext } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const DeletePost = () => {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const token = currentUser?.token;

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  return <Link className="btn sm danger">Delete</Link>;
};

export default DeletePost;

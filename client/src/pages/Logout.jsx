import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

const Logout = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  console.log(currentUser);
  setCurrentUser(null);
  navigate("/login");

  return <></>;
};

export default Logout;

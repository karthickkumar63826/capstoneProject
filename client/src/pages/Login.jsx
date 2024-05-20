import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/userContext";

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { setCurrentUser } = useContext(UserContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users/login`,
        userData
      );
      console.log(response);
      const user = await response.data;
      console.log(user);
      setCurrentUser(user);
      navigate("/");
    } catch (err) {
      console.log(err.response.data.message);
      setError(err.response.data.message);
    }
  };

  return (
    <section className="register">
      <div className="container">
        <h2>Sign In</h2>
        <form className="form register_form" onSubmit={handleLogin}>
          {error && <p className="form_error-message">{error}</p>}

          <input
            type="email"
            placeholder=" Email"
            name="email"
            value={userData.email}
            onChange={(e) => handleChange(e)}
            autoFocus
          />
          <input
            type="password"
            placeholder=" Password"
            name="password"
            value={userData.password}
            onChange={(e) => handleChange(e)}
          />
          <button type="submit" className="btn primary">
            Submit
          </button>
        </form>
        <small>
          Dont have an account? <Link to="/register">sign up</Link>
        </small>
      </div>
    </section>
  );
};

export default Login;

import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <section className="register">
      <div className="container">
        <h2>Sign In</h2>
        <form className="form register_form">
          <p className="form_error-message">This is an error message</p>

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

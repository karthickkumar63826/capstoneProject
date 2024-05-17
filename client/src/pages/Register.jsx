import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <section className="register">
      <div className="container">
        <h2>Sign Up</h2>
        <form className="form register_form">
          <p className="form_error-message">This is an error message</p>
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            value={userData.name}
            onChange={(e) => handleChange(e)}
            autoFocus
          />
          <input
            type="email"
            placeholder=" Email"
            name="email"
            value={userData.email}
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder=" Password"
            name="password"
            value={userData.password}
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm password"
            name="password2"
            value={userData.password2}
            onChange={(e) => handleChange(e)}
          />
          <button type="submit" className="btn primary">
            Submit
          </button>
        </form>
        <small>
          Already have an account? <Link to="/login">sign in</Link>
        </small>
      </div>
    </section>
  );
};

export default Register;

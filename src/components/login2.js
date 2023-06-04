import { React, useRef, useState } from "react";
import { Form, Label, FormGroup, Input, Col, Button } from "reactstrap";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmitLogin(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch {
      setError("Incorrect Username or Password");
    }

    setLoading(false);
  }

  return (
    <>
      <img
        src="./logo_scroll.png"
        alt="logo"
        className="logo"
      />

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmitLogin}>
        <div>
          <label className="label">Username:</label>
          <input
            type="email"
            id="email"
            ref={emailRef}
            required
            className="input"
          />
        </div>
        <div>
          <label className="label">Password:</label>
          <input
            type="password"
            id="pass"
            ref={passwordRef}
            required
            className="input"
          />
        </div>
        <p className="signup-text">
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
        <button
          type="submit"
          disabled={loading}
          className="signin-button"
        >
          Sign in
        </button>
      </form>
    </>
  );
};

export default Login;

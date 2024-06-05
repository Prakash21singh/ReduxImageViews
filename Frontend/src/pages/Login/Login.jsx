import React, { useEffect, useState } from "react";
import "./style.scss";
import InputField from "../../components/input/InputField";
import Button from "../../components/Button/Button";
import { Link, redirect, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../feature/auth/authSlice";
import Loader from "../../components/Loader/Loader";

const Login = () => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [err, setError] = useState("");

  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.User.User
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, []);

  function handleLogin(e) {
    e.preventDefault();
    setError("");
    if (email === "") {
      setError("Email is required");
      return;
    }
    if (password === "") {
      setError("Password is required");
      return;
    }
    let userCredentials = {
      email,
      password,
    };
    dispatch(loginUser(userCredentials))
      .then((result) => {
        if (result.payload) {
          setEmail("");
          setPassword("");
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="loginContainer">
      <h1>Login Form</h1>
      {loading && <Loader />}
      <form onSubmit={handleLogin}>
        <InputField
          placeholder={"Enter Your email"}
          value={email}
          type={"text"}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <InputField
          placeholder={"Enter your password"}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        {err ? <div className="errorMessage">{err ? err : ""}</div> : ""}
        {error ? <div className="errorMessage">{error ? error : ""}</div> : ""}
        <Button text={"Login"} />
      </form>
      <p>
        Didn't have an account? <Link to={"/register"}>Register Now</Link>
      </p>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import "./style.scss";
import InputField from "../../components/input/InputField";
import Button from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { config } from "../../config/env.config";
import Loader from "../../components/Loader/Loader";
const Register = () => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [error, setError] = useState("");
  let [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  function handleRegister(e) {
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

    setLoading(true);
    let formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    axios
      .post(`${config.VITE_BACKEND}/register`, formData)
      .then((res) => {
        console.log(res.data);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  return (
    <div className="registerContainer">
      <h1>Register Form</h1>
      {loading && <Loader />}
      <form onSubmit={handleRegister}>
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
        {error ? <div className="errorMessage">{error ? error : ""}</div> : ""}
        <Button text={"SignUp"} />
      </form>

      <p>
        Already have an account? <Link to={"/login"}>Log in</Link>
      </p>
    </div>
  );
};

export default Register;

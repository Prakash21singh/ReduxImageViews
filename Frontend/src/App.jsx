import { NavLink, Outlet, useNavigate } from "react-router-dom";
import InputField from "./components/input/InputField";
import Button from "./components/Button/Button";
import { useEffect } from "react";
import axios from "axios";
import { config } from "./config/env.config";
import "./app.scss";
import { useDispatch } from "react-redux";
import { logoutUser } from "./feature/auth/authSlice";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(logoutUser()).then((res) => {
      console.log("Logged out successfully");
      navigate("/login");
    });
  }

  return (
    <>
      <div className="appContainer">
        <div className="left">
          <div>
            <NavLink
              to={"/images"}
              className={({ isActive }) => (isActive ? "active" : "")}>
              Images
            </NavLink>
            <NavLink
              to={"/upload"}
              className={({ isActive }) => (isActive ? "active" : "")}>
              Upload
            </NavLink>
          </div>
          <button onClick={handleLogout}>Logout</button>
        </div>
        <div className="right">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;

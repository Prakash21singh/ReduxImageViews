//
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import Login from "../Login/Login";

export const Protected = ({ children }) => {
  const { User } = useSelector((state) => state.User);

  //   console.log(user, "line 8");
  if (User?.isAuthenticated) {
    return <Outlet />;
  }
  return <Navigate to="/login" replace />;
};

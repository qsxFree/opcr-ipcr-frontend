import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import UserContext from "../../service/context/UserContext";

const ProtectedRoute = ({ children }) => {
  let user = React.useContext(UserContext);
  let location = useLocation();
  if (!user.user) {
    return <Navigate to="/login" state={{ path: location.pathname }} replace />;
  }
  return children;
};

export default ProtectedRoute;

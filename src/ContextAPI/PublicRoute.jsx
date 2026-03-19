import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { MyContext } from "./CurrentUser";

const PublicRoute = ({ children }) => {
  const { currentUser } = useContext(MyContext);

  if (currentUser) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
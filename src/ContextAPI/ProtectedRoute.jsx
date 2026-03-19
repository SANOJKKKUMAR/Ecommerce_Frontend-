import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { MyContext } from "./CurrentUser";

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(MyContext);


  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
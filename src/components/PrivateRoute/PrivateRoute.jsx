import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../../context/DataContext";

const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useContext(DataContext);
  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;

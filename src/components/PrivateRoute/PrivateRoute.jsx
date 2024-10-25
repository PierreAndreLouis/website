import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../../context/DataContext";

const PrivateRoute = ({ element }) => {
  const { userData } = useContext(DataContext); // vérifier si userData est bien défini

  // Vérifie l'authentification en consultant localStorage si userData est absent
  const isAuthenticated = userData || localStorage.getItem("userData");

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;





// import { Navigate } from "react-router-dom";
// import { useContext } from "react";
// import { DataContext } from "../../context/DataContext";

// const PrivateRoute = ({ element }) => {
//   const { isAuthenticated } = useContext(DataContext);
//   return isAuthenticated ? element : <Navigate to="/login" />;
// };

// export default PrivateRoute;

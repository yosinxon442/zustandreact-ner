import { Navigate } from "react-router-dom";
import useStore from "../context/useStore";

const PrivateRoute = ({ children }) => {
  const { user } = useStore();
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;

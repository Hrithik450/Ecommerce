import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useUserID from "../hooks/auth";

const AdminRoute = ({ children }) => {
  const { isLoading } = useUserID();
  const { user } = useSelector((state) => state.auth);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user?.isAdmin) {
    return <Navigate to="/*" />;
  }

  return children;
};

export default AdminRoute;

import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Loader } from "lucide-react";

const AppContainer = () => {
  const { user, isLoading } = useAuth();

  return isLoading ? (
    <div className="flex items-center justify-center w-screen h-screen">
      <Loader />
    </div>
  ) : user ? (
    <div>
      <Outlet />
    </div>
  ) : (
    <Navigate
      to={"/login"}
      replace
      state={{ redirectUrl: window.location.pathname }}
    />
  );
};

export default AppContainer;

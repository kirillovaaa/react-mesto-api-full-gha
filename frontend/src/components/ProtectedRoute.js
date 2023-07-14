import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component, isLoggedIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/sign-in", { replace: true });
    }
  }, [isLoggedIn]);

  return <Component />;
};

export default ProtectedRoute;

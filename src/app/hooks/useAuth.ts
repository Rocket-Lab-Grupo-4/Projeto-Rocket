import { useState, useCallback } from "react";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = useCallback(() => {
    setIsAuthenticated(true);
  }, []);

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
  }, []);

  const handleToggleForm = useCallback(() => {
    setIsRegistering((prev) => !prev);
  }, []);

  const setAuthenticated = useCallback((auth: boolean) => {
    setIsAuthenticated(auth);
  }, []);

  return {
    isAuthenticated,
    isRegistering,
    handleLogin,
    handleLogout,
    handleToggleForm,
    setAuthenticated,
  };
};

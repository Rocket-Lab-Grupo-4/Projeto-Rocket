import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleToggleForm = () => {
    setIsRegistering(!isRegistering);
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/home");
    }
  }, [isAuthenticated, router]);

  return {
    isAuthenticated,
    isRegistering,
    handleLogin,
    handleToggleForm,
  };
};

import { useState } from "react";

const useLoading = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  const setMessageWithError = (msg: string, isError: boolean) => {
    setMessage(msg);
    setIsError(isError);
  };

  return {
    loading,
    message,
    isError,
    startLoading,
    stopLoading,
    setMessageWithError,
  };
};

export default useLoading;

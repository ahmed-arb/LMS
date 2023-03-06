import { useState, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios(`${process.env.REACT_APP_BACKEND_URL}/${requestConfig.url}`, {
        method: requestConfig.method ?? "GET",
        data: requestConfig.body ?? null,
      });

      applyData(response.data);
      setIsLoading(false);
    } catch (err) {
      toast.error(err.message || "Something went wrong!");
      setError(err.message || "Something went wrong!");
    }
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;

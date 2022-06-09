import { useState, useEffect } from "react";

// third party
import axios from "axios";

const baseURL = "http://localhost:8080/li-pca/v1/templates";
const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};

export const useGetAll = () => {
  const [isLoading, setLoading] = useState(true);
  const [getData, setData] = useState([]);
  const [getError, setError] = useState([false, ""]);
  useEffect(() => {
    axios
      .get(baseURL, {
        headers: headers,
      })
      .then((response) => {
        setData(response.data);
        setLoading(false);
        setError([false, ""]);
      })
      .catch((error) => {
        setError([true, error.message]);
        setLoading(false);
        console.log(error);
      });
  }, []);
  return { isLoading, getData, getError };
};

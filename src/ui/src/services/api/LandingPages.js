import { useState, useEffect } from "react";

// third party
import axios from "axios";

const baseURL = "http://localhost:8080/li-pca/v1/landing_pages";
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
  return {
    isLoading,
    getData,
    getError,
  };
};

export const submitLP = (lpData, lp_id, dataEntryType, setError) => {
  if (dataEntryType == "New Landing Page") {
    axios
      .post(baseURL, lpData, {
        headers: headers,
      })
      .then((response) => {
        console.log(response);
        setError([false, ""]);
      })
      .catch((error) => {
        setError([true, error.message]);
        console.log("Error adding new landing page entry.");
        console.log(lpData);
        console.log(error);
      });
  }
  if (dataEntryType == "Edit Landing Page") {
    axios
      .put(baseURL + "/" + lp_id, lpData, {
        headers: headers,
      })
      .then((response) => {
        console.log(response);
        setError([false, ""]);
      })
      .catch((error) => {
        setError([true, error.message]);
        console.log("Error updating landing page entry.");
        console.log(lpData);
        console.log(error);
      });
  }
};

export const deleteLP = (lp_id, setError) => {
  axios
    .delete(baseURL + "/" + lp_id, {
      headers: headers,
    })
    .then((response) => {
      console.log(response);
      setError([false, ""]);
    })
    .catch((error) => {
      setError([true, error.message]);
      console.log("Error deleting data");
      console.log(lp_id);
      console.log(error);
    });
};

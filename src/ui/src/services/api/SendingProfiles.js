import { useState, useEffect } from "react";

// third party
import axios from "axios";

const baseURL = "http://localhost:8080/li-pca/v1/sending_profiles";
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

export const submitSP = (spData, sp_id, dataEntryType, setError) => {
  if (dataEntryType == "New Sending Profile") {
    axios
      .post(baseURL, spData, {
        headers: headers,
      })
      .then((response) => {
        console.log(response);
        setError([false, ""]);
      })
      .catch((error) => {
        setError([true, error.message]);
        console.log("Error adding new sending profile entry.");
        console.log(spData);
        console.log(error);
      });
  }
  if (dataEntryType == "Edit Sending Profile") {
    axios
      .put(baseURL + "/" + sp_id, spData, {
        headers: headers,
      })
      .then((response) => {
        console.log(response);
        setError([false, ""]);
      })
      .catch((error) => {
        setError([true, error.message]);
        console.log("Error updating sending profile entry.");
        console.log(spData);
        console.log(error);
      });
  }
};

export const deleteSP = (sp_id, setError) => {
  axios
    .delete(baseURL + "/" + sp_id, {
      headers: headers,
    })
    .then((response) => {
      console.log(response);
      setError([false, ""]);
    })
    .catch((error) => {
      setError([true, error.message]);
      console.log("Error deleting data");
      console.log(sp_id);
      console.log(error);
    });
};

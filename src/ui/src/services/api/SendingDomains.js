import { useState, useEffect } from "react";

// third party
import axios from "axios";

const baseURL = "http://localhost:8080/li-pca/v1/sending_domains";
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

export const submitSP = (sdData, sd_id, dataEntryType, setError) => {
  if (dataEntryType == "New Sending Domain") {
    axios
      .post(baseURL, sdData, {
        headers: headers,
      })
      .then((response) => {
        console.log(response);
        setError([false, ""]);
      })
      .catch((error) => {
        setError([true, error.message]);
        console.log("Error adding new sending domain entry.");
        console.log(sdData);
        console.log(error);
      });
  }
  if (dataEntryType == "Edit Sending Domain") {
    axios
      .put(baseURL + "/" + sd_id, sdData, {
        headers: headers,
      })
      .then((response) => {
        console.log(response);
        setError([false, ""]);
      })
      .catch((error) => {
        setError([true, error.message]);
        console.log("Error updating sending domain entry.");
        console.log(sdData);
        console.log(error);
      });
  }
};

export const deleteSP = (sd_id, setError) => {
  axios
    .delete(baseURL + "/" + sd_id, {
      headers: headers,
    })
    .then((response) => {
      console.log(response);
      setError([false, ""]);
    })
    .catch((error) => {
      setError([true, error.message]);
      console.log("Error deleting data");
      console.log(sd_id);
      console.log(error);
    });
};

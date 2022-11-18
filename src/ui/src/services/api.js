import { useState, useEffect } from "react";

// third party
import axios from "axios";

const baseURL = "http://localhost:8080/li-pca/v1/";
const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};

export const useGetAll = (collectionType) => {
  const [isLoading, setLoading] = useState(true);
  const [getData, setData] = useState([]);
  const [getError, setError] = useState([false, ""]);
  useEffect(() => {
    axios
      .get(baseURL + collectionType, {
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

export const submitEntry = (
  collectionType,
  data,
  id,
  dataEntryType,
  setError
) => {
  if (dataEntryType.substring(0, 3) == "New") {
    axios
      .post(baseURL + collectionType, data, {
        headers: headers,
      })
      .then((response) => {
        console.log(response);
        setError([false, ""]);
      })
      .catch((error) => {
        setError([true, error.message]);
        console.log("Error adding " + dataEntryType);
        console.log(data);
        console.log(error);
      });
  }
  if (dataEntryType.substring(0, 4) == "Edit") {
    axios
      .put(baseURL + collectionType + "/" + id, data, {
        headers: headers,
      })
      .then((response) => {
        console.log(response);
        setError([false, ""]);
      })
      .catch((error) => {
        setError([true, error.message]);
        console.log("Error updating " + dataEntryType);
        console.log(data);
        console.log(error);
      });
  }
};

export const deleteEntry = (id, setError) => {
  axios
    .delete(baseURL + "/" + id, {
      headers: headers,
    })
    .then((response) => {
      console.log(response);
      setError([false, ""]);
    })
    .catch((error) => {
      setError([true, error.message]);
      console.log("Error deleting data");
      console.log(custData);
      console.log(error);
    });
};

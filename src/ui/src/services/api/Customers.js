import { useState, useEffect } from "react";

// third party
import axios from "axios";

const baseURL = "http://localhost:8080/li-pca/v1/customers";
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

export const useSubmit = (custData, cust_id, hasSubmitted, dataEntryType) => {
  const [getError, setError] = useState([false, ""]);
  useEffect(() => {
    if (hasSubmitted && dataEntryType == "New Customer") {
      axios
        .post(baseURL, custData, {
          headers: headers,
        })
        .then((response) => {
          console.log(response);
          setError([false, ""]);
        })
        .catch((error) => {
          setError([true, error.message]);
          console.log("Error adding new customer entry.");
          console.log(custData);
          console.log(error);
        });
    }
    if (hasSubmitted && dataEntryType == "Edit Customer") {
      axios
        .put(baseURL + "/" + cust_id, custData, {
          headers: headers,
        })
        .then((response) => {
          console.log(response);
          setError([false, ""]);
        })
        .catch((error) => {
          setError([true, error.message]);
          console.log("Error updating customer entry.");
          console.log(custData);
          console.log(error);
        });
    }
  }, [custData, hasSubmitted, dataEntryType]);
  return getError;
};

export const useDelete = (cust_id, getDelete) => {
  const [getError, setError] = useState([false, ""]);
  useEffect(() => {
    if (getDelete) {
      axios
        .delete(baseURL + "/" + cust_id, {
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
    }
  }, [getDelete]);
  return getError;
};

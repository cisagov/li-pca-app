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

export const submitTemplate = (templateData, id, dataEntryType, setError) => {
  if (dataEntryType == "New Template") {
    axios
      .post(baseURL, templateData, {
        headers: headers,
      })
      .then((response) => {
        console.log(response);
        setError([false, ""]);
      })
      .catch((error) => {
        setError([true, error.message]);
        console.log("Error adding new template entry.");
        console.log(templateData);
        console.log(error);
      });
  }
  if (dataEntryType == "Edit Template") {
    axios
      .put(baseURL + "/" + id, templateData, {
        headers: headers,
      })
      .then((response) => {
        console.log(response);
        setError([false, ""]);
      })
      .catch((error) => {
        setError([true, error.message]);
        console.log("Error updating template entry.");
        console.log(templateData);
        console.log(error);
      });
  }
};

export const useRetire = (retire, selectedRows) => {
  const [getError, setError] = useState([false, ""]);

  useEffect(() => {
    if (retire) {
      let toRetireArray = [];
      selectedRows.forEach(function (entry) {
        let id = entry._id;
        toRetireArray.push({ _id: id, retired: true });
      });
      console.log(toRetireArray);
      axios
        .put(baseURL + "/bulk", toRetireArray, {
          headers: headers,
        })
        .then((response) => {
          console.log(response);
          setError([false, ""]);
        })
        .catch((error) => {
          setError([true, error.message]);
          console.log(error);
        });
    }
  }, [retire, selectedRows]);
  return getError;
};

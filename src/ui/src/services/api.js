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
  if (dataEntryType.substring(0, 3).toLowerCase() == "new") {
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
  if (dataEntryType.substring(0, 4).toLowerCase() == "edit") {
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

export const deleteEntry = (collectionType, id, setError) => {
  axios
    .delete(baseURL + collectionType + "/" + id, {
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

export const useRetire = (collectionType, retire, selectedRows) => {
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
        .put(baseURL + collectionType + "/bulk", toRetireArray, {
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
  }, [collectionType, retire, selectedRows]);
  return getError;
};

export async function fetchData(
  selectedRow,
  triggerDataFetch,
  setLoading,
  setHarvesterData,
  setError
) {
  try {
    let response = await axios.get(
      baseURL + "harvester?domain=" + selectedRow.domain,
      { headers: headers }
    );
    let partialCustEntry = {
      recon_results: [],
    };
    let reconResults = [];
    if (selectedRow.hasOwnProperty("recon_results")) {
      reconResults.push(...selectedRow.recon_results);
    }
    const currentTime = new Date();
    console.log(response.data);
    response.data.recon_time = currentTime.toISOString();
    response.data.domain = selectedRow.domain;
    reconResults.push(response.data);
    partialCustEntry["recon_results"] = reconResults;
    let resp = await axios.put(
      baseURL + "customers/" + selectedRow._id,
      partialCustEntry,
      { headers: headers }
    );
    console.log("Response from the Harvester", response);
    console.log("Response from saving to the database", resp);
    setHarvesterData(response.data);
    triggerDataFetch();
    setLoading(false);
    setError([false, ""]);
  } catch (error) {
    setError([true, error.message]);
    setLoading(false);
    console.log(error);
  }
}

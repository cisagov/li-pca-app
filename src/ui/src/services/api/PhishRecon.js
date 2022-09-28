import { useState, useEffect } from "react";

// third party
import axios from "axios";

const custBaseURL = "http://localhost:8080/li-pca/v1/customers";
const harvesterBaseUrl = "http://localhost:8080/li-pca/v1/harvester";
const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};

export const useGetAll = (fetchData) => {
  const [isLoading, setLoading] = useState(true);
  const [getData, setData] = useState([]);
  const [getError, setError] = useState([false, ""]);
  useEffect(() => {
    axios
      .get(custBaseURL, {
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
  }, [fetchData]);
  return {
    isLoading,
    getData,
    getError,
  };
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
      harvesterBaseUrl + "?domain=" + selectedRow.domain,
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
      custBaseURL + "/" + selectedRow._id,
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

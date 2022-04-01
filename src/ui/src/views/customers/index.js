import React from "react";
import { useNavigate } from "react-router-dom";
// material-ui
import { Grid } from "@mui/material";

// project imports
import MainCard from "ui-component/cards/MainCard";
import MainDataTable from "ui-component/tables/MainDataTable";

// third party
import axios from "axios";
// ==============================|| Customers view ||============================== //

const baseURL = "http://localhost:8080/li-pca/v1/customers";

function CustomersPage() {
  const columns = [
    { field: "id", hide: true },
    { field: "name", headerName: "Name", flex: 2 },
    { field: "identifier", headerName: "Identifier", flex: 1 },
    { field: "address_1", headerName: "Address", flex: 2.5 },
    { field: "city", headerName: "City", flex: 1.5 },
    { field: "state", headerName: "State", flex: 1 },
    { field: "zip_code", headerName: "Zip Code", flex: 1 },
  ];
  const jsonRows = require("./mockCusData.json");

  // Ignore until back-end data is populated
  const [getData, setData] = React.useState([]);
  React.useEffect(() => {
    axios
      .get(baseURL, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        const data = response.data;
        setData(data);
      })
      .catch((error) => {
        console.log("Error fetching data");
        console.log(error);
      });
  }, []);

  const cusRows = (rowsArray) => {
    if (Object.keys(rowsArray).length !== 0) {
      let counter = 0;
      let cusRows = [];
      cusRows = Array.from(rowsArray);
      cusRows.forEach((entry) => {
        entry["id"] = counter;
        counter = counter + 1;
      });
      return cusRows;
    }
    return [];
  };
  const cusData = { rows: cusRows(jsonRows), columns: columns };

  return (
    <MainCard title="Customers">
      <Grid container spacing={2}>
        <Grid item xs={8}>
          {/* Customer data shown below. */}
          This is just something to fill in while I test axios. I will use the
          space below this to confirm.
          {/* {getAll.data} */}
        </Grid>
      </Grid>
      <br />
      <MainDataTable
        data={cusData}
        newEntryRoute="data-entry"
        editEntryRoute="data-entry"
      />
    </MainCard>
  );
}
export default CustomersPage;

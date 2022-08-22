import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

// material-ui
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// project imports
import MainCard from "ui-component/cards/MainCard";
import MainDataTable from "ui-component/tables/MainDataTable";
import { useGetAll, useDelete } from "services/api/SendingProfiles.js";

// third party
import axios from "axios";
// ==============================|| Sending Profiles view ||============================== //

function BaseJSX(props) {
  let navigate = useNavigate();
  const cols = [
    { field: "id", hide: true },
    { field: "name", headerName: "Name", flex: 1.25 },
    { field: "interface_type", headerName: "Interface Type", flex: 0.75 },
    {
      field: "#_of_customers_using",
      headerName: "# of Customers Using",
      flex: 1,
    },
    {
      field: "#last_modified_date",
      headerName: "Last Modified Date",
      flex: 1,
    },
  ];
  return (
    <MainCard title="Sending Profiles">
      <Grid container spacing={2}>
        <Grid item xs={8} sm={12} md={12} lg={12} xl={12}>
          {props.children}
          <MainDataTable
            data={{ rows: props.rows, columns: cols }}
            newEntryRoute={props.dataEntry}
            editEntryRoute={props.dataEntry}
            tableCategory={"Sending Profiles"}
            useDelete={useDelete}
          />
        </Grid>
      </Grid>
    </MainCard>
  );
}

BaseJSX.propTypes = {
  rows: PropTypes.array,
  children: PropTypes.object,
  dataEntry: PropTypes.string,
};

function SendingProfilesPage() {
  const { isLoading, getData, getError } = useGetAll("getAll");

  const domainRows = (rowsArray) => {
    if (Object.keys(rowsArray).length !== 0) {
      let counter = 0;
      let domainRows = [];
      domainRows = Array.from(rowsArray);
      domainRows.forEach((entry) => {
        entry["id"] = counter;
        counter = counter + 1;
      });
      return rowsArray;
    }
    return [];
  };
  // Mock data test
  // const jsonRows = require("./mockDomainData.json");
  // const rows = domainRows(jsonRows);
  const rows = domainRows(getData);

  if (isLoading) {
    return (
      <BaseJSX rows={[]} dataEntry={""}>
        <Typography>Loading...</Typography>
      </BaseJSX>
    );
  } else if (getError[0]) {
    return (
      <BaseJSX rows={[]} dataEntry={""}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {getError[1]}. Unable to load sending profile (domain) data from the
          database.
        </Alert>
      </BaseJSX>
    );
  } else if (rows.length === 0) {
    return (
      <BaseJSX rows={[]} dataEntry={"data-entry"}>
        <Typography sx={{ mb: 2 }}>
          No sending profile (domain) data entries found.
        </Typography>
      </BaseJSX>
    );
  }
  return (
    <BaseJSX rows={rows} dataEntry={"data-entry"}>
      <Typography sx={{ mb: 2 }}>
        Sending profile (domain) data from the database shown below.
      </Typography>
    </BaseJSX>
  );
}

export default SendingProfilesPage;

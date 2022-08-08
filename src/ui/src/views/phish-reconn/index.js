import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// material-ui
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

// project imports
import MainCard from "ui-component/cards/MainCard";
import MainDataTable from "ui-component/tables/MainDataTable";
import { useGetAll } from "services/api/Customers.js";

// third party
import axios from "axios";
// ==============================|| Phish Reconn view ||============================== //

function Results(props) {
  const [notes, setNotes] = useState("");
  if (props.selectedRow) {
    return (
      <Grid container spacing={2} id="section2" sx={{ mb: 2, mt: 3 }}>
        <Grid item xs={8} lg={12} xl={12}>
          <Typography variant="h5">
            Display Results for {props.selectedRow.name}
          </Typography>
        </Grid>
        <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
          This is where the results will be displayed
          <br />
          <br />
          <img
            src="https://cdn.vectorstock.com/i/1000x1000/34/65/laptop-phishing-icon-outline-style-vector-22503465.webp"
            alt="alternatetext"
            width="100px"
          />
        </Grid>
        <Grid item xs={10} sm={6} md={4} lg={3} xl={3}>
          <Button
            color="warning"
            variant="contained"
            size="large"
            fullWidth
            onClick={() => console.log()}
            endIcon={<FileDownloadIcon />}
          >
            Download Results
          </Button>
        </Grid>
        <Grid item xs={10} sm={10} md={10} lg={10} xl={10} sx={{ mt: 3 }}>
          <Typography variant="h5">Web Search Findings</Typography>
        </Grid>
        <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
          <TextField
            fullWidth
            multiline
            minRows={7}
            id="notes"
            name="notes"
            label="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </Grid>
        <Grid item xs={10} sm={6} md={4} lg={3} xl={3}>
          <Button
            fullWidth
            color="info"
            variant="contained"
            size="large"
            onClick={() => console.log()}
          >
            Save Notes
          </Button>
        </Grid>
      </Grid>
    );
  }
  return (
    <Grid container spacing={2} id="section2" sx={{ mb: 2, mt: 3 }}>
      <Grid item xs={8} lg={12} xl={12}>
        This is where the results will be displayed.
      </Grid>
    </Grid>
  );
}
function BaseJSX(props) {
  const [selectedRow, setSelectedRow] = React.useState("");
  const cols = [
    { field: "id", hide: true },
    { field: "name", headerName: "Name", flex: 2 },
    { field: "domain", headerName: "Domain", flex: 2 },
    {
      field: "run",
      headerName: "Run Harvester",
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (cellValues) => {
        return (
          <IconButton
            variant="contained"
            color="primary"
            href="#section2"
            onClick={() => setSelectedRow(cellValues.row)}
          >
            <PlayCircleFilledWhiteIcon />
          </IconButton>
        );
      },
      flex: 0.6,
    },
  ];
  return (
    <MainCard title="Phish Reconnaissance">
      <Grid container spacing={2} id="section1">
        <Grid item xs={8} sm={12} md={12} lg={12} xl={12}>
          {props.children}
          <MainDataTable
            data={{ rows: props.rows, columns: cols }}
            newEntryRoute={props.dataEntry}
            editEntryRoute={props.dataEntry}
            tableCategory={"Phish Reconnaissance"}
          />
        </Grid>
      </Grid>
      <Results selectedRow={selectedRow} />
    </MainCard>
  );
}

BaseJSX.propTypes = {
  rows: PropTypes.array,
  children: PropTypes.object,
  dataEntry: PropTypes.string,
};

function PhishReconnPage() {
  const { isLoading, getData, getError } = useGetAll("getAll");

  const cusRows = (rowsArray) => {
    if (Object.keys(rowsArray).length !== 0) {
      let counter = 0;
      let cusRows = [];
      cusRows = Array.from(rowsArray);
      cusRows.forEach((entry) => {
        entry["id"] = counter;
        counter = counter + 1;
      });
      return rowsArray;
    }
    return [];
  };
  // Mock data test
  // const jsonRows = require("./mockCusData.json");
  // const rows = cusRows(jsonRows);
  const rows = cusRows(getData);

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
          {getError[1]}. Unable to load data from the database.
        </Alert>
      </BaseJSX>
    );
  } else if (rows.length === 0) {
    return (
      <BaseJSX rows={[]} dataEntry={"data-entry"}>
        <Typography sx={{ mb: 2 }}>No data entries found.</Typography>
      </BaseJSX>
    );
  }
  return (
    <BaseJSX rows={rows} dataEntry={"data-entry"}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Select a customer from the database to run Reconnaissance on
      </Typography>
    </BaseJSX>
  );
}

export default PhishReconnPage;

import React, { useState } from "react";
import PropTypes from "prop-types";

// material-ui
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

// project imports
import MainCard from "ui-component/cards/MainCard";
import MainDataTable from "ui-component/tables/MainDataTable";
import { useGetAll, useGetHarvesterResults } from "services/api/PhishRecon.js";

// third party
import axios from "axios";
// ==============================|| Phish Reconn view ||============================== //

function Results(props) {
  const [notes, setNotes] = useState("");
  const results = useGetHarvesterResults(props.domain);
  // console.log(props.domain);
  // console.log(results);
  const exportData = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(results.getData)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = props.domain + "_results.json";
    link.click();
  };
  const webSearchFindings = (
    <React.Fragment>
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
    </React.Fragment>
  );
  if (props.domain && results.isLoading) {
    return (
      <Grid container spacing={2} id="section2" sx={{ mb: 2, mt: 3 }}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Typography variant="h5">
            Running theHarvester on {props.selectedRow.customer_name}
          </Typography>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ mt: 2 }}>
            <Box sx={{ width: "100%" }}>
              <LinearProgress />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    );
  } else if (results.getError[0]) {
    return (
      <Grid container spacing={2} id="section2" sx={{ mb: 2, mt: 3 }}>
        <Grid item xs={8} lg={12} xl={12}>
          Unable to retrieve results. {results.getError[0]}.
        </Grid>
      </Grid>
    );
  } else if (results.getData.length != 0) {
    return (
      <Grid container spacing={2} id="section2" sx={{ mb: 2, mt: 3 }}>
        <Grid item xs={8} lg={12} xl={12}>
          <Typography variant="h5">
            Results for {props.selectedRow.customer_name}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <pre>{JSON.stringify(results.getData, null, 2)}</pre>
        </Grid>
        <Grid item xs={10} sm={6} md={4} lg={3} xl={3}>
          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            onClick={() => console.log()}
          >
            Save Results
          </Button>
        </Grid>
        <Grid item xs={2} sm={6} md={8} lg={9} xl={9} />
        <Grid item xs={10} sm={6} md={4} lg={3} xl={3}>
          <Button
            color="warning"
            variant="contained"
            size="large"
            fullWidth
            onClick={exportData}
            endIcon={<FileDownloadIcon />}
          >
            Download Results
          </Button>
        </Grid>
        <Grid item xs={2} sm={6} md={8} lg={9} xl={9} />
        {webSearchFindings}
      </Grid>
    );
  } else if (props.selectedRow) {
    return (
      <Grid container spacing={2} id="section2" sx={{ mb: 2, mt: 3 }}>
        <Grid item xs={8} lg={12} xl={12}>
          <Typography variant="h5">
            Results for {props.selectedRow.customer_name}
          </Typography>
        </Grid>
        <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
          This is where the latest results will be displayed
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
        {webSearchFindings}
      </Grid>
    );
  }
  return (
    <Grid container spacing={2} id="section2" sx={{ mb: 2, mt: 3 }}>
      <Grid item xs={8} lg={12} xl={12}>
        No domain has been selected.
      </Grid>
    </Grid>
  );
}
function BaseJSX(props) {
  const [selectedRow, setSelectedRow] = React.useState("");
  const [domain, setDomain] = useState("");
  const cols = [
    { field: "id", hide: true },
    { field: "domain", headerName: "Domain", flex: 1 },
    { field: "customer_name", headerName: "Customer Name", flex: 1 },
    { field: "recon_time", headerName: "Last Run Date (UTC)", flex: 1 },
    {
      field: "see_results",
      headerName: "View Latest Results",
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (cellValues) => {
        let isDisabled = true;
        if (cellValues.row.recon_time) {
          isDisabled = false;
        } else {
          cellValues.row.recon_time = "-";
        }
        return (
          <IconButton
            variant="contained"
            color="dark"
            href="#section2"
            disabled={isDisabled}
            onClick={() => setSelectedRow(cellValues.row)}
          >
            <VisibilityOutlinedIcon />
          </IconButton>
        );
      },
      flex: 0.8,
    },
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
            onClick={() => {
              setSelectedRow(cellValues.row);
              setDomain(cellValues.row.domain);
            }}
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
      <Results
        selectedRow={selectedRow}
        domain={domain}
        setDomain={setDomain}
      />
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

  const reconRows = (rowsArray) => {
    if (Object.keys(rowsArray).length !== 0) {
      let counter = 0;
      let reconRows = [];
      reconRows = Array.from(rowsArray);
      reconRows.forEach((entry) => {
        entry["id"] = counter;
        counter = counter + 1;
      });
      return rowsArray;
    }
    return [];
  };
  // Mock data test
  // const jsonRows = require("./mockReconData.json");
  // const rows = reconRows(jsonRows);
  const rows = reconRows(getData);

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
        Search for a domain from below to run Reconnaissance or view its latest
        results
      </Typography>
    </BaseJSX>
  );
}

export default PhishReconnPage;

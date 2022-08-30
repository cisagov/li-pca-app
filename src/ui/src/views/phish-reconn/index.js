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
import { useGetAll, fetchData } from "services/api/PhishRecon.js";

// ==============================|| Phish Reconn view ||============================== //

Results.propTypes = {
  selectedRow: PropTypes.string,
  triggerDataFetch: PropTypes.func,
  viewResults: PropTypes.bool,
  getData: PropTypes.object,
  getError: PropTypes.array,
  isLoading: PropTypes.bool,
};

function Results(props) {
  const [notes, setNotes] = useState("");
  const exportData = () => {
    const data = [];
    if (props.viewResults) {
      data = props.selectedRow.recon_results;
    } else {
      data = props.getData;
    }
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(data)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = props.selectedRow.domain + "_results.json";
    link.click();
  };
  const reconExtras = (
    <React.Fragment>
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
      <Grid item xs={10} sm={10} md={10} lg={10} xl={10} sx={{ mt: 3 }}>
        <Typography variant="h5">Web Search Findings</Typography>
      </Grid>
      <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
        <TextField
          fullWidth
          multiline
          minRows={5}
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
  if (props.viewResults) {
    return (
      <Grid container spacing={2} sx={{ mt: 1 }} id="section2">
        <Grid item xs={12} sm={12} md={12} xl={12}>
          <Typography variant="h5">
            Results for {props.selectedRow.name}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <pre>{JSON.stringify(props.selectedRow.recon_results, null, 2)}</pre>
        </Grid>
        {reconExtras}
      </Grid>
    );
  } else if (props.isLoading) {
    return (
      <Grid container spacing={2} id="section2" sx={{ mb: 2, mt: 3 }}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Typography variant="h5">
            Running the Harvester on {props.selectedRow.name}
          </Typography>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ mt: 2 }}>
            <Box sx={{ width: "100%" }}>
              <LinearProgress />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ mt: 2 }}>
            <Typography variant="subtitle2">
              Please wait while the Harvester runs...
            </Typography>
            <Typography variant="caption" sx={{ fontStyle: "italic" }}>
              This may take a few minutes
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  } else if (props.getError[0]) {
    return (
      <Grid container spacing={2} id="section2" sx={{ mb: 2, mt: 3 }}>
        <Grid item xs={8} lg={12} xl={12}>
          Unable to retrieve results. {props.getError[0]}.
        </Grid>
      </Grid>
    );
  } else if (props.getData.length != 0) {
    return (
      <Grid container spacing={2} sx={{ mb: 2, mt: 3 }}>
        <Grid item xs={12} sm={12} md={12} xl={12} id="section2">
          <Typography variant="h5">
            Results for {props.selectedRow.name}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <pre>{JSON.stringify(props.getData, null, 2)}</pre>
        </Grid>
        {props.getError[0] ? (
          <React.Fragment>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              {props.getError[0]} Unable to save results to database. See
              console log for more details.
            </Grid>
            <Grid item xs={2} sm={6} md={8} lg={9} xl={9} />
          </React.Fragment>
        ) : (
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            Results have been saved successfully.
          </Grid>
        )}
        {reconExtras}
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
  const [viewResults, setViewResults] = React.useState(false);
  const [isLoading, setLoading] = useState(false);
  const [getHarvesterData, setHarvesterData] = useState([]);
  const [getError, setError] = useState([false, ""]);
  const toScroll = setTimeout(function () {
    const element = document.getElementById("section1");
    window.scrollTo({
      top: element.getBoundingClientRect().height + 80,
      behavior: "smooth",
    });
  }, 2);
  const handleHarvesterClick = (row) => {
    setViewResults(false);
    setSelectedRow(row);
    setLoading(true);
    fetchData(
      row,
      props.triggerDataFetch,
      setLoading,
      setHarvesterData,
      setError
    );
  };

  const cols = [
    { field: "id", hide: true },
    { field: "domain", headerName: "Domain", flex: 1 },
    { field: "name", headerName: "Customer Name", flex: 1 },
    { field: "last_recon_date", headerName: "Last Run Date (UTC)", flex: 1 },
    {
      field: "see_results",
      headerName: "View Harvester Results",
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (cellValues) => {
        let isDisabled = true;
        if (cellValues.row.last_recon_date != "-") {
          isDisabled = false;
        }
        return (
          <IconButton
            variant="contained"
            color="dark"
            disabled={isDisabled}
            onClick={() => {
              toScroll;
              setSelectedRow(cellValues.row);
              setViewResults(true);
            }}
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
            onClick={() => handleHarvesterClick(cellValues.row)}
          >
            <PlayCircleFilledWhiteIcon />
          </IconButton>
        );
      },
      flex: 0.6,
    },
  ];
  let displayTable = (
    <MainDataTable
      data={{ rows: props.rows, columns: cols }}
      newEntryRoute={props.dataEntry}
      editEntryRoute={props.dataEntry}
      tableCategory={"Phish Reconnaissance"}
    />
  );
  return (
    <MainCard title="Phish Reconnaissance">
      <Grid container spacing={2} id="section1">
        <Grid item xs={8} sm={12} md={12} lg={12} xl={12}>
          {props.children}
          {displayTable}
        </Grid>
      </Grid>
      <Results
        selectedRow={selectedRow}
        triggerDataFetch={props.triggerDataFetch}
        viewResults={viewResults}
        isLoading={isLoading}
        getData={getHarvesterData}
        getError={getError}
      />
    </MainCard>
  );
}

BaseJSX.propTypes = {
  rows: PropTypes.array,
  children: PropTypes.object,
  dataEntry: PropTypes.string,
  triggerDataFetch: PropTypes.func,
};

function PhishReconnPage() {
  const [fetchData, setFetchData] = useState(true);
  const triggerDataFetch = () => setFetchData((t) => !t);
  const { isLoading, getData, getError } = useGetAll(fetchData);
  const reconRows = (rowsArray) => {
    if (Object.keys(rowsArray).length !== 0) {
      let counter = 0;
      let reconRows = [];
      reconRows = Array.from(rowsArray);
      reconRows.forEach((entry) => {
        entry["id"] = counter;
        counter = counter + 1;
        if (entry.hasOwnProperty("recon_results")) {
          let getLastReconDate = entry.recon_results.reduce(function (
            prev,
            curr
          ) {
            let prev_date = new Date(prev.recon_time);
            let curr_date = new Date(curr.recon_time);
            return prev_date > curr_date ? prev.recon_time : curr.recon_time;
          });
          entry.last_recon_date = getLastReconDate.recon_time;
        } else {
          entry.last_recon_date = "-";
        }
      });
      return reconRows;
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
    <BaseJSX
      rows={rows}
      dataEntry={"data-entry"}
      triggerDataFetch={triggerDataFetch}
    >
      <Typography variant="h5" sx={{ mb: 2 }}>
        Search for a domain from below to run Reconnaissance or view its latest
        results
      </Typography>
    </BaseJSX>
  );
}

export default PhishReconnPage;

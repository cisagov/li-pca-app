import React, { useState } from "react";
import PropTypes from "prop-types";

// material-ui
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import Typography from "@mui/material/Typography";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

// project imports
import MainCard from "ui-component/cards/MainCard";
import MainDataTable from "ui-component/tables/MainDataTable";
import PhishReconForm from "ui-component/forms/PhishReconForm";
import { useGetAll, fetchData } from "services/api/PhishRecon.js";

// ==============================|| Phish Reconn view ||============================== //

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
    { field: "domain", headerName: "Customer Domain", flex: 1 },
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
        let isDisabled = true;
        if (cellValues.row.domain) {
          isDisabled = false;
        }
        return (
          <IconButton
            variant="contained"
            color="primary"
            href="#section2"
            disabled={isDisabled}
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
    <Box sx={{ maxWidth: 1200 }}>
      <MainDataTable
        data={{ rows: props.rows, columns: cols }}
        newEntryRoute={props.dataEntry}
        editEntryRoute={props.dataEntry}
        tableCategory={"Phish Reconnaissance"}
      />
    </Box>
  );
  return (
    <MainCard title="Phish Reconnaissance">
      <Grid container spacing={2} id="section1">
        <Grid item xs={8} sm={12} md={12} lg={12} xl={12}>
          {props.children}
          {displayTable}
        </Grid>
      </Grid>
      <PhishReconForm
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
        if (!entry.hasOwnProperty("customer_notes")) {
          entry.customer_notes = "";
        }
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
        <Typography sx={{ mb: 2 }}>
          No Phish Reconnaissance entries found.
        </Typography>
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
        Select a Customer Domain to run Reconnaissance on or view its past
        results
      </Typography>
    </BaseJSX>
  );
}

export default PhishReconnPage;

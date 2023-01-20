import { useState } from "react";
import PropTypes from "prop-types";

// material-ui
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CancelScheduleSendIcon from "@mui/icons-material/CancelScheduleSend";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

// project imports
import ConfirmDialog from "ui-component/popups/ConfirmDialog";
import MainCard from "ui-component/cards/MainCard";
import MainDataTable from "ui-component/tables/MainDataTable";
import ResultDialog from "ui-component/popups/ResultDialog";
import { useGetAll, submitEntry } from "services/api.js";

// ==============================|| Campaigns view ||============================== //

function BaseJSX(props) {
  let [selectedRow, setSelectedRow] = useState({});
  const [savebtnOpen, setSavebtnOpen] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [getError, setError] = useState([false, ""]);
  const cols = [
    { field: "id", hide: true },
    {
      field: "name",
      headerName: "Campaign Name",
      minWidth: 130,
      flex: 1.5,
    },
    { field: "target_count", headerName: "Target Count", minWidth: 100 },
    { field: "status", headerName: "Status", minWidth: 70 },
    {
      field: "date_scheduled",
      headerName: "Date Scheduled",
      minWidth: 170,
      flex: 1,
    },
    {
      field: "time_scheduled",
      headerName: "Time Scheduled",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "cancel",
      headerName: "Cancel Send",
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (cellValues) => {
        if (
          cellValues.row.status == "incomplete" ||
          cellValues.row.status == "completed"
        ) {
          return "";
        }
        return (
          <IconButton
            variant="contained"
            color="error"
            onClick={() => {
              setSavebtnOpen(true);
              setSelectedRow(cellValues.row);
            }}
          >
            <CancelScheduleSendIcon />
          </IconButton>
        );
      },
      width: 95,
    },
  ];
  // const filterModel = {
  //   items: [
  //     {
  //       columnField: "retired",
  //       operatorValue: "equals",
  //       value: "false",
  //     },
  //   ],
  // };
  const confirmChange = () => {
    selectedRow.start_datetime = "1970-01-01T00:00:00+00:00";
    selectedRow.end_datetime = "1970-01-01T00:00:00+00:00";
    selectedRow.time_zone = "";
    selectedRow.status = "incomplete";
    submitEntry("campaigns", selectedRow, selectedRow._id, "edit", setError);
    setTimeout(() => {
      setHasSubmitted(true);
    });
  };
  const closeDialog = () => {
    setHasSubmitted(false);
    if (!getError[0]) {
      window.location.reload();
    }
  };
  return (
    <MainCard title="Campaigns">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          {props.children}
          <Box sx={{ maxWidth: 1300 }}>
            <MainDataTable
              data={{ rows: props.rows, columns: cols }}
              newEntryRoute={props.dataEntry}
              editEntryRoute={props.dataEntry}
              tableCategory={"Campaign"}
            />
          </Box>
          <ConfirmDialog
            subtitle={
              selectedRow.name +
              " will stop any current scheduled sending and remove its current delivery schedule and mark its status as incomplete." +
              " Do you wish to proceed?"
            }
            confirmType="Cancel Send"
            handleClick={confirmChange}
            isOpen={savebtnOpen}
            setIsOpen={setSavebtnOpen}
          />
          <ResultDialog
            type={"edit"}
            hasSubmitted={hasSubmitted}
            error={getError}
            closeDialog={closeDialog}
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

function CampaignsPage() {
  const { isLoading, getData, getError } = useGetAll("campaigns");
  const campaignRows = (rowsArray) => {
    if (Object.keys(rowsArray).length !== 0) {
      let rows = [];
      let startDate = "";
      let endDate = "";
      let startTime = "";
      let endTime = "";
      rows = Array.from(rowsArray);
      rows.forEach((entry) => {
        const nullDate = "1970-01-01T00:00:00+00:00";
        if (entry["start_datetime"] && entry["start_datetime"] != nullDate) {
          startDate = new Date(entry["start_datetime"])
            .toLocaleDateString("en-US")
            .toString();
          startTime = new Date(entry["start_datetime"])
            .toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
            .toString();
        }
        if (entry["end_datetime"] && entry["end_datetime"] != nullDate) {
          endDate = new Date(entry["end_datetime"])
            .toLocaleDateString("en-US")
            .toString();
          endTime = new Date(entry["end_datetime"])
            .toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
            .toString();
        }
        if (entry["start_datetime"] == nullDate) {
          entry["date_scheduled"] = "-";
          entry["time_scheduled"] = "-";
        } else {
          entry["date_scheduled"] = startDate + " - " + endDate;
          entry["time_scheduled"] = startTime + " - " + endTime;
        }
      });
      return rowsArray;
    }
    return [];
  };
  // Mock data test
  // const jsonRows = require("./mockCusData.json");
  // const rows = cusRows(jsonRows);
  const rows = campaignRows(getData);

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
          {getError[1]}. Unable to load campaign data from the database.
        </Alert>
      </BaseJSX>
    );
  } else if (rows.length === 0) {
    return (
      <BaseJSX rows={[]} dataEntry={"data-entry"}>
        <Typography sx={{ mb: 2 }}>No campaign data entries found.</Typography>
      </BaseJSX>
    );
  }
  return (
    <BaseJSX rows={rows} dataEntry={"data-entry"}>
      <Typography sx={{ mb: 2 }}>
        Campaign data from the database shown below.
      </Typography>
    </BaseJSX>
  );
}
export default CampaignsPage;

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

/**
 * Renders the main card with the campaign table.
 * @param {object} props - Component props.
 * @param {array} props.rows - Array of rows to display in the table.
 * @param {string} props.dataEntry - Route to add or edit a campaign entry.
 * @param {React.ReactNode} props.children - Child components to render.
 * @returns {JSX.Element} The MainCard and MainDataTable of the component.
 */
function CampaignTable({ rows, dataEntry, children }) {
  const [selectedRow, setSelectedRow] = useState({});
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
          cellValues?.row?.status === "incomplete" ||
          cellValues?.row?.status === "completed"
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
          {children}
          <Box sx={{ maxWidth: 1300 }}>
            <MainDataTable
              data={{ rows: rows, columns: cols }}
              newEntryRoute={dataEntry}
              editEntryRoute={dataEntry}
              tableCategory={"Campaign"}
            />
          </Box>
          <ConfirmDialog
            subtitle={`${selectedRow.name} stops any scheduled sending, removes its delivery schedule, and marks its status as incomplete. Do you wish to proceed?`}
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

CampaignTable.propTypes = {
  rows: PropTypes.array,
  children: PropTypes.object,
  dataEntry: PropTypes.string,
};

/**
 * Convert the start_datetime and end_datetime fields of an array of campaign rows
 * to formatted date and time strings, and update the rows with these values.
 *
 * @param {Array} rowsArray - The array of campaign rows to be processed.
 * @returns {Array} - The processed array of campaign rows.
 */
const campaignRows = (rowsArray) => {
  if (rowsArray.length === 0) {
    return [];
  }

  return rowsArray.map((entry) => {
    const nullDate = "1970-01-01T00:00:00+00:00";
    let startDate = "";
    let endDate = "";
    let startTime = "";
    let endTime = "";
    if (entry["start_datetime"] && entry["start_datetime"] != nullDate) {
      const startDateTime = new Date(entry["start_datetime"]);
      startDate = startDateTime.toLocaleDateString("en-US");
      startTime = startDateTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    if (entry["end_datetime"] && entry["end_datetime"] != nullDate) {
      const endDateTime = new Date(entry["end_datetime"]);
      endDate = endDateTime.toLocaleDateString("en-US");
      endTime = endDateTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    if (entry["start_datetime"] == nullDate) {
      entry["date_scheduled"] = "-";
      entry["time_scheduled"] = "-";
    } else {
      entry["date_scheduled"] = startDate + " - " + endDate;
      entry["time_scheduled"] = startTime + " - " + endTime;
    }
    return entry;
  });
};

/**
 * The CampaignsPage component, used to render the templates view.
 *
 * @returns {JSX.Element} The CampaignsPage component.
 */
function CampaignsPage() {
  const { isLoading, getData, getError } = useGetAll("campaigns");
  const rows = campaignRows(getData);
  // Mock data test
  // const jsonRows = require("./mockCusData.json"); v
  // const rows = cusRows(jsonRows);

  return (
    <CampaignTable rows={isLoading ? [] : rows} dataEntry={"data-entry"}>
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : getError[0] ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {getError[1]}. Unable to load campaign data from the database.
        </Alert>
      ) : rows.length === 0 ? (
        <Typography sx={{ mb: 2 }}>No campaign data entries found.</Typography>
      ) : (
        <Typography sx={{ mb: 2 }}>
          Campaigns from the database shown below.
        </Typography>
      )}
    </CampaignTable>
  );
}
export default CampaignsPage;

import PropTypes from "prop-types";

import { useState } from "react";

// material ui
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Alert from "@mui/material/Alert";
import DateTimePicker from "@mui/lab/DateTimePicker";
import Grid from "@mui/material/Grid";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

// third party imports
import TimezoneSelect from "react-timezone-select";

const cols = [
  {
    field: "id",
    hide: true,
  },
  {
    field: "start_date",
    headerName: "Start Date",
    minWidth: 255,
    flex: 1.2,
  },
  {
    field: "end_date",
    headerName: "End Date",
    minWidth: 80,
    maxWidth: 80,
    flex: 0.5,
  },
  {
    field: "time_zone",
    headerName: "Time Zone",
    minWidth: 130,
    flex: 1,
  },
];

CampaignDeliveryForm.propTypes = {
  formik: PropTypes.object,
  start_datetime: PropTypes.object,
  end_datetime: PropTypes.object,
  time_zone: PropTypes.object,
};

export default function CampaignDeliveryForm(props) {
  // individual error messages ??
  // const startDateErrorVisible = false;
  // const endDateErrorVisible = false;
  const [startDateErrorVisible, setStartDateErrorVisible] = useState(false);
  const [endDateErrorVisible, setEndDateErrorVisible] = useState(false);
  const [selectedTimezone, setSelectedTimezone] = useState({});
  const [selectedStartDatetime, setStartDatetime] = useState({});
  const [selectedEndDatetime, setEndDatetime] = useState({});

  // consolidated validation error ??
  // const timeErrorVisible = false;

  const convertToEST = (selectedDateTime) => {
    let d = new Date(1458619200000);
    let myTimezone = "America/Toronto";
    let myDatetimeFormat = "YYYY-MM-DD hh:mm:ss a z";
    let myDatetimeString = moment(d).tz(myTimezone).format(myDatetimeFormat);
    console.log(myDatetimeString);
  };

  const startTimeValidation = (startTime, endTime) => {
    if (startTime >= endTime) {
      setStartDateErrorVisible(true);
    } else {
      setStartDateErrorVisible(false);
    }
  };

  const endTimeValidation = (startTime, endTime) => {
    if (endTime <= startTime) {
      setEndDateErrorVisible(true);
    } else {
      setEndDateErrorVisible(false);
    }
  };

  // const setStartDatetime = (startDatetime) => {
  //   props.formik.setFieldValue("start_datetime", startDatetime);
  // };

  // const setEndDatetime = (endDatetime) => {
  //   props.formik.setFieldValue("start_datetime", endDatetime);
  // };

  // const setSelectedTimezone = (selectedTimezone) => {
  //   props.formik.setFieldValue("start_datetime", selectedTimezone);
  // };

  const formatTime = (inTime) => {
    if (inTime) {
      startTimeValidation(inTime);
      endTimeValidation(inTime);
      return "Formatted Time";
    } else {
      return null;
    }
  };

  // const [selectedStartDatetime] = useState({});
  // const [selectedEndDatetime] = useState({});
  // const [selectedTimezone] = useState({});

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6} lg={10} xl={6}>
          <Typography variant="caption" sx={{ mb: 0.5 }} component="div">
            Select Start Date:
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              fullWidth
              label="Start Date"
              value={selectedStartDatetime}
              onChange={setStartDatetime}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <TextField
            size="small"
            fullWidth
            disabled
            value={
              selectedStartDatetime ? formatTime(selectedStartDatetime) : null
            }
          />
        </Grid>
        <Grid item xs={12} sm={10} md={10} lg={10} xl={10}>
          <Typography variant="caption" sx={{ mb: 0.5 }} component="div">
            Select End Date:
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              fullWith
              label="End Date"
              value={selectedEndDatetime}
              onChange={setEndDatetime}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>
        {/* <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <TextField
            size="small"
            fullWidth
            disabled
            value={"EST: 12:00PM"}
          />
        </Grid> */}
        {startDateErrorVisible ||
          (endDateErrorVisible && (
            <Alert severity="error">
              Start Date must be prior to End Date. Please check date values.
            </Alert>
          ))}
        <Grid
          item
          sx={{ minHeight: "400px" }}
          xs={12}
          sm={10}
          md={10}
          lg={10}
          xl={10}
        >
          <Typography variant="caption" sx={{ mb: 0.5 }} component="div">
            Select Timezone:
          </Typography>
          <TimezoneSelect
            size="small"
            fullWidth
            defaultValue={"(GMT-5:00) Eastern Time"}
            value={selectedTimezone}
            onChange={setSelectedTimezone}
          />
        </Grid>
      </Grid>
    </>
  );
}

import PropTypes from "prop-types";
import { useState } from "react";

// material ui
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Box from "@mui/material/Box";
import DateTimePicker from "@mui/lab/DateTimePicker";
import Divider from "@mui/material/Divider";
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

function dhm(t) {
  var cd = 24 * 60 * 60 * 1000,
    ch = 60 * 60 * 1000,
    d = Math.floor(t / cd),
    h = Math.floor((t - d * cd) / ch),
    m = Math.round((t - d * cd - h * ch) / 60000);
  if (m === 60) {
    h++;
    m = 0;
  }
  if (h === 24) {
    d++;
    h = 0;
  }
  return [d, h, m];
}

CampaignDeliveryForm.propTypes = {
  formik: PropTypes.object,
  dataEntryType: PropTypes.string,
};

export default function CampaignDeliveryForm(props) {
  const today = new Date(new Date().getTime() + 5 * 60000);
  let time_zone = {};
  if (props.formik.values.time_zone == "") {
    time_zone = {
      value: "America/Detroit",
      label: "(GMT-5:00) Eastern Time",
      offset: -5,
      abbrev: "EST",
      altName: "Eastern Standard Time",
    };
  }
  const [timeZone, setTimeZone] = useState(time_zone);
  const [startDatetime, setStartDatetime] = useState(
    props.formik.values.start_datetime != "1970-01-01T00:00:00+00:00"
      ? props.formik.values.start_datetime
      : {}
  );
  const [endDatetime, setEndDatetime] = useState(
    props.formik.values.end_datetime != "1970-01-01T00:00:00+00:00"
      ? props.formik.values.end_datetime
      : {}
  );
  const deltaTime = new Date(startDatetime) - new Date();
  const [days, hours, minutes] = dhm(deltaTime);
  const isDisabled = () => {
    if (isNaN(startDatetime) || !startDatetime) {
      return true;
    }
    return false;
  };
  return (
    <>
      <Divider color="gray" sx={{ height: 2 }} />
      <Box sx={{ minHeight: "500px" }}>
        <Grid container spacing={2} sx={{ mt: 1, mb: 3 }}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography color="primary" fontSize={18} component="div">
              <Box sx={{ fontWeight: "regular" }}>
                Campaign Delivery Schedule
              </Box>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography sx={{ mb: 1 }} fontSize={15} variant="caption">
              The selected start time will begin the launch of emails to the
              specified targets.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={11} md={5} lg={4} xl={3}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h5" gutterBottom color="text.primary">
                Select Start Date and Time
              </Typography>
            </Box>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                fullWidth
                size="small"
                minDateTime={props.dataEntryType == "new" ? today : {}}
                label="Start Date and Time"
                value={startDatetime}
                onChange={(e) => {
                  if (e != null) {
                    props.formik.setFieldValue("start_datetime", e);
                    setStartDatetime(e);
                  }
                }}
                renderInput={(params) => (
                  <TextField {...params} fullWidth size="small" />
                )}
              />
            </LocalizationProvider>
            <Typography variant="caption" sx={{ mt: 1 }} component="div">
              Must occur after the current date and time.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={11} md={5} lg={4} xl={3}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h5" gutterBottom color="text.primary">
                Select End Date and Time
              </Typography>
            </Box>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                disabled={isNaN(startDatetime) || !startDatetime ? true : false}
                fullWidth
                size="small"
                minDateTime={startDatetime}
                label="End Date and Time"
                value={endDatetime}
                onChange={(e) => {
                  if (e != null) {
                    props.formik.setFieldValue("end_datetime", e.toString());
                    setEndDatetime(e);
                  }
                }}
                renderInput={(params) => (
                  <TextField {...params} fullWidth size="small" />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xl={4} />
          <Grid
            item
            sx={{ minHeight: "0px" }}
            xs={12}
            sm={11}
            md={10}
            lg={8}
            xl={6}
          >
            <Box sx={{ mb: 2 }}>
              <Typography variant="h5" gutterBottom color="text.primary">
                Select Time Zone
              </Typography>
            </Box>
            <TimezoneSelect
              size="small"
              fullWidth
              value={timeZone}
              onChange={(e) => {
                props.formik.setFieldValue("time_zone", e.label);
                setTimeZone(e);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={11} md={12} lg={12} xl={12}>
            <Box sx={{ mt: 2 }}>
              <Typography display="inline" color="text.primary">
                The emails are scheduled to be delivered in:&nbsp;
              </Typography>
              <Typography variant="h5" display="inline" color="text.secondary">
                &nbsp;{days || 0} days(s), {hours || 0} hours(s) and{" "}
                {minutes || 0} minutes(s).
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

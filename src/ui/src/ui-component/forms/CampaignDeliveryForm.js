import { useState } from "react";

// material ui
import AdapterDateFns from "@mui/lab/AdapterDateFns";
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

export default function CampaignDeliveryForm() {
  const [selectedTimezone, setSelectedTimezone] = useState({});
  const [selectedStartDatetime, setStartDatetime] = useState({});
  const [selectedEndDatetime, setEndDatetime] = useState({});

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={10} md={10} lg={10} xl={10}>
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
            value={selectedTimezone}
            onChange={setSelectedTimezone}
          />
        </Grid>
      </Grid>
    </>
  );
}

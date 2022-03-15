import React from "react";
// import ReactDOM from 'react-dom';
// import { useFormik } from 'formik';
// import * as yup from "yup";
// material-ui
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

export default function CustomerForm() {
  const [dateVal, setDateVal] = React.useState(null);
  const [cusTypeVal, setCusTypeVal] = React.useState("");
  return (
    <FormControl>
      <Grid container spacing={2}>
        <Grid item xs={10} sm={7} md={7} lg={7} xl={7}>
          <TextField
            fullWidth
            required
            id="custName"
            name="custName"
            label="Customer Name"
            // onChange={formik.handleChange}
            // value={values.custName}
          />
        </Grid>
        <Grid item xs={10} sm={5} md={5} lg={5} xl={5}>
          <TextField
            fullWidth
            required
            id="custId"
            name="custId"
            label="Customer Identifier"
            // helperText="Customer acronym"
            // onChange={formik.handleChange}
            // value={values.custId}
          />
        </Grid>
        <Grid item xs={10} sm={7} md={7} lg={7} xl={7}>
          <TextField
            fullWidth
            required
            id="custDomain"
            name="custDomain"
            label="Customer Domain"
            // onChange={formik.handleChange}
            // value={values.custDomain}
          />
        </Grid>
        <Grid item xs={10} sm={5} md={5} lg={5} xl={5}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              fullWidth
              required
              label="Appendix A Date"
              value={dateVal}
              onChange={(event) => {
                setDateVal(event);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={10} sm={8} md={7} lg={7} xl={7}>
          <TextField
            select
            fullWidth
            required
            value={cusTypeVal}
            label="Customer Type"
            onChange={(event) => {
              setCusTypeVal(event.target.value);
            }}
          >
            <MenuItem value={10}>Government - Federal</MenuItem>
            <MenuItem value={20}>Government - State</MenuItem>
            <MenuItem value={30}>Government - Local</MenuItem>
            <MenuItem value={40}>Government - Tribal</MenuItem>
            <MenuItem value={50}>Government - Territorial</MenuItem>
            <MenuItem value={60}>Private</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={2} sm={4} md={5} lg={5} xl={5}></Grid>
        <Grid item xs={10} sm={8} md={7} lg={7} xl={7}>
          <TextField
            fullWidth
            required
            id="addressOne"
            name="addressOne"
            label="Address 1"
            // onChange={formik.handleChange}
            // value={values.custDomain}
          />
        </Grid>
        <Grid item xs={10} sm={4} md={5} lg={5} xl={5}>
          <TextField
            fullWidth
            id="addressTwo"
            name="addressTwo"
            label="Address 2"
            // onChange={formik.handleChange}
            // value={values.custDomain}
          />
        </Grid>
        <Grid item xs={10} sm={6} md={6} lg={6} xl={6}>
          <TextField
            fullWidth
            required
            id="city"
            name="city"
            label="City"
            // onChange={formik.handleChange}
            // value={values.custDomain}
          />
        </Grid>
        <Grid item xs={10} sm={3} md={3} lg={3} xl={3}>
          <TextField
            fullWidth
            required
            id="state"
            name="state"
            label="State"
            // onChange={formik.handleChange}
            // value={values.custDomain}
          />
        </Grid>
        <Grid item xs={10} sm={3} md={3} lg={3} xl={3}>
          <TextField
            fullWidth
            required
            id="zip"
            name="zip"
            label="Zip Code"
            // onChange={formik.handleChange}
            // value={values.custDomain}
          />
        </Grid>
      </Grid>
    </FormControl>
  );
}

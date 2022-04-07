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

export default function TemplateForm() {
  const [dateVal, setDateVal] = React.useState(null);
  const [cusTypeVal, setCusTypeVal] = React.useState("");
  return (
    <FormControl>
      <Grid container spacing={2}>
        <Grid item xs={10} sm={7} md={7} lg={7} xl={7}>
          <TextField
            fullWidth
            required
            id="templateName"
            name="templateName"
            label="Template Name"
            // onChange={formik.handleChange}
            // value={values.custName}
          />
        </Grid>
        <Grid item xs={10} sm={5} md={5} lg={5} xl={5}>
          <TextField
            fullWidth
            required
            id="deceptionScore"
            name="deceptionScore"
            label="Deception Score"
            // helperText="Customer acronym"
            // onChange={formik.handleChange}
            // value={values.custId}
          />
        </Grid>
      </Grid>
    </FormControl>
  );
}

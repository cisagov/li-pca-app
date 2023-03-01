import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

//material-ui
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Button from "@mui/material/Button";
import DatePicker from "@mui/lab/DatePicker";
import Grid from "@mui/material/Grid";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

const CustomerInfoForm = (props) => {
  let formik = props.formik;
  return (
    <>
      <Grid item xs={11} sm={6} md={4.5} lg={4.5} xl={4.5}>
        <TextField
          fullWidth
          size="small"
          id="name"
          name="name"
          label="Customer Name *"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
      </Grid>
      <Grid item xs={11} sm={6} md={4.5} lg={4.5} xl={4.5}>
        <TextField
          fullWidth
          size="small"
          id="domain"
          name="domain"
          label="Customer Domain *"
          value={formik.values.domain}
          onChange={formik.handleChange}
          error={formik.touched.domain && Boolean(formik.errors.domain)}
          helperText={formik.touched.domain && formik.errors.domain}
        />
      </Grid>
      <Grid item xs={11} sm={6} md={3} lg={3} xl={3}>
        <TextField
          fullWidth
          size="small"
          id="identifier"
          name="identifier"
          label="Customer Identifier *"
          value={formik.values.identifier}
          onChange={formik.handleChange}
          error={formik.touched.identifier && Boolean(formik.errors.identifier)}
          helperText={formik.touched.identifier && formik.errors.identifier}
        />
      </Grid>
      <Grid item xs={11} sm={6} md={4.5} lg={4.5} xl={4.5}>
        <TextField
          select
          fullWidth
          size="small"
          label="Customer Type *"
          id="customer_type"
          name="customer_type"
          value={formik.values.customer_type}
          onChange={formik.handleChange}
          error={
            formik.touched.customer_type && Boolean(formik.errors.customer_type)
          }
          helperText={
            formik.touched.customer_type && formik.errors.customer_type
          }
        >
          <MenuItem value={"Federal"}>Government - Federal</MenuItem>
          <MenuItem value={"State"}>Government - State</MenuItem>
          <MenuItem value={"Local"}>Government - Local</MenuItem>
          <MenuItem value={"Tribal"}>Government - Tribal</MenuItem>
          <MenuItem value={"Territorial"}>Government - Territorial</MenuItem>
          <MenuItem value={"Private"}>Private</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={11} sm={6} md={4.5} lg={4.5} xl={4.5}>
        <TextField
          select
          fullWidth
          size="small"
          label="Critical Infrastructure *"
          id="critical_infrastructure"
          name="critical_infrastructure"
          value={formik.values.critical_infrastructure}
          onChange={formik.handleChange}
          error={
            formik.touched.critical_infrastructure &&
            Boolean(formik.errors.critical_infrastructure)
          }
          helperText={
            formik.touched.critical_infrastructure &&
            formik.errors.critical_infrastructure
          }
        >
          <MenuItem value={"Chemical Sector"}>Chemical Sector</MenuItem>
          <MenuItem value={"Commercial Facilities Sector"}>
            Commercial Facilities Sector
          </MenuItem>
          <MenuItem value={"Communications Sector"}>
            Communications Sector
          </MenuItem>
          <MenuItem value={"Critical Manufacturing Sector"}>
            Critical Manufacturing Sector
          </MenuItem>
          <MenuItem value={"Dams Sector"}>Dams Sector</MenuItem>
          <MenuItem value={"Defense Industrial Base Sector"}>
            Defense Industrial Base Sector
          </MenuItem>
          <MenuItem value={"Emergency Services Sector"}>
            Emergency Services Sector
          </MenuItem>
          <MenuItem value={"Energy Sector"}>Energy Sector</MenuItem>
          <MenuItem value={"Financial Services Sector"}>
            Financial Services Sector
          </MenuItem>
          <MenuItem value={"Food and Agriculture Sector"}>
            Food and Agriculture Sector
          </MenuItem>
          <MenuItem value={"Government Facilities Sector"}>
            Government Facilities Sector
          </MenuItem>
          <MenuItem value={"Healthcare and Public Health Sector"}>
            Healthcare and Public Health Sector
          </MenuItem>
          <MenuItem value={"Information Technology Sector"}>
            Information Technology Sector
          </MenuItem>
          <MenuItem value={"Nuclear Reactor, Materials, and Waste Sector"}>
            Nuclear Reactor, Materials, and Waste Sector
          </MenuItem>
          <MenuItem value={"Transportation Systems Sector"}>
            Transportation Systems Sector
          </MenuItem>
          <MenuItem value={"Water and Wastewater Systems Sector"}>
            Water and Wastewater Systems Sector
          </MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={11} sm={6} md={3} lg={3} xl={3}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            fullWidth
            size="small"
            label="Appendix A Date"
            value={props.custData.appendix_a_date}
            onChange={(e) => {
              props.setCustData({ ...props.custData, appendix_a_date: e });
              formik.setFieldValue("appendix_a_date", e);
            }}
            renderInput={(params) => (
              <TextField {...params} fullWidth size="small" />
            )}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={12} md={12} xl={12} />
      <Grid item xs={11} sm={6} md={6} lg={6} xl={6}>
        <TextField
          fullWidth
          size="small"
          id="address_1"
          name="address_1"
          label="Address 1 *"
          value={formik.values.address_1}
          onChange={formik.handleChange}
          error={formik.touched.address_1 && Boolean(formik.errors.address_1)}
          helperText={formik.touched.address_1 && formik.errors.address_1}
        />
      </Grid>
      <Grid item xs={11} sm={6} md={6} lg={6} xl={6}>
        <TextField
          fullWidth
          size="small"
          id="address_2"
          name="address_2"
          label="Address 2"
          value={formik.values.address_2}
          onChange={formik.handleChange}
          error={formik.touched.address_2 && Boolean(formik.errors.address_2)}
          helperText={formik.touched.address_2 && formik.errors.address_2}
        />
      </Grid>
      <Grid item xs={11} sm={6} md={6} lg={6} xl={6}>
        <TextField
          fullWidth
          size="small"
          id="city"
          name="city"
          label="City *"
          value={formik.values.city}
          onChange={formik.handleChange}
          error={formik.touched.city && Boolean(formik.errors.city)}
          helperText={formik.touched.city && formik.errors.city}
        />
      </Grid>
      <Grid item xs={11} sm={6} md={3.5} lg={3.5} xl={3.5}>
        <TextField
          fullWidth
          size="small"
          id="state"
          name="state"
          label="State *"
          value={formik.values.state}
          onChange={formik.handleChange}
          error={formik.touched.state && Boolean(formik.errors.state)}
          helperText={formik.touched.state && formik.errors.state}
        />
      </Grid>
      <Grid item xs={11} sm={6} md={2.5} lg={2.5} xl={2.5}>
        <TextField
          fullWidth
          size="small"
          id="zip_code"
          name="zip_code"
          label="Zip Code *"
          value={formik.values.zip_code}
          onChange={formik.handleChange}
          error={formik.touched.zip_code && Boolean(formik.errors.zip_code)}
          helperText={formik.touched.zip_code && formik.errors.zip_code}
        />
      </Grid>
      <Grid
        item
        display={{ xs: "none", sm: "block" }}
        sm={10}
        md={10}
        lg={11}
        xl={11}
      />
      <Grid item xs={10} sm={2} md={2} lg={1} xl={1}>
        <Button size="medium" fullWidth onClick={formik.handleReset}>
          Reset
        </Button>
      </Grid>
    </>
  );
};

CustomerInfoForm.propTypes = {
  formik: PropTypes.object,
};

export default CustomerInfoForm;

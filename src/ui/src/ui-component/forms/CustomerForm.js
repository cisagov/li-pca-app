import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

//material-ui
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Button from "@mui/material/Button";
import DatePicker from "@mui/lab/DatePicker";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Grid from "@mui/material/Grid";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

//third party
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  identifier: yup.string().required("Identifier is required"),
  domain: yup.string().required("Domain is required"),
  customer_type: yup.string().required("Customer Type is required"),
  address_1: yup.string().required("Address 1 is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  zip_code: yup.string().required("Zip Code is required"),
});

const CustomerForm = (props) => {
  let navigate = useNavigate();
  const [cancelbtnOpen, setCancelbtnOpen] = React.useState(false);
  const [savebtnOpen, setSavebtnOpen] = React.useState(false);
  const fieldsToValidate = {
    name: true,
    identifier: true,
    domain: true,
    customer_type: true,
    address_1: true,
    city: true,
    state: true,
    zip_code: true,
  };
  const formik = useFormik({
    initialValues: props.initialCustValues,
    validationSchema: validationSchema,
    validateOnChange: true,
    onSubmit: (values, actions) => {
      values.contact_list = props.custData.contact_list;
      props.setCustData(values);
      props.setHasSubmitted(true);
      setTimeout(() => {
        actions.resetForm();
        navigate("/li-pca-app/customers");
      });
    },
  });
  const handleCancel = () => {
    if (formik.dirty) {
      setCancelbtnOpen(true);
    } else {
      navigate("/li-pca-app/customers");
    }
  };
  const isDisabled = () => {
    if (!props.hasContact) {
      return true;
    } else if (props.hasContact && (formik.dirty || props.contactUpdate)) {
      return false;
    }
    return true;
  };
  const handleSave = () => {
    formik.setTouched(fieldsToValidate);
    if (formik.isValid && props.hasContact) {
      setSavebtnOpen(true);
    }
  };
  return (
    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
      <form id="customer-form" onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={10} sm={7} md={7} lg={7} xl={7}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Customer Name *"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
          <Grid item xs={10} sm={5} md={5} lg={5} xl={5}>
            <TextField
              fullWidth
              id="identifier"
              name="identifier"
              label="Customer Identifier *"
              value={formik.values.identifier}
              onChange={formik.handleChange}
              error={
                formik.touched.identifier && Boolean(formik.errors.identifier)
              }
              helperText={formik.touched.identifier && formik.errors.identifier}
            />
          </Grid>
          <Grid item xs={10} sm={7} md={7} lg={7} xl={7}>
            <TextField
              fullWidth
              id="domain"
              name="domain"
              label="Customer Domain *"
              value={formik.values.domain}
              onChange={formik.handleChange}
              error={formik.touched.domain && Boolean(formik.errors.domain)}
              helperText={formik.touched.domain && formik.errors.domain}
            />
          </Grid>
          <Grid item xs={10} sm={5} md={5} lg={5} xl={5}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                fullWidth
                label="Appendix A Date"
                value={props.custData.appendixADate}
                onChange={(e) => {
                  props.setCustData({ ...props.custData, appendixADate: e });
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={10} sm={8} md={7} lg={7} xl={7}>
            <TextField
              select
              fullWidth
              label="Customer Type *"
              id="customer_type"
              name="customer_type"
              value={formik.values.customer_type}
              onChange={formik.handleChange}
              error={
                formik.touched.customer_type &&
                Boolean(formik.errors.customer_type)
              }
              helperText={
                formik.touched.customer_type && formik.errors.customer_type
              }
            >
              <MenuItem value={"Federal"}>Government - Federal</MenuItem>
              <MenuItem value={"State"}>Government - State</MenuItem>
              <MenuItem value={"Local"}>Government - Local</MenuItem>
              <MenuItem value={"Tribal"}>Government - Tribal</MenuItem>
              <MenuItem value={"Territorial"}>
                Government - Territorial
              </MenuItem>
              <MenuItem value={"Private"}>Private</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={2} sm={4} md={5} lg={5} xl={5}></Grid>
          <Grid item xs={10} sm={8} md={7} lg={7} xl={7}>
            <TextField
              fullWidth
              id="address_1"
              name="address_1"
              label="Address 1 *"
              value={formik.values.address_1}
              onChange={formik.handleChange}
              error={
                formik.touched.address_1 && Boolean(formik.errors.address_1)
              }
              helperText={formik.touched.address_1 && formik.errors.address_1}
            />
          </Grid>
          <Grid item xs={10} sm={4} md={5} lg={5} xl={5}>
            <TextField
              fullWidth
              id="address_2"
              name="address_2"
              label="Address 2"
              value={formik.values.address_2}
              onChange={formik.handleChange}
              error={
                formik.touched.address_2 && Boolean(formik.errors.address_2)
              }
              helperText={formik.touched.address_2 && formik.errors.address_2}
            />
          </Grid>
          <Grid item xs={10} sm={6} md={6} lg={6} xl={6}>
            <TextField
              fullWidth
              id="city"
              name="city"
              label="City *"
              value={formik.values.city}
              onChange={formik.handleChange}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
            />
          </Grid>
          <Grid item xs={10} sm={3} md={3} lg={3} xl={3}>
            <TextField
              fullWidth
              id="state"
              name="state"
              label="State *"
              value={formik.values.state}
              onChange={formik.handleChange}
              error={formik.touched.state && Boolean(formik.errors.state)}
              helperText={formik.touched.state && formik.errors.state}
            />
          </Grid>
          <Grid item xs={10} sm={3} md={3} lg={3} xl={3}>
            <TextField
              fullWidth
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
            sm={9}
            md={10}
            lg={10}
            xl={11}
          />
          <Grid item xs={10} sm={3} md={2} lg={2} xl={1}>
            <Button size="large" fullWidth onClick={formik.handleReset}>
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
      {props.children}
      <Grid container spacing={2}>
        <Grid item xs={10} sm={12} md={12} lg={12} xl={12} sx={{ mb: 5 }} />
        <Grid
          item
          display={{ xs: "none", sm: "block" }}
          sm={5}
          md={7}
          lg={8}
          xl={8}
        />
        <Grid item xs={10} sm={5} md={4} lg={3} xl={3}>
          <Button
            fullWidth
            variant="contained"
            size="large"
            disabled={isDisabled()}
            onClick={handleSave}
          >
            Save Customer
          </Button>
        </Grid>
        <form id="customer-form">
          <Dialog open={savebtnOpen}>
            <DialogTitle>Confirmation</DialogTitle>
            <DialogContent>
              Do you want to save your changes?
              <Button onClick={() => setSavebtnOpen(false)}>Cancel</Button>
              <Button
                color="primary"
                variant="contained"
                endIcon={<CheckCircleOutlineIcon />}
                type="submit"
                form="customer-form"
              >
                Save
              </Button>
            </DialogContent>
          </Dialog>
        </form>
        <Grid item xs={10} sm={1} md={1} lg={1} xl={1}>
          <Button
            color="dark"
            variant="text"
            size="large"
            fullWidth
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Dialog open={cancelbtnOpen}>
            <DialogTitle>Are you sure you want to leave this page?</DialogTitle>
            <DialogContent>
              Changes made here will not be saved.
              <Button onClick={() => navigate("/li-pca-app/customers")}>
                Yes
              </Button>
              <Button onClick={() => setCancelbtnOpen(false)}>Cancel</Button>
            </DialogContent>
          </Dialog>
        </Grid>
      </Grid>
    </Grid>
  );
};

CustomerForm.propTypes = {
  initialCustValues: PropTypes.object,
  setCustData: PropTypes.func,
  custData: PropTypes.object,
  hasContact: PropTypes.bool,
  contactUpdate: PropTypes.bool,
  children: PropTypes.array,
  setHasSubmitted: PropTypes.func,
};

export default CustomerForm;

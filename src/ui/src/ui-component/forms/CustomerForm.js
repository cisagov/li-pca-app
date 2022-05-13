import React from "react";
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

// project imports
import ConfirmDialog from "ui-component/popups/ConfirmDialog";

//third party
import { useFormik } from "formik";
import * as yup from "yup";

yup.addMethod(yup.string, "unique", function (myArray, msg) {
  return this.test({
    name: "unique",
    message: msg,
    test: (value) => !myArray.includes(value),
  });
});

const CustomerForm = (props) => {
  const validationSchema = yup.object({
    name: yup
      .string()
      .required("Name is required")
      .min(2, "Please enter more than one character"),
    identifier: yup
      .string()
      .required("Identifier is required")
      .unique(props.identifiers, "This Customer Identifier already exists"),
    domain: yup.string().required("Domain is required"),
    customer_type: yup.string().required("Customer Type is required"),
    address_1: yup.string().required("Address 1 is required"),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    zip_code: yup.string().required("Zip Code is required"),
  });
  let navigate = useNavigate();
  const [cancelbtnOpen, setCancelbtnOpen] = React.useState(false);
  const [savebtnOpen, setSavebtnOpen] = React.useState(false);
  const [deletebtnOpen, setDeletebtnOpen] = React.useState(false);
  const fieldsToValidate = {
    name: true,
    appendix_a_date: true,
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
    onSubmit: (values) => {
      values.contact_list = props.custData.contact_list;
      const appendixADate = new Date(props.custData.appendix_a_date);
      values.appendix_a_date = appendixADate.toISOString();
      props.setCustData(Object.assign(props.custData, values));
      props.setHasSubmitted(true);
      setTimeout(() => {
        setSavebtnOpen(false);
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

  const confirmDelete = () => {
    setTimeout(() => {
      setDeletebtnOpen(false);
      props.setDelete(true);
    });
  };
  let subtitleConfirm =
    formik.values.name + " will be updated in the database.";
  if (props.dataEntryType == "New Customer") {
    subtitleConfirm = formik.values.name + " will be added to the database.";
  }
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
                value={props.custData.appendix_a_date}
                onChange={(e) => {
                  props.setCustData({ ...props.custData, appendix_a_date: e });
                  formik.setFieldValue("appendix_a_date", e);
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
        {props.dataEntryType == "New Customer" ? (
          <Grid
            item
            display={{ xs: "none", sm: "block" }}
            sm={5}
            md={7}
            lg={8}
            xl={8}
          />
        ) : (
          <Grid
            item
            display={{ xs: "none", sm: "block" }}
            sm={1}
            md={4}
            lg={6}
            xl={6}
          />
        )}
        <Grid item xs={10} sm={5} md={4} lg={3} xl={3}>
          <Button
            fullWidth
            color="info"
            variant="contained"
            size="large"
            disabled={isDisabled()}
            onClick={handleSave}
          >
            Save Customer
          </Button>
        </Grid>
        <form id="customer-form">
          <ConfirmDialog
            subtitle={subtitleConfirm}
            confirmType="Save"
            formName="customer-form"
            isOpen={savebtnOpen}
            setIsOpen={setSavebtnOpen}
          />
        </form>
        {props.dataEntryType == "New Customer" ? (
          <React.Fragment />
        ) : (
          <React.Fragment>
            <Grid item xs={10} sm={4} md={3} lg={2} xl={2}>
              <Button
                fullWidth
                variant="text"
                size="large"
                color="error"
                disabled={false}
                onClick={() => setDeletebtnOpen(true)}
              >
                Delete Customer
              </Button>
            </Grid>
            <ConfirmDialog
              subtitle={
                formik.values.name + " will be deleted in the database."
              }
              confirmType="Delete"
              handleClick={confirmDelete}
              isOpen={deletebtnOpen}
              setIsOpen={setDeletebtnOpen}
            />
          </React.Fragment>
        )}
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
          <ConfirmDialog
            subtitle="Unsaved changes will be discarded."
            confirmType="Leave"
            handleClick={() => navigate("/li-pca-app/customers")}
            isOpen={cancelbtnOpen}
            setIsOpen={setCancelbtnOpen}
          />
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
  dataEntryType: PropTypes.string,
  setDelete: PropTypes.func,
  identifiers: PropTypes.array,
};

export default CustomerForm;

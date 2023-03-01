import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

//material-ui
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// project imports
import ConfirmDialog from "ui-component/popups/ConfirmDialog";
import CustomerInfoForm from "./CustomerInfoForm";
import ResultDialog from "ui-component/popups/ResultDialog";
import { submitEntry, deleteEntry } from "services/api.js";

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
    critical_infrastructure: yup
      .string()
      .required("Critical Infrastructure is required"),
  });
  let navigate = useNavigate();
  let contactLen = props.custData.contact_list.length;
  const [contactUpdated, setContactUpdate] = useState(false);
  const [cancelbtnOpen, setCancelbtnOpen] = useState(false);
  const [savebtnOpen, setSavebtnOpen] = useState(false);
  const [deletebtnOpen, setDeletebtnOpen] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [getDelete, setDelete] = useState(false);
  const [getError, setError] = useState([false, ""]);
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
    critical_infrastructure: true,
  };
  const formik = useFormik({
    initialValues: props.initialCustValues,
    validationSchema: validationSchema,
    validateOnMount: true,
    validateOnChange: true,
    onSubmit: (values) => {
      const dType = props.dataEntryType;
      values.contact_list = props.custData.contact_list;
      const appendixADate = new Date(props.custData.appendix_a_date);
      values.appendix_a_date = appendixADate.toISOString();
      const custData = Object.assign(props.custData, values);
      props.setCustData(custData);
      setHasSubmitted(true);
      submitEntry("customers", custData, custData._id, dType, setError);
      setTimeout(() => {
        setSavebtnOpen(false);
      });
    },
  });
  const didMount = useRef(false);
  useEffect(() => {
    if (didMount.current) {
      setContactUpdate(true);
    } else {
      didMount.current = true;
    }
  }, [props.custData.contact_list]);
  const handleCancel = () => {
    if (contactUpdated || formik.dirty) {
      setCancelbtnOpen(true);
    } else {
      navigate("/cat-phishing/customers");
    }
  };
  const isDisabled = () => {
    if (contactLen >= 2 && (contactUpdated || formik.dirty)) {
      return false;
    }
    return true;
  };

  const handleSave = () => {
    formik.setTouched(fieldsToValidate);
    if (formik.isValid && contactLen >= 2 && (contactUpdated || formik.dirty)) {
      setSavebtnOpen(true);
    }
  };

  const confirmDelete = () => {
    deleteEntry("customers", props.custData._id, setError);
    setTimeout(() => {
      setDeletebtnOpen(false);
      setDelete(true);
      setHasSubmitted(true);
    });
  };

  let subtitleConfirm =
    formik.values.name + " will be updated in the database.";
  if (props.dataEntryType == "New Customer") {
    subtitleConfirm = formik.values.name + " will be added to the database.";
  }
  const closeDialog = () => {
    setHasSubmitted(false);
    setDelete(false);
    if (!getError[0]) {
      navigate("/cat-phishing/customers");
    }
  };
  return (
    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
      {contactLen < 2 && props.dataEntryType == "New Customer" ? (
        <></>
      ) : (
        <form id="customer-form" onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mb: 1 }}>
              <Typography fontSize={18} color="primary">
                Customer Information
              </Typography>
            </Grid>
            <CustomerInfoForm
              formik={formik}
              custData={props.custData}
              setCustData={props.setCustData}
            />
          </Grid>
        </form>
      )}
      {props.children}
      <Grid container spacing={2}>
        <Grid item xs={10} sm={12} md={12} lg={12} xl={12} sx={{ mb: 1 }} />
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
            display={{ xs: "none", sm: "none", md: "block" }}
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
        <ResultDialog
          type={getDelete ? "Delete Customer" : props.dataEntryType}
          hasSubmitted={hasSubmitted}
          error={getError}
          closeDialog={closeDialog}
        />
        {props.dataEntryType == "New Customer" ? (
          <></>
        ) : (
          <>
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
          </>
        )}
        <Grid item xs={10} sm={1} md={1} lg={1} xl={1}>
          <Button variant="text" size="large" fullWidth onClick={handleCancel}>
            Cancel
          </Button>
          <ConfirmDialog
            subtitle="Unsaved changes will be discarded."
            confirmType="Leave"
            handleClick={() => navigate("/cat-phishing/customers")}
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
  children: PropTypes.array,
  dataEntryType: PropTypes.string,
  identifiers: PropTypes.array,
};

export default CustomerForm;

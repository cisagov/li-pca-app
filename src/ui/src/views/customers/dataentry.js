import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

//material-ui
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// project imports
import ConfirmDialog from "ui-component/popups/ConfirmDialog";
import CustomerInfoForm from "ui-component/forms/CustomerInfoForm";
import CustomerPOCForm from "ui-component/forms/CustomerPOCForm";
import DisplayDataTable from "ui-component/tables/DisplayDataTable";
import MainCard from "ui-component/cards/MainCard";
import ResultDialog from "ui-component/popups/ResultDialog";
import { submitEntry, deleteEntry } from "services/api.js";

//third party
import { useFormik } from "formik";
import * as yup from "yup";

// ==============================|| Create/Update Customer View ||============================== //

let custPOCValues = {
  id: 0,
  email: "",
  first_name: "",
  last_name: "",
  mobile_phone: "",
  notes: "",
  office_phone: "",
  title: "",
};

let custFilledPOCValues = {};

const custRowsTransform = (custRows) => {
  if (!custRows.hasOwnProperty("name")) {
    custRows.name = "";
  }
  if (!custRows.hasOwnProperty("identifier")) {
    custRows.identifier = "";
  }
  if (!custRows.hasOwnProperty("domain")) {
    custRows.domain = "";
  }
  if (!custRows.hasOwnProperty("appendix_a_date")) {
    custRows.appendix_a_date = new Date().toISOString();
  }
  if (!custRows.hasOwnProperty("customer_type")) {
    custRows.customer_type = "";
  }
  if (!custRows.hasOwnProperty("address_1")) {
    custRows.address_1 = "";
  }
  if (!custRows.hasOwnProperty("address_2")) {
    custRows.address_2 = "";
  }
  if (!custRows.hasOwnProperty("city")) {
    custRows.city = "";
  }
  if (!custRows.hasOwnProperty("state")) {
    custRows.state = "";
  }
  if (!custRows.hasOwnProperty("zip_code")) {
    custRows.zip_code = "";
  }
  if (!custRows.hasOwnProperty("contact_list")) {
    custRows.contact_list = [];
  }
  if (!custRows.hasOwnProperty("critical_infrastructure")) {
    custRows.critical_infrastructure = "";
  }
  return custRows;
};

const custNewOrEdit = (dataEntryType) => {
  if (dataEntryType == "new") {
    return "New Customer";
  }
  return "Edit Customer";
};

const getOtherIdentifiers = (custData, custValues) => {
  const identifierArr = custData.map(({ identifier }) => identifier);
  return identifierArr.filter((identifier) => {
    if (identifier != custValues.identifier) {
      return identifier;
    }
  });
};

yup.addMethod(yup.string, "unique", function (myArray, msg) {
  return this.test({
    name: "unique",
    message: msg,
    test: (value) => !myArray.includes(value),
  });
});

const CustDataEntryPage = () => {
  const { state } = useLocation();
  let navigate = useNavigate();
  let custValues = custRowsTransform(state.row);
  let dataEntryType = custNewOrEdit(state.dataEntryType);
  const [custData, setCustData] = useState(custValues);
  const contactLen = custData.contact_list.length;
  const identifiers = getOtherIdentifiers(state.rows, custValues);
  // const [hasCampaigns, setCampaigns] = useState(false);
  const hasCampaigns = false;
  const [contactUpdated, setContactUpdate] = useState(false);
  const [cancelbtnOpen, setCancelbtnOpen] = useState(false);
  const [savebtnOpen, setSavebtnOpen] = useState(false);
  const [deletebtnOpen, setDeletebtnOpen] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [getDelete, setDelete] = useState(false);
  const [getError, setError] = useState([false, ""]);
  const campaignCols = [
    { field: "id", hide: true },
    { field: "name", headerName: "Name", flex: 2 },
    { field: "status", headerName: "Status", flex: 2 },
    { field: "active", headerName: "Active", flex: 2 },
    { field: "start_date", headerName: "Start Date", flex: 1.5 },
    { field: "inpsect", headerName: "Inspect", flex: 1.5 },
  ];
  const validationSchema = yup.object({
    name: yup
      .string()
      .required("Name is required")
      .min(2, "Please enter more than one character"),
    identifier: yup
      .string()
      .required("Identifier is required")
      .unique(identifiers, "This Customer Identifier already exists"),
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
  const didMount = useRef(false);
  useEffect(() => {
    if (didMount.current) {
      setContactUpdate(true);
    } else {
      didMount.current = true;
    }
  }, [custData.contact_list]);
  const formik = useFormik({
    initialValues: custValues,
    validationSchema: validationSchema,
    validateOnMount: true,
    validateOnChange: true,
    onSubmit: (values) => {
      const dType = dataEntryType;
      values.contact_list = custData.contact_list;
      const appendixADate = new Date(custData.appendix_a_date);
      values.appendix_a_date = appendixADate.toISOString();
      const submitData = Object.assign(custData, values);
      setCustData(submitData);
      setHasSubmitted(true);
      submitEntry("customers", submitData, submitData._id, dType, setError);
      setTimeout(() => {
        setSavebtnOpen(false);
      });
    },
  });
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
    deleteEntry("customers", custData._id, setError);
    setTimeout(() => {
      setDeletebtnOpen(false);
      setDelete(true);
      setHasSubmitted(true);
    });
  };
  let subtitleConfirm =
    formik.values.name + " will be updated in the database.";
  if (dataEntryType == "New Customer") {
    subtitleConfirm = formik.values.name + " will be added to the database.";
  }
  const closeDialog = () => {
    setHasSubmitted(false);
    setDelete(false);
    if (!getError[0]) {
      navigate("/cat-phishing/customers");
    }
  };
  const renderCampaigns = () => {
    const title = (
      <Grid item xs={12} sm={12} lg={12} xl={12} sx={{ mt: 5, mb: 3 }}>
        <Typography fontSize={18} gutterBottom color="primary">
          Customer Campaigns
        </Typography>
      </Grid>
    );
    if (state.dataEntryType != "new" && hasCampaigns) {
      return (
        <>
          {title}
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ mb: 1 }}>
            <DisplayDataTable data={{ rows: [], columns: campaignCols }} />
          </Grid>
        </>
      );
    } else if (state.dataEntryType != "new") {
      return (
        <>
          {title}
          <Alert severity="info">Customer has no campaigns</Alert>
        </>
      );
    }
  };

  return (
    <MainCard title={dataEntryType}>
      <Box sx={{ ml: 5, mr: 5, mt: 3, maxWidth: 1000 }}>
        <Grid container spacing={2}>
          {/* <CustomerForm
            initialCustValues={custValues}
            setCustData={setCustData}
            custData={custData}
            dataEntryType={mainCardTitle}
            identifiers={getOtherIdentifiers(state.rows, custValues)}
          > */}
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            {contactLen < 2 && dataEntryType == "New Customer" ? (
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
                    custData={custData}
                    setCustData={setCustData}
                  />
                </Grid>
              </form>
            )}
            <Grid item xs={10} sm={12} md={12} lg={12} xl={12} sx={{ mb: 2 }}>
              <Typography gutterBottom fontSize={18} color="primary">
                Customer/Organization Point of Contacts
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ mb: 1 }}>
              <CustomerPOCForm
                initialPOCValues={custPOCValues}
                custFilledPOCValues={custFilledPOCValues}
                setCustData={setCustData}
                custPOCData={custData.contact_list}
                custData={custData}
              />
            </Grid>
            {renderCampaigns()}
            <Grid container spacing={2}>
              <Grid item xs={10} sm={12} md={12} xl={12} sx={{ mb: 1 }} />
              {dataEntryType == "New Customer" ? (
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
                type={getDelete ? "Delete Customer" : dataEntryType}
                hasSubmitted={hasSubmitted}
                error={getError}
                closeDialog={closeDialog}
              />
              {dataEntryType == "New Customer" ? (
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
                <Button
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
                  handleClick={() => navigate("/cat-phishing/customers")}
                  isOpen={cancelbtnOpen}
                  setIsOpen={setCancelbtnOpen}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </MainCard>
  );
};

export default CustDataEntryPage;

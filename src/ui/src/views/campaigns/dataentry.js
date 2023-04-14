import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// material-ui
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import MainCard from "ui-component/cards/MainCard";
import SendIcon from "@mui/icons-material/Send";
import Typography from "@mui/material/Typography";

// project imports
import SimpleStepper from "ui-component/stepper/SimpleStepper";
import ConfirmDialog from "ui-component/popups/ConfirmDialog";
import CampaignDeliveryForm from "ui-component/forms/CampaignDeliveryForm";
import CampaignInitialForm from "ui-component/forms/CampaignInitialForm";
import CampaignReviewForm from "ui-component/forms/CampaignReviewForm";
import CampaignTemplateForm from "ui-component/forms/CampaignTemplateForm";
import ResultDialog from "ui-component/popups/ResultDialog";
import { useGetAll, submitEntry, deleteEntry } from "services/api.js";

//third party
import { useFormik } from "formik";
import * as yup from "yup";

// ==============================|| Create/Update Campaign View ||============================== //

/**
 * Transforms a row object to include default values for any missing properties.
 * @param {Object} campaignRows - The row object to transform.
 * @returns {Object} The transformed row object.
 */
const campaignRowTransform = (campaignRows) => {
  const transformedRows = {
    name: "",
    archived: "",
    description: "",
    status: false,
    admin_email: "",
    operator_email: "",
    sending_domain_id: "",
    landing_page_id: "",
    landing_page_url: "",
    customer_id: "",
    customer_poc: {},
    customer_poc_placeholder: "",
    target_emails: [],
    target_emails_placeholder: "",
    target_email_domains: [],
    target_email_domains_placeholder: "",
    target_count: "",
    target_template_uuid: "",
    start_datetime: "",
    end_datetime: "",
    time_zone: "",
    ...campaignRows,
  };
  // convert objects and arrays to strings for display
  transformedRows.customer_poc_placeholder = JSON.stringify(
    transformedRows.customer_poc
  );
  transformedRows.target_emails_placeholder =
    transformedRows.target_emails.join("\r\n");
  transformedRows.target_email_domains_placeholder =
    transformedRows.target_email_domains.join(", ");

  return transformedRows;
};

const steps = [
  "Initial Setup & Target Selection",
  "Select Phishing Template",
  "Set Delivery Schedule",
  "Review & Send",
];

const initialFieldsToValidate = {
  name: true,
  admin_email: true,
  operator_email: true,
  target_emails_placeholder: true,
};

/**
 * The component that renders the data entry page for campaigns.
 *
 * @returns {JSX.Element} The CampaignDataEntryPage component.
 */
const CampaignDataEntryPage = () => {
  // react-router-dom Hooks
  const navigate = useNavigate();
  const { state } = useLocation();
  // Hooks
  const dataEntryType = state.dataEntryType;
  const [activeStep, setActiveStep] = useState(0);
  const [invalidAlert, setInvalidAlert] = useState("");
  const [savebtnOpen, setSavebtnOpen] = useState(false);
  const [deletebtnOpen, setDeletebtnOpen] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [getError, setError] = useState([false, ""]);
  const initialValues = campaignRowTransform(state.row);
  // Data fetching
  const customers = useGetAll("customers");
  const domains = useGetAll("sending_domains");
  const landingPages = useGetAll("landing_pages");
  const templates = useGetAll("templates");
  // Form validation
  const validationSchema = yup.object({
    name: yup.string().required("Campaign Name is required"),
    admin_email: yup
      .string()
      .email("Invalid email")
      .required("Admin email is required"),
    operator_email: yup
      .string()
      .email("Invalid email")
      .required("Operator email is required"),
    target_emails_placeholder: yup
      .string()
      .required("Target email list is required"),
  });
  // Form configuration
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    validateOnMount: true,
    validateOnChange: true,
    onSubmit: (values) => {
      const dType = dataEntryType;
      const target_emails = values.target_emails_placeholder
        .toString()
        .split(/\r?\n/);
      const target_email_domains = values.target_email_domains_placeholder
        .toString()
        .split(", ");
      values.target_emails = target_emails;
      values.target_email_domains = target_email_domains;
      values.target_count = target_emails.length;
      values.customer_poc = values.customer_poc_placeholder
        ? JSON.parse(values.customer_poc_placeholder)
        : {};
      if (savebtnOpen) {
        values.start_datetime = "1970-01-01T00:00:00.000Z";
        values.end_datetime = "1970-01-01T00:00:00.000Z";
        values.time_zone = "";
        values.status = "incomplete";
      }
      setHasSubmitted(true);
      submitEntry("campaigns", values, values._id, dType, setError);
      setSavebtnOpen(false);
    },
  });

  /**
   * Sets the active step to a new value.
   *
   * @param {number} step - The new active step to set.
   */
  const setStep = (step) => {
    setActiveStep(step);
  };

  /**
   * Handles the "Next" button click by incrementing the active step by 1.
   */
  const handleNext = () => {
    setStep((prevActiveStep) => prevActiveStep + 1);
  };

  /**
   * Handles resetting the active step to the first step.
   */
  const handleReset = () => {
    setStep(0);
  };

  /**
   * Handles setting the active step to the specified step number.
   *
   * @param {number} step - The step number to set the active step to.
   */
  const handleStep = (step) => () => {
    setStep(step);
  };

  /**
   * Renders a "Back" button for the stepper.
   */
  const backButton = (
    <Button
      color="inherit"
      disabled={activeStep === 0}
      onClick={() => setStep((prevActiveStep) => prevActiveStep - 1)}
      sx={{ mr: 1 }}
    >
      Back
    </Button>
  );

  /**
   * Handles clicking the "Next" button on the first step by validating the form and
   * either incrementing the active step or displaying an error message.
   */
  const handleFirstNext = () => {
    formik.setTouched(initialFieldsToValidate);
    if (formik.isValid) {
      setStep((prevActiveStep) => prevActiveStep + 1);
      setInvalidAlert("");
    } else {
      setInvalidAlert(
        "Some fields are missing or incorrect. Please address them before continuing."
      );
    }
  };

  /**
   * Handles clicking the "Next" button on the third step by checking if the start time is
   * valid and either incrementing the active step or displaying an error message.
   */
  const handleThirdNext = () => {
    const now = new Date();
    const startVal = formik.values.start_datetime;
    const nullVal = "1970-01-01T00:00:00+00:00";
    const start = new Date(startVal);
    const end = new Date(formik.values.end_datetime);

    if (startVal != nullVal && start < now) {
      setInvalidAlert(
        "The Start time must happen after the current time. Please address this before continuing."
      );
    } else if (startVal != nullVal && start > end) {
      setInvalidAlert(
        "The Start time must happen before the End time. Please address this before continuing."
      );
    } else {
      setStep((prevActiveStep) => prevActiveStep + 1);
      setInvalidAlert("");
    }
  };

  /**
   * Closes the dialog and navigates to the campaigns page if there was no error.
   */
  const closeDialog = () => {
    setHasSubmitted(false);
    if (!getError[0]) {
      navigate("/cat-phishing/campaigns");
    }
  };

  // Determines whether the delete button should be disabled based on the data entry type.
  const disableDeleteBtn = dataEntryType == "new" ? true : false;

  /**
   * Deletes the campaign and closes the delete confirmation dialog.
   */
  const confirmDelete = () => {
    deleteEntry("campaigns", formik.values._id, setError);
    setTimeout(() => {
      setDeletebtnOpen(false);
      setHasSubmitted(true);
    });
  };

  // Renders a loading message if any of the necessary data is still loading.
  if (
    customers.isLoading ||
    domains.isLoading ||
    landingPages.isLoading ||
    templates.isLoading
  ) {
    return <MainCard title={"Campaign" + " Wizard"}>Loading...</MainCard>;
  }

  return (
    <MainCard title={"Campaign" + " Wizard"}>
      <Box sx={{ ml: 5, mr: 5, mt: 3, maxWidth: 1300 }}>
        <form id="campaign-form" onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Box sx={{ width: "100%" }}>
                <SimpleStepper
                  steps={steps}
                  activeStep={activeStep}
                  handleStep={handleStep}
                />
                {activeStep === steps.length ? (
                  <>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                      All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      <Box sx={{ flex: "1 1 auto" }} />
                      <Button onClick={handleReset}>Reset</Button>
                    </Box>
                  </>
                ) : activeStep == 0 ? (
                  <>
                    <CampaignInitialForm
                      formik={formik}
                      customers={customers}
                      domains={domains}
                      landingPages={landingPages}
                    />
                    {invalidAlert ? (
                      <Alert severity="error" sx={{ mt: 2 }}>
                        {invalidAlert}
                      </Alert>
                    ) : (
                      <></>
                    )}
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      {backButton}
                      <Box sx={{ flex: "1 1 auto" }} />
                      <Button onClick={handleFirstNext}>Next</Button>
                    </Box>
                  </>
                ) : activeStep == 1 ? (
                  <>
                    <CampaignTemplateForm
                      templates={templates}
                      formik={formik}
                    />
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      {backButton}
                      <Box sx={{ flex: "1 1 auto" }} />
                      <Button onClick={handleNext}>Next</Button>
                    </Box>
                  </>
                ) : activeStep == 2 ? (
                  <>
                    <CampaignDeliveryForm
                      formik={formik}
                      dataEntryType={dataEntryType}
                    />
                    {invalidAlert ? (
                      <Alert severity="error" sx={{ mt: 2 }}>
                        {invalidAlert}
                      </Alert>
                    ) : (
                      <></>
                    )}
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      {backButton}
                      <Box sx={{ flex: "1 1 auto" }} />
                      <Button onClick={handleThirdNext}>Next</Button>
                    </Box>
                  </>
                ) : (
                  <>
                    <CampaignReviewForm
                      formik={formik}
                      customers={customers}
                      domains={domains}
                      landingPages={landingPages}
                      templates={templates}
                    />
                    <ConfirmDialog
                      subtitle={
                        "Saving the campaign for later will remove the delivery schedule and mark the campaign's status as incomplete." +
                        " Do you wish to proceed?"
                      }
                      confirmType="Save"
                      formName="campaign-form"
                      isOpen={savebtnOpen}
                      setIsOpen={setSavebtnOpen}
                    />
                    <ConfirmDialog
                      subtitle={
                        <>
                          <b>{formik.values.name}</b> will be deleted in the
                          database.
                          <br />
                          <br />
                          <b>THIS ACTION CANNOT BE UNDONE.</b>
                        </>
                      }
                      confirmType="Delete"
                      handleClick={confirmDelete}
                      isOpen={deletebtnOpen}
                      setIsOpen={setDeletebtnOpen}
                    />
                    <ResultDialog
                      type={deletebtnOpen ? "Delete Campaign" : dataEntryType}
                      hasSubmitted={hasSubmitted}
                      error={getError}
                      closeDialog={closeDialog}
                    />
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      {backButton}
                      <Box sx={{ flex: "1 1 auto" }} />
                      <Button
                        variant="outlined"
                        color="error"
                        disabled={disableDeleteBtn}
                        onClick={() => setDeletebtnOpen(true)}
                      >
                        Delete Campaign
                      </Button>
                      <Box sx={{ ml: 3 }} />
                      <Button
                        variant="outlined"
                        onClick={() => setSavebtnOpen(true)}
                      >
                        Save for Later
                      </Button>
                      <Box sx={{ ml: 3 }} />
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        endIcon={<SendIcon />}
                      >
                        Send Campaign
                      </Button>
                    </Box>
                  </>
                )}
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </MainCard>
  );
};

export default CampaignDataEntryPage;

import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// material-ui
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import SendIcon from "@mui/icons-material/Send";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";

// project imports
import ConfirmDialog from "ui-component/popups/ConfirmDialog";
import CampaignDeliveryForm from "ui-component/forms/CampaignDeliveryForm";
import CampaignInitialForm from "ui-component/forms/CampaignInitialForm";
import CampaignReviewForm from "ui-component/forms/CampaignReviewForm";
import CampaignTemplateForm from "ui-component/forms/CampaignTemplateForm";
import MainCard from "ui-component/cards/MainCard";
import { useGetAll, submitEntry } from "services/api.js";

//third party
import { useFormik } from "formik";
import * as yup from "yup";
import ResultDialog from "ui-component/popups/ResultDialog";

// ==============================|| Create/Update Campaign View ||============================== //

const camRowsTransform = (campaignRows) => {
  if (!campaignRows.hasOwnProperty("name")) {
    campaignRows.name = "";
  }
  if (!campaignRows.hasOwnProperty("archived")) {
    campaignRows.archived = "";
  }
  if (!campaignRows.hasOwnProperty("description")) {
    campaignRows.description = "";
  }
  if (!campaignRows.hasOwnProperty("status")) {
    campaignRows.status = false;
  }
  if (!campaignRows.hasOwnProperty("admin_email")) {
    campaignRows.admin_email = "";
  }
  if (!campaignRows.hasOwnProperty("operator_email")) {
    campaignRows.operator_email = "";
  }
  if (!campaignRows.hasOwnProperty("sending_domain_id")) {
    campaignRows.sending_domain_id = "";
  }
  if (!campaignRows.hasOwnProperty("landing_page_id")) {
    campaignRows.landing_page_id = "";
  }
  if (!campaignRows.hasOwnProperty("landing_page_url")) {
    campaignRows.landing_page_url = "";
  }
  if (!campaignRows.hasOwnProperty("customer_id")) {
    campaignRows.customer_id = "";
  }
  if (!campaignRows.hasOwnProperty("customer_poc")) {
    campaignRows.customer_poc = "";
  }
  if (!campaignRows.hasOwnProperty("target_emails")) {
    campaignRows.target_emails = [];
    campaignRows.target_emails_placeholder = "";
  } else if (Array.isArray(campaignRows.target_emails)) {
    campaignRows.target_emails_placeholder =
      campaignRows["target_emails"].join("\r\n");
  }
  if (!campaignRows.hasOwnProperty("target_email_domains")) {
    campaignRows.target_email_domains = [];
    campaignRows.target_email_domains_placeholder = "";
  } else if (Array.isArray(campaignRows.target_email_domains)) {
    campaignRows.target_email_domains_placeholder =
      campaignRows["target_email_domains"].join(", ");
  }
  if (!campaignRows.hasOwnProperty("target_count")) {
    campaignRows.target_count = "";
  }
  if (!campaignRows.hasOwnProperty("target_template_uuid")) {
    campaignRows.target_template_uuid = "";
  }
  if (!campaignRows.hasOwnProperty("start_datetime")) {
    campaignRows.start_datetime = "";
  }
  if (!campaignRows.hasOwnProperty("end_datetime")) {
    campaignRows.end_datetime = "";
  }
  if (!campaignRows.hasOwnProperty("time_zone")) {
    campaignRows.time_zone = "";
  }
  return campaignRows;
};

const steps = [
  "Initial Setup & Target Selection",
  "Select Phishing Template",
  "Set Delivery Schedule",
  "Review & Send",
];

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
});

const initialFieldsToValidate = {
  name: true,
  admin_email: true,
  operator_email: true,
};

const CampaignDataEntryPage = () => {
  let navigate = useNavigate();
  const { state } = useLocation();
  const campaignValues = camRowsTransform(state.row);
  const dataEntryType = state.dataEntryType;
  const [activeStep, setActiveStep] = useState(0);
  const [invalidAert, setInvalidAlert] = useState(false);
  const [savebtnOpen, setSavebtnOpen] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [getError, setError] = useState([false, ""]);
  const customers = useGetAll("customers");
  const domains = useGetAll("sending_domains");
  const landingPages = useGetAll("landing_pages");
  const templates = useGetAll("templates");
  const formik = useFormik({
    initialValues: campaignValues,
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
      if (!values.customer_id) {
        values.customer_poc = "";
      }
      if (savebtnOpen) {
        values.start_datetime = "1970-01-01T00:00:00.000Z";
        values.end_datetime = "1970-01-01T00:00:00.000Z";
        values.time_zone = "";
        values.status = "incomplete";
      }
      setHasSubmitted(true);
      submitEntry("campaigns", values, values._id, dType, setError);
      setTimeout(() => {
        setSavebtnOpen(false);
      });
    },
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleReset = () => {
    setActiveStep(0);
  };
  const handleStep = (step) => () => {
    setActiveStep(step);
  };
  const backButton = (
    <Button
      color="inherit"
      disabled={activeStep === 0}
      onClick={() => setActiveStep((prevActiveStep) => prevActiveStep - 1)}
      sx={{ mr: 1 }}
    >
      Back
    </Button>
  );
  const invalidAlertJSX = (
    <>
      {invalidAert ? (
        <Alert severity="error" sx={{ mt: 2 }}>
          Some fields are incomplete or incorrect. Please address them before
          continuing.
        </Alert>
      ) : (
        <></>
      )}
    </>
  );
  const handleFirstNext = () => {
    formik.setTouched(initialFieldsToValidate);
    if (formik.isValid) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setInvalidAlert(false);
    } else {
      setInvalidAlert(true);
    }
  };
  const closeDialog = () => {
    setHasSubmitted(false);
    if (!getError[0]) {
      navigate("/cat-phishing/campaigns");
    }
  };
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
                <Stepper
                  activeStep={activeStep}
                  sx={{ mb: 5, fontWeight: "bold" }}
                  alternativeLabel
                >
                  {steps.map((label, index) => {
                    return (
                      <Step key={label}>
                        <StepButton color="inherit" onClick={handleStep(index)}>
                          {label}
                        </StepButton>
                      </Step>
                    );
                  })}
                </Stepper>
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
                    {invalidAlertJSX}
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
                    {/* <CampaignDeliveryForm /> */}
                    {invalidAlertJSX}
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      {backButton}
                      <Box sx={{ flex: "1 1 auto" }} />
                      <Button onClick={handleNext}>Next</Button>
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
                    <ResultDialog
                      type={dataEntryType}
                      hasSubmitted={hasSubmitted}
                      error={getError}
                      closeDialog={closeDialog}
                    />
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      {backButton}
                      <Box sx={{ flex: "1 1 auto" }} />
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

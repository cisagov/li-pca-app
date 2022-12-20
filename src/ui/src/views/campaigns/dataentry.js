import { useState } from "react";
import { useLocation } from "react-router-dom";

// material-ui
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";

// project imports
import CampaignDeliveryForm from "ui-component/forms/CampaignDeliveryForm";
import CampaignInitialForm from "ui-component/forms/CampaignInitialForm";
import CampaignReviewForm from "ui-component/forms/CampaignReviewForm";
import CampaignTemplateForm from "ui-component/forms/CampaignTemplateForm";
import MainCard from "ui-component/cards/MainCard";

//third party
import { useFormik } from "formik";
import * as yup from "yup";

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
  }
  if (!campaignRows.hasOwnProperty("target_email_domains")) {
    campaignRows.target_email_domains = [];
  }
  if (!campaignRows.hasOwnProperty("target_count")) {
    campaignRows.target_count = "";
  }
  if (!campaignRows.hasOwnProperty("target_template_uuid")) {
    campaignRows.target_template_uuid = [];
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
  const { state } = useLocation();
  const campaignValues = camRowsTransform(state.row);
  const [activeStep, setActiveStep] = useState(0);
  const [invalidAert, setInvalidAlert] = useState(false);
  const formik = useFormik({
    initialValues: campaignValues,
    validationSchema: validationSchema,
    validateOnMount: true,
    validateOnChange: true,
    onSubmit: (values) => {
      values.target_emails = values.target_emails.split("\n");
      values.target_email_domains = values.target_email_domains.split(",");
      console.log(values);
    },
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
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
  const [value, setValue] = useState(0);
  const handleInitialNext = (event, newValue) => {
    formik.setTouched(initialFieldsToValidate);
    if (formik.isValid) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setValue(newValue);
      setInvalidAlert(false);
    } else {
      setInvalidAlert(true);
    }
  };

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
                    <CampaignInitialForm formik={formik} />
                    {invalidAlertJSX}
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      {backButton}
                      <Box sx={{ flex: "1 1 auto" }} />
                      <Button onClick={handleInitialNext}>Next</Button>
                    </Box>
                  </>
                ) : activeStep == 1 ? (
                  <>
                    <CampaignTemplateForm />
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      {backButton}
                      <Box sx={{ flex: "1 1 auto" }} />
                      <Button onClick={handleNext}>Next</Button>
                    </Box>
                  </>
                ) : activeStep == 2 ? (
                  <>
                    <CampaignDeliveryForm />
                    {invalidAlertJSX}
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      {backButton}
                      <Box sx={{ flex: "1 1 auto" }} />
                      <Button onClick={handleNext}>Next</Button>
                    </Box>
                  </>
                ) : (
                  <>
                    <CampaignReviewForm />
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      {backButton}
                      <Box sx={{ flex: "1 1 auto" }} />
                      <Button onClick={handleNext}>Send Campaign</Button>
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

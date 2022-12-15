import { useState } from "react";
import { useLocation } from "react-router-dom";

// material-ui
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import MainCard from "ui-component/cards/MainCard";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";

// project imports
import CampaignDeliveryForm from "ui-component/forms/CampaignDeliveryForm";
import CampaignInitialForm from "ui-component/forms/CampaignInitialForm";
import CampaignReviewForm from "ui-component/forms/CampaignReviewForm";
import CampaignTemplateForm from "ui-component/forms/CampaignTemplateForm";

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
    campaignRows.fed_admin = "";
  }
  if (!campaignRows.hasOwnProperty("operator_email")) {
    campaignRows.operator = "";
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
    campaignRows.operator = {};
  }
  if (!campaignRows.hasOwnProperty("target_emails")) {
    campaignRows.target_emails = [];
  }
  if (!campaignRows.hasOwnProperty("target_email_domains")) {
    campaignRows.target_emails = [];
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

const CampaignDataEntryPage = () => {
  const { state } = useLocation();
  const campaignValues = camRowsTransform(state.row);
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  const formik = useFormik({
    initialValues: campaignValues,
    validationSchema: validationSchema,
    validateOnMount: true,
    validateOnChange: true,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };
  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
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
  const stepButtons = (
    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
      <Button
        color="inherit"
        disabled={activeStep === 0}
        onClick={handleBack}
        sx={{ mr: 1 }}
      >
        Back
      </Button>
      <Box sx={{ flex: "1 1 auto" }} />
      <Button onClick={handleNext}>
        {activeStep === steps.length - 1 ? "Send Campaign" : "Next"}
      </Button>
    </Box>
  );
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
                    const stepProps = {};
                    if (isStepSkipped(index)) {
                      stepProps.completed = false;
                    }
                    return (
                      <Step key={label} {...stepProps}>
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
                    {stepButtons}
                  </>
                ) : activeStep == 1 ? (
                  <>
                    <CampaignTemplateForm />
                    {stepButtons}
                  </>
                ) : activeStep == 2 ? (
                  <>
                    <CampaignDeliveryForm />
                    {stepButtons}
                  </>
                ) : (
                  <>
                    <CampaignReviewForm />
                    {stepButtons}
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

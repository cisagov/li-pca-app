import { useState } from "react";

// material-ui
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";

// project imports
import CampaignInitialForm from "ui-component/forms/CampaignInitialForm";
import CampaignTemplateForm from "ui-component/forms/CampaignTemplateForm";
import MainCard from "ui-component/cards/MainCard";

// ==============================|| Create/Update Campaign View ||============================== //

const steps = [
  "Initial Setup & Target Selection",
  "Select Phishing Template",
  "Set Delivery Schedule",
  "Review & Send",
];

const CampaignDataEntryPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

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
        {activeStep === steps.length - 1 ? "Finish" : "Next"}
      </Button>
    </Box>
  );
  return (
    <MainCard title={"New Campaign" + " Wizard"}>
      <Box sx={{ ml: 5, mr: 5, mt: 3, maxWidth: 1300 }}>
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
                  <CampaignInitialForm />
                  {stepButtons}
                </>
              ) : activeStep == 1 ? (
                <>
                  <CampaignTemplateForm />
                  {stepButtons}
                </>
              ) : activeStep == 2 ? (
                <>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    Step {activeStep + 1}
                  </Typography>
                  {stepButtons}
                </>
              ) : (
                <>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    Step {activeStep + 1}
                  </Typography>
                  {stepButtons}
                </>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </MainCard>
  );
};

export default CampaignDataEntryPage;

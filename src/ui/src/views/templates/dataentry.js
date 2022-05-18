import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

// material-ui
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { DataGrid } from "@mui/x-data-grid";
import Divider from "@mui/material/Divider";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Grid from "@mui/material/Grid";
import MainCard from "ui-component/cards/MainCard";
import RuleIcon from "@mui/icons-material/Rule";
import SettingsIcon from "@mui/icons-material/Settings";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import WebIcon from "@mui/icons-material/Web";

//project imports
import TemplateAttrForm from "ui-component/forms/TemplateAttributeForm";
import TemplateTestingForm from "ui-component/forms/TemplateTestingForm";

const temRowsTransform = (templateRows) => {
  if (!templateRows.hasOwnProperty("name")) {
    templateRows.name = "";
  }
  if (!templateRows.hasOwnProperty("from_address")) {
    templateRows.from_address = "";
  }
  if (!templateRows.hasOwnProperty("landing_page")) {
    templateRows.landing_page_id = "";
  }
  if (!templateRows.hasOwnProperty("sending_profile_id")) {
    templateRows.sending_profile_id = "";
  }
  if (!templateRows.hasOwnProperty("deception_score")) {
    templateRows.deception_score = 0;
  }
  if (!templateRows.hasOwnProperty("retired")) {
    templateRows.retired = false;
  }
  if (!templateRows.hasOwnProperty("retired_description")) {
    templateRows.retired_description = "";
  }
  if (!templateRows.hasOwnProperty("sophisticated")) {
    templateRows.sophisticated = "";
  }
  if (!templateRows.hasOwnProperty("red_flag")) {
    templateRows.red_flag = "";
  }
  if (!templateRows.hasOwnProperty("subject")) {
    templateRows.subject = "";
  }
  if (!templateRows.hasOwnProperty("text")) {
    templateRows.text = "";
  }
  if (!templateRows.hasOwnProperty("html")) {
    templateRows.html = "";
  }
  if (!templateRows.hasOwnProperty("indicators")) {
    templateRows.indicators = [];
  }
  if (!templateRows.hasOwnProperty("campaigns")) {
    templateRows.campaigns = [];
  }
  if (!templateRows.hasOwnProperty("recommendation_type")) {
    templateRows.recommendation_type = "";
  }
  return templateRows;
};

const campaignColumns = [
  { field: "id", hide: true },
  { field: "name", headerName: "Campaign Name", flex: 4 },
  { field: "status", headerName: "Status", flex: 4 },
];

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const getOtherIdentifiers = (templateData, templateValues) => {
  const identifierArr = templateData.map(({ identifier }) => identifier);
  return identifierArr.filter((identifier) => {
    if (identifier != templateValues.identifier) {
      return identifier;
    }
  });
};

const temNewOrEdit = (dataEntryType) => {
  if (dataEntryType == "new") {
    return "New Template";
  }
  return "Edit Template";
};

const TemplateDataEntryPage = () => {
  const { state } = useLocation();
  let navigate = useNavigate();
  let mainCardTitle = temNewOrEdit(state.dataEntryType);
  let templateValues = temRowsTransform(state.row);
  const [value, setValue] = React.useState(0);
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };
  const [templateData, setTemplateData] = React.useState(templateValues);
  const [hasSubmitted, setHasSubmitted] = React.useState(false);

  const steps = [
    "HTML View",
    "Template Attributes",
    "Campaigns",
    "Template Testing",
  ];

  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const stepIcons = [
    <WebIcon color={activeStep == 0 ? "dark" : "primary"} />,
    <SettingsIcon color={activeStep == 1 ? "dark" : "primary"} />,
    <EmailOutlinedIcon color={activeStep == 2 ? "dark" : "primary"} />,
    <RuleIcon color={activeStep == 3 ? "dark" : "primary"} />,
  ];

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It"s the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const stepContent = () => {
    if (activeStep == 0) {
      return (
        <Typography>
          Step 1. This will be where the editor will be displayed.
        </Typography>
      );
    } else if (activeStep == 1) {
      return (
        <TemplateAttrForm
          initialTemplateValues={templateValues}
          setTemplateData={setTemplateData}
          templateData={templateData}
          setHasSubmitted={setHasSubmitted}
          identifiers={getOtherIdentifiers(state.rows, templateValues)}
        />
      );
    } else if (activeStep == 2) {
      if (templateValues.campaigns.length === 0) {
        return (
          <Typography>
            No campaigns are currently using this template.
          </Typography>
        );
      }
      return (
        <DataGrid
          autoHeight
          pageSize={5}
          rowsPerPageOptions={[5]}
          rows={templateValues.campaigns}
          columns={campaignColumns}
          density="compact"
          onSelectionModelChange={(id) => {
            const item = templateValues.campaigns.find(
              (row) => row.id === id[0]
            );
            console.log(item);
            // TODO: Navigate to campaign page
          }}
        />
      );
    } else {
      return (
        <TemplateTestingForm
          initialTemplateValues={templateValues}
          setTemplateData={setTemplateData}
          templateData={templateData}
          setHasSubmitted={setHasSubmitted}
          identifiers={getOtherIdentifiers(state.rows, templateValues)}
        />
      );
    }
  };
  return (
    <MainCard title={mainCardTitle}>
      <Box>
        <Grid container spacing={3}>
          {mainCardTitle == "New Template" ? (
            <React.Fragment />
          ) : (
            <React.Fragment>
              <Grid item xs={6} sm={5} md={4} lg={3} xl={3}>
                <Button
                  color="warning"
                  size="medium"
                  variant="contained"
                  fullWidth
                  startIcon={<ArrowBackIosIcon />}
                >
                  Previous Template
                </Button>
              </Grid>
              <Grid
                item
                display={{ xs: "none", sm: "block" }}
                sm={2}
                md={4}
                lg={6}
                xl={6}
              />
              <Grid item xs={6} sm={5} md={4} lg={3} xl={3}>
                <Button
                  color="warning"
                  size="medium"
                  variant="contained"
                  fullWidth
                  endIcon={<ArrowForwardIosIcon />}
                >
                  Next Template
                </Button>
              </Grid>
              <Grid item xs={12} xl={12} sx={{ mt: 2 }} />
            </React.Fragment>
          )}
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8} sx={{ mr: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={8} md={8} lg={7} xl={7}>
                <TextField fullWidth label="Template Name" size="small" />
              </Grid>
              <Grid item xs={12} sm={4} md={4} lg={4} xl={3}>
                <Button size="medium" variant="contained" fullWidth>
                  Import Email
                </Button>
              </Grid>
              <Grid item display={{ xs: "none", xl: "block" }} xl={2} />
            </Grid>
            <Grid container>
              <Grid item xs={12} md={12} xl={12} sx={{ mt: 7 }}>
                <Box sx={{ width: "100%" }}>
                  <Stepper nonLinear activeStep={activeStep} alternativeLabel>
                    {steps.map((label, index) => (
                      <Step key={label} completed={completed[index]}>
                        <StepButton
                          onClick={handleStep(index)}
                          icon={
                            completed[index] ? (
                              <CheckCircleIcon color="primary" />
                            ) : (
                              stepIcons[index]
                            )
                          }
                        >
                          {label}
                        </StepButton>
                      </Step>
                    ))}
                  </Stepper>
                  <div>
                    {allStepsCompleted() ? (
                      <React.Fragment>
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          sx={{ mt: 8, mb: 7 }}
                        >
                          <Typography>
                            All steps completed - you&apos;re finished
                          </Typography>
                        </Box>
                        <Box
                          sx={{ display: "flex", flexDirection: "row", pt: 2 }}
                        >
                          <Box sx={{ flex: "1 1 auto" }} />
                          <Button onClick={handleReset}>Reset</Button>
                        </Box>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          sx={{ mt: 8 }}
                        >
                          {stepContent()}
                        </Box>
                        <Box sx={{ mb: 7 }} />
                        <Box
                          sx={{ display: "flex", flexDirection: "row", pt: 2 }}
                        >
                          <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                          >
                            Back
                          </Button>
                          <Box sx={{ flex: "1 1 auto" }} />
                          <Button onClick={handleNext} sx={{ mr: 1 }}>
                            Next
                          </Button>
                          {activeStep !== steps.length &&
                            (completed[activeStep] ? (
                              <Typography
                                variant="caption"
                                sx={{ display: "inline-block" }}
                              >
                                Step {activeStep + 1} already completed
                              </Typography>
                            ) : (
                              <Button
                                onClick={handleComplete}
                                variant="contained"
                                color="primary"
                              >
                                {completedSteps() === totalSteps() - 1
                                  ? "Finish"
                                  : "Save Step"}
                              </Button>
                            ))}
                        </Box>
                      </React.Fragment>
                    )}
                  </div>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            style={{ marginRight: "-1px" }}
          />
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
            <Typography
              variant="h3"
              gutterBottom
              component="div"
              color="primary"
            >
              Deception Calculator
            </Typography>
            This is where the Deception Calculator will go.
          </Grid>
        </Grid>
      </Box>
    </MainCard>
  );
};

export default TemplateDataEntryPage;

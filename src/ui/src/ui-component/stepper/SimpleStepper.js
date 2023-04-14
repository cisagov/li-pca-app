import PropTypes from "prop-types";

// material-ui
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Stepper from "@mui/material/Stepper";

// ==============================|| Stepper ||============================== //

const SimpleStepper = ({ steps, activeStep, handleStep }) => {
  return (
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
  );
};

SimpleStepper.propTypes = {
  steps: PropTypes.array,
  activeStep: PropTypes.number,
  handleStep: PropTypes.func,
};

export default SimpleStepper;

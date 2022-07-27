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

// project imports
import LandingPageForm from "ui-component/forms/LandingPageForm";

const lpRowsTransform = (landingpageRows) => {
  if (!landingpageRows.hasOwnProperty("name")) {
    landingpageRows.name = "";
  }
  if (!landingpageRows.hasOwnProperty("created_by")) {
    landingpageRows.created_by = "";
  }
  if (!landingpageRows.hasOwnProperty("default_landing_page")) {
    landingpageRows.default_landing_page = false;
  }
  return landingpageRows;
};

const newOrEdit = (dataEntryType) => {
  if (dataEntryType == "new") {
    return "New Landing Page";
  }
  return "Edit Landing Page";
};

const LPDataEntryPage = () => {
  const { state } = useLocation();
  let lpValues = lpRowsTransform(state.row);

  let mainCardTitle = newOrEdit(state.dataEntryType);

  return (
    <MainCard title={mainCardTitle}>
      <Box sx={{ ml: 5, mr: 5, mt: 3, maxWidth: 1000, minWidth: 350 }}>
        <Grid container spacing={2}>
          <LandingPageForm
            initialValues={lpValues}
            dataEntryType={mainCardTitle}
          />
        </Grid>
      </Box>
    </MainCard>
  );
};

export default LPDataEntryPage;

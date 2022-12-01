import { useState } from "react";
import { useLocation } from "react-router-dom";

// material-ui
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// project imports
import CampaignInitialForm from "ui-component/forms/CampaignInitialForm";
import CampaignTemplateForm from "ui-component/forms/CampaignTemplateForm";
import MainCard from "ui-component/cards/MainCard";

// ==============================|| Create/Update Campaign View ||============================== //

const CampaignDataEntryPage = () => {
  return (
    <MainCard title={"New Campaign" + " Wizard"}>
      <Box sx={{ ml: 5, mr: 5, mt: 3, maxWidth: 1000 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            Insert stepper here
          </Grid>
        </Grid>
      </Box>
    </MainCard>
  );
};

export default CampaignDataEntryPage;

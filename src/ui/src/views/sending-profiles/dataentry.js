import React from "react";
import { useLocation } from "react-router-dom";

// material-ui
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// project imports
import DisplayDataTable from "ui-component/tables/DisplayDataTable";
import MainCard from "ui-component/cards/MainCard";
import SendingProfileForm from "ui-component/forms/SendingProfileForm";

// ==============================|| Create/Update Customer View ||============================== //

const spRowsTransform = (domainRows) => {
  if (!domainRows.hasOwnProperty("name")) {
    domainRows.name = "";
  }
  if (!domainRows.hasOwnProperty("landing_page_domain")) {
    domainRows.landing_page_domain = "";
  }
  if (!domainRows.hasOwnProperty("from")) {
    domainRows.from = "";
  }
  if (!domainRows.hasOwnProperty("_of_customers_using")) {
    domainRows._of_customers_using = "";
  }
  if (!domainRows.hasOwnProperty("customer_type")) {
    domainRows.customer_type = "";
  }
  if (!domainRows.hasOwnProperty("last_modified_date")) {
    domainRows.last_modified_date = "";
  }
  if (!domainRows.hasOwnProperty("sending_ips")) {
    domainRows.sending_ips = "";
  }
  if (!domainRows.hasOwnProperty("interface_type")) {
    domainRows.interface_type = "SMTP";
  }
  if (!domainRows.hasOwnProperty("mailgun_api_key")) {
    domainRows.mailgun_api_key = "";
  }
  if (!domainRows.hasOwnProperty("mailgun_domain")) {
    domainRows.mailgun_domain = "";
  }
  if (!domainRows.hasOwnProperty("smtp_host")) {
    domainRows.smtp_host = "";
  }
  if (!domainRows.hasOwnProperty("smtp_username")) {
    domainRows.smtp_username = "";
  }
  if (!domainRows.hasOwnProperty("smtp_password")) {
    domainRows.smtp_password = "";
  }
  if (!domainRows.hasOwnProperty("email_headers")) {
    domainRows.email_headers = [];
  }
  return domainRows;
};

const newOrEdit = (dataEntryType) => {
  if (dataEntryType == "new") {
    return "New Sending Profile";
  }
  return "Edit Sending Profile";
};

const getOtherIdentifiers = (domainData, spValues) => {
  const identifierArr = domainData.map(({ identifier }) => identifier);
  return identifierArr.filter((identifier) => {
    if (identifier != spValues.identifier) {
      return identifier;
    }
  });
};

const SPDataEntryPage = () => {
  const { state } = useLocation();
  let spValues = spRowsTransform(state.row);
  console.log(state);
  let mainCardTitle = newOrEdit(state.dataEntryType);

  return (
    <MainCard title={mainCardTitle}>
      <Box sx={{ ml: 5, mr: 5, mt: 3, maxWidth: 1000 }}>
        <Grid container spacing={2}>
          <SendingProfileForm initialValues={spValues} />
        </Grid>
      </Box>
    </MainCard>
  );
};

export default SPDataEntryPage;

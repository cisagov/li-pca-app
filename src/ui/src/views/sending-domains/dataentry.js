import { useState } from "react";
import { useLocation } from "react-router-dom";

// material-ui
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

// project imports
import MainCard from "ui-component/cards/MainCard";
import SendingDomainForm from "ui-component/forms/SendingDomainForm";

// ==============================|| Create/Update Customer View ||============================== //

const sdRowsTransform = (domainRows) => {
  if (!domainRows.hasOwnProperty("name")) {
    domainRows.name = "";
  }
  if (!domainRows.hasOwnProperty("landing_page_domain")) {
    domainRows.landing_page_domain = "";
  }
  if (!domainRows.hasOwnProperty("from_address")) {
    domainRows.from_address = "";
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
  if (!domainRows.hasOwnProperty("headers")) {
    domainRows.headers = [];
  }
  return domainRows;
};

const newOrEdit = (dataEntryType) => {
  if (dataEntryType == "new") {
    return "New Sending Domain";
  }
  return "Edit Sending Domain";
};

const SDDataEntryPage = () => {
  const { state } = useLocation();
  let sdValues = sdRowsTransform(state.row);
  let mainCardTitle = newOrEdit(state.dataEntryType);
  const [sdData, setSdData] = useState(sdValues);

  return (
    <MainCard title={mainCardTitle}>
      <Box sx={{ ml: 5, mr: 5, mt: 3, maxWidth: 1000 }}>
        <Grid container spacing={2}>
          <SendingDomainForm
            setSdData={setSdData}
            sdData={sdData}
            initialValues={sdValues}
            dataEntryType={mainCardTitle}
          />
        </Grid>
      </Box>
    </MainCard>
  );
};

export default SDDataEntryPage;

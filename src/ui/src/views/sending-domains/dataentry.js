import { useState } from "react";
import { useLocation } from "react-router-dom";

// material-ui
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

// project imports
import MainCard from "ui-component/cards/MainCard";
import SendingDomainForm from "ui-component/forms/SendingDomainForm";

// ==============================|| Create/Update Customer View ||============================== //

/**
 * Transforms a row object to include default values for any missing properties.
 * @param {Object} domainRows - The row object to transform.
 * @returns {Object} The transformed row object.
 */
const sdRowTransform = (domainRows) => {
  const defaultValues = {
    name: "",
    landing_page_domain: "",
    from_address: "",
    _of_customers_using: "",
    customer_type: "",
    last_modified_date: "",
    sending_ips: "",
    interface_type: "SMTP",
    mailgun_api_key: "",
    mailgun_domain: "",
    smtp_host: "",
    smtp_username: "",
    smtp_password: "",
    headers: [],
  };

  return {
    ...defaultValues,
    ...domainRows,
  };
};

/**
 * A helper function to determine whether to display a "New Sending Domain" or "Edit Sending Domain" header.
 *
 * @param {String} dataEntryType The type of data entry being performed, either "new" or "edit".
 * @returns {String} The header to display.
 */
const newOrEdit = (dataEntryType) => {
  return dataEntryType === "new" ? "New Sending Domain" : "Edit Sending Domain";
};

/**
 * The component that renders the data entry page for sending domains.
 *
 * @returns {JSX.Element} The SDDataEntryPage component.
 */
const SDDataEntryPage = () => {
  const { state } = useLocation();
  const sdValues = sdRowTransform(state.row);
  const mainCardTitle = newOrEdit(state.dataEntryType);
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

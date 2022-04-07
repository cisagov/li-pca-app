import React from "react";
import { useLocation } from "react-router-dom";

// material-ui
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// project imports
import CustomerForm from "ui-component/forms/CustomerForm";
import CustomerPOCForm from "ui-component/forms/CustomerPOCForm";
import MainCard from "ui-component/cards/MainCard";

// ==============================|| Create/Update Customer View ||============================== //

let custPOCValues = {
  id: 0,
  email: "",
  first_name: "",
  last_name: "",
  mobile_phone: "",
  notes: "",
  office_phone: "",
  title: "",
};
let custFilledPOCValues = {};
const custRowsTransform = (custRows) => {
  if (!custRows.hasOwnProperty("name")) {
    custRows.name = "";
  }
  if (!custRows.hasOwnProperty("identifier")) {
    custRows.identifier = "";
  }
  if (!custRows.hasOwnProperty("domain")) {
    custRows.domain = "";
  }
  if (!custRows.hasOwnProperty("appendixADate")) {
    custRows.appendixADate = Date.now();
  }
  if (!custRows.hasOwnProperty("customer_type")) {
    custRows.customer_type = "";
  }
  if (!custRows.hasOwnProperty("address_1")) {
    custRows.address_1 = "";
  }
  if (!custRows.hasOwnProperty("address_2")) {
    custRows.address_2 = "";
  }
  if (!custRows.hasOwnProperty("city")) {
    custRows.city = "";
  }
  if (!custRows.hasOwnProperty("state")) {
    custRows.state = "";
  }
  if (!custRows.hasOwnProperty("zip_code")) {
    custRows.zip_code = "";
  }
  if (!custRows.hasOwnProperty("contact_list")) {
    custRows.contact_list = [];
  }
  return custRows;
};

const custNewOrEdit = (dataEntryType) => {
  if (dataEntryType == "new") {
    return ["New Customer", false];
  }
  return ["Edit Customer", true];
};

const CustDataEntryPage = () => {
  const { state } = useLocation();
  let custValues = custRowsTransform(state.row);
  let [mainCardTitle, hasContactBool] = custNewOrEdit(state.dataEntryType);

  const [hasContact, setHasContact] = React.useState(hasContactBool);
  const [custData, setCustData] = React.useState(custValues);
  const [contactUpdate, setContactUpdate] = React.useState(false);
  const [hasSubmitted, setHasSubmitted] = React.useState(false);

  if (hasSubmitted) {
    // TODO: Add Axios functions to POST or PUT data
    console.log(custData);
  }
  return (
    <MainCard title={mainCardTitle}>
      <Box sx={{ ml: 5, mr: 5, mt: 3, maxWidth: 1000 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography variant="h4" gutterBottom component="div">
              Customer Information
            </Typography>
          </Grid>
          <CustomerForm
            initialCustValues={custValues}
            setCustData={setCustData}
            custData={custData}
            hasContact={hasContact}
            contactUpdate={contactUpdate}
            setHasSubmitted={setHasSubmitted}
          >
            <Grid item xs={10} sm={12} md={12} lg={12} xl={12} sx={{ mb: 2 }}>
              <Typography variant="h4" gutterBottom component="div">
                Customer/Organization Point of Contacts
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ mb: 1 }}>
              <CustomerPOCForm
                initialPOCValues={custPOCValues}
                custFilledPOCValues={custFilledPOCValues}
                setCustData={setCustData}
                custPOCData={custData.contact_list}
                custData={custData}
                hasContact={hasContact}
                setHasContact={setHasContact}
                contactUpdate={contactUpdate}
                setContactUpdate={setContactUpdate}
              />
            </Grid>
          </CustomerForm>
        </Grid>
      </Box>
    </MainCard>
  );
};

export default CustDataEntryPage;

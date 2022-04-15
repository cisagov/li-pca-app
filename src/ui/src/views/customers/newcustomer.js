import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

// material-ui
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// project imports
import CustomerForm from "ui-component/forms/CustomerForm";
import CustomerPOCForm from "ui-component/forms/CustomerPOCForm";
import MainCard from "ui-component/cards/MainCard";

// third party
import axios from "axios";

// assets
import { IconCircleCheck, IconCircleX } from "@tabler/icons";

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
  let navigate = useNavigate();
  let custValues = custRowsTransform(state.row);
  let [mainCardTitle, hasContactBool] = custNewOrEdit(state.dataEntryType);

  const [hasContact, setHasContact] = React.useState(hasContactBool);
  const [custData, setCustData] = React.useState(custValues);
  const [contactUpdate, setContactUpdate] = React.useState(false);
  const [hasSubmitted, setHasSubmitted] = React.useState(false);
  const [getError, setError] = React.useState([false, ""]);
  const baseURL = "http://localhost:8080/li-pca/v1/customers";

  React.useEffect(() => {
    if (hasSubmitted && mainCardTitle == "New Customer") {
      axios
        .post(baseURL, custData, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((response) => {
          console.log(response);
          setError([false, ""]);
        })
        .catch((error) => {
          setError([true, error.message]);
          console.log("Error fetching data");
          console.log(error);
        });
    }
  }, [custData, hasSubmitted, mainCardTitle]);
  const closeDialog = () => {
    setHasSubmitted(false);
    if (!getError[0]) {
      navigate("/li-pca-app/customers");
    }
  };

  return (
    <MainCard title={mainCardTitle}>
      <Box sx={{ ml: 5, mr: 5, mt: 3, maxWidth: 1000 }}>
        <Grid container spacing={2}>
          {getError[0] ? (
            <Dialog open={hasSubmitted}>
              <Grid sx={{ textAlign: "center" }}>
                <DialogTitle>
                  <Grid item>
                    <IconCircleX color="#E62C22" size={100} stroke={1} />
                  </Grid>
                  <Grid item>{getError[1]}</Grid>
                </DialogTitle>
                <DialogContent>
                  <Grid item>
                    <DialogContentText>
                      {mainCardTitle} changes are unable to be saved.
                      <br />
                      Check the console log for more details.
                    </DialogContentText>
                  </Grid>
                  <Grid item sx={{ mt: 3, mb: 1 }}>
                    <Button
                      onClick={closeDialog}
                      size="large"
                      variant="contained"
                    >
                      Ok
                    </Button>
                  </Grid>
                </DialogContent>
              </Grid>
            </Dialog>
          ) : (
            <Dialog open={hasSubmitted}>
              <Grid sx={{ textAlign: "center" }}>
                <DialogTitle>
                  <Grid item>
                    <IconCircleCheck color="#00b341" size={100} stroke={1} />
                  </Grid>
                  <Grid item>Successful save</Grid>
                </DialogTitle>
                <DialogContent>
                  <Grid item>
                    <DialogContentText>
                      {mainCardTitle} changes have been made successfully.
                    </DialogContentText>
                  </Grid>
                  <Grid item sx={{ mt: 3, mb: 1 }}>
                    <Button
                      onClick={closeDialog}
                      size="large"
                      variant="contained"
                    >
                      Ok
                    </Button>
                  </Grid>
                </DialogContent>
              </Grid>
            </Dialog>
          )}
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

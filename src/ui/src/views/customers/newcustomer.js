import React from "react";
import { useNavigate } from "react-router-dom";
// material-ui
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
// project imports
import CustomerForm from "ui-component/forms/CustomerForm";
import CustomerPOCForm from "ui-component/forms/CustomerPOCForm";
import MainCard from "ui-component/cards/MainCard";

// ==============================|| New Customer View ||============================== //

const NewCustomerPage = () => {
  let navigate = useNavigate();
  const [isToggleOn, setToggle] = React.useState(true);
  const [custForm, setCustform] = React.useState({
    custName: "",
    custId: "",
    custDomain: "",
    dateVal: Date.now(), // TODO: change date type follow back-end
    custType: "",
    addressOne: "",
    addressTwo: "",
    city: "",
    state: "",
    zip: "",
    contact_list: {
      firstName: "",
      lastName: "",
      title: "",
      officePhone: "",
      mobilePhone: "",
      email: "",
      contactNotes: "",
    },
  });
  console.log(custForm);
  return (
    <MainCard title="Campaigns">
      <Box sx={{ ml: 5, mr: 5, mt: 3, maxWidth: 1000 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography variant="h4" gutterBottom component="div">
              Customer Information
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <CustomerForm setCustform={setCustform} custForm={custForm} />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ mb: 1 }}>
            <Typography variant="h4" gutterBottom component="div">
              Customer/Organization Point of Contacts
            </Typography>
          </Grid>
          {isToggleOn ? (
            <React.Fragment>
              <Grid item xs={10} sm={6} md={5} lg={4} xl={3} sx={{ mb: 1 }}>
                <Button
                  color="warning"
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={() => setToggle(!isToggleOn)}
                >
                  Add Customer Contact
                </Button>
              </Grid>
              <Grid
                item
                display={{ xs: "none", sm: "block" }}
                sm={6}
                md={7}
                lg={8}
                xl={9}
              ></Grid>
            </React.Fragment>
          ) : (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ mb: 1 }}>
              <Card variant="outlined">
                <CustomerPOCForm
                  setCustform={setCustform}
                  custForm={custForm}
                  isToggleOn={isToggleOn}
                  setToggle={setToggle}
                />
              </Card>
            </Grid>
          )}
          <Grid item xs={10} sm={12} md={12} lg={12} xl={12} sx={{ mb: 3 }}>
            <Alert severity="error">No contacts available</Alert>
          </Grid>
          <Grid
            item
            display={{ xs: "none", sm: "block" }}
            sm={5}
            md={7}
            lg={8}
            xl={8}
          ></Grid>
          <Grid item xs={10} sm={5} md={4} lg={3} xl={3}>
            <Button disabled variant="contained" size="large" fullWidth>
              Save Customer
            </Button>
          </Grid>
          <Grid item xs={10} sm={1} md={1} lg={1} xl={1}>
            <Button
              color="dark"
              variant="text"
              size="large"
              fullWidth
              onClick={() => navigate("/li-pca-app/customers")}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Box>
    </MainCard>
  );
};

export default NewCustomerPage;

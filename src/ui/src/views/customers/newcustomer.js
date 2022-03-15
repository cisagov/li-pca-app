import React from "react";
// material-ui
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

class NewCustomerPage extends React.Component {
  constructor() {
    super();
    this.state = { isToggleOn: true };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState((state) => ({ isToggleOn: !state.isToggleOn }));
  }
  render() {
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
              <CustomerForm />
            </Grid>
            <Grid item xs={10} sm={6} md={5} lg={4} xl={3} sx={{ mt: 3 }}>
              <Button
                color="warning"
                variant="contained"
                size="large"
                fullWidth
                onClick={this.handleClick}
              >
                Add Customer Contact
              </Button>
            </Grid>
            <Grid
              item
              display={{ xs: "none", sm: "block" }}
              sm={3}
              md={5}
              lg={6}
              xl={8}
            ></Grid>
            <Grid
              item
              display={{ xs: "none", sm: "block" }}
              sm={3}
              md={2}
              lg={2}
              xl={1}
              sx={{ mt: 2 }}
            >
              <Button size="large" fullWidth>
                Clear
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ mt: 3 }}>
              <Typography variant="h4" gutterBottom component="div">
                Customer/Organization Point of Contacts
              </Typography>
            </Grid>
            {this.state.isToggleOn ? (
              ""
            ) : (
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ mb: 1 }}>
                <Card variant="outlined">
                  <CustomerPOCForm />
                </Card>
              </Grid>
            )}
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
              <Button color="dark" variant="text" size="large" fullWidth>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Box>
      </MainCard>
    );
  }
}

export default NewCustomerPage;

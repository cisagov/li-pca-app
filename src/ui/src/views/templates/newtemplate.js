import React from "react";
// material-ui
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
// project imports
import CustomerForm from "ui-component/forms/TemplateForm";
import MainCard from "ui-component/cards/MainCard";

// ==============================|| New Customer View ||============================== //

class NewTemplatePage extends React.Component {
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
      <MainCard title="Templates">
        <Box sx={{ ml: 5, mr: 5, mt: 3, maxWidth: 1000 }}>
          <Grid container spacing={2}>
            "l;lj;alks"
          </Grid>
        </Box>
      </MainCard>
    );
  }
}

export default NewTemplatePage;

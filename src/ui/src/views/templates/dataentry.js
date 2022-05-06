import React from "react";
import PropTypes from "prop-types";

// material-ui
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TemplateAttributeForm from "ui-component/forms/TemplateAttributeForm";
import Typography from "@mui/material/Typography";

//project imports
import MainCard from "ui-component/cards/MainCard";
import { TextField } from "@mui/material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const getOtherIdentifiers = (templateData, templateValues) => {
  const identifierArr = templateData.map(({ identifier }) => identifier);
  return identifierArr.filter((identifier) => {
    if (identifier != templateValues.identifier) {
      return identifier;
    }
  });
};
const TemplateDataEntryPage = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <MainCard title="Templates">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={4} sm={3} md={2} lg={2} xl={2}>
            <Button
              color="warning"
              size="large"
              variant="contained"
              fullWidth
              startIcon={<ArrowBackIosIcon />}
            >
              Previous
            </Button>
          </Grid>
          <Grid item xs={4} sm={6} md={8} lg={8} xl={8} />
          <Grid item xs={4} sm={3} md={2} lg={2} xl={2}>
            <Button
              color="warning"
              size="large"
              variant="contained"
              fullWidth
              endIcon={<ArrowForwardIosIcon />}
            >
              Next
            </Button>
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8} sx={{ mr: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={8} md={8} lg={7} xl={7}>
                <TextField fullWidth label="Template Name"></TextField>
              </Grid>
              <Grid item xs={12} sm={4} md={4} lg={4} xl={3}>
                <Button size="large" variant="contained" fullWidth>
                  Import Email
                </Button>
              </Grid>
              <Grid item display={{ xs: "none", xl: "block" }} xl={2} />
            </Grid>
            <Grid container>
              <Grid item xs={12} md={12} xl={12} sx={{ mt: 3 }}>
                <Tabs
                  variant="scrollable"
                  scrollButtons
                  allowScrollButtonsMobile
                  aria-label="scrollable force tabs example"
                  value={value}
                  onChange={handleChange}
                >
                  <Tab label="HTML View" />
                  <Tab label="Template Attributes" />
                  <Tab label="Campaigns" />
                  <Tab label="Template Testing" />
                </Tabs>
                <TabPanel value={value} index={0}>
                  Tab One contents
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <TemplateAttributeForm
                    initialTemplateAttributeValues={templateAttributeValues}
                    setTemplateAttributeData={setTemplateAttributeData}
                    templateAttributeData={templateAttributeData}
                    setHasSubmitted={setHasSubmitted}
                    identifiers={getOtherIdentifiers(
                      state.rows,
                      templateAttributeValues
                    )}
                  />
                </TabPanel>
                <TabPanel value={value} index={2}>
                  Tab Three contents
                </TabPanel>
                <TabPanel value={value} index={3}>
                  Tab Four contents
                </TabPanel>
              </Grid>
            </Grid>
          </Grid>
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            style={{ marginRight: "-1px" }}
          />
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
            <Typography
              variant="h3"
              gutterBottom
              component="div"
              color="primary"
            >
              Deception Calculator
            </Typography>
            This is where the Deception Calculator will go.
          </Grid>
        </Grid>
      </Box>
    </MainCard>
  );
};

export default TemplateDataEntryPage;

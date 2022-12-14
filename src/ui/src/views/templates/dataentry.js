import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

// material-ui
import Alert from "@mui/material/Alert";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import Divider from "@mui/material/Divider";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Grid from "@mui/material/Grid";
import MainCard from "ui-component/cards/MainCard";
import RuleIcon from "@mui/icons-material/Rule";
import SettingsIcon from "@mui/icons-material/Settings";
import Tab from "@mui/material/Tab";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import WebIcon from "@mui/icons-material/Web";

// project imports
import AlertDialog from "ui-component/popups/AlertDialog";
import ConfirmDialog from "ui-component/popups/ConfirmDialog";
import DeceptionCalculator from "./deceptionCalculator";
import HtmlEditor from "ui-component/forms/HtmlEditor";
import ResultDialog from "ui-component/popups/ResultDialog";
import TemplateAttrForm from "ui-component/forms/TemplateAttributeForm";
import TemplateTestingForm from "ui-component/forms/TemplateTestingForm";
import { submitEntry } from "services/api.js";

//third party
import { useFormik } from "formik";
import * as yup from "yup";

const temRowsTransform = (templateRows) => {
  if (!templateRows.hasOwnProperty("name")) {
    templateRows.name = "";
  }
  if (!templateRows.hasOwnProperty("from_address")) {
    templateRows.from_address = "";
  }
  if (!templateRows.hasOwnProperty("landing_page_id")) {
    templateRows.landing_page_id = "";
  }
  if (!templateRows.hasOwnProperty("sending_domain_id")) {
    templateRows.sending_domain_id = "";
  }
  if (!templateRows.hasOwnProperty("deception_score")) {
    templateRows.deception_score = 0;
  }
  if (!templateRows.hasOwnProperty("retired")) {
    templateRows.retired = false;
  }
  if (!templateRows.hasOwnProperty("retired_description")) {
    templateRows.retired_description = "";
  }
  if (!templateRows.hasOwnProperty("sophisticated")) {
    templateRows.sophisticated = [];
  }
  if (!templateRows.hasOwnProperty("red_flag")) {
    templateRows.red_flag = [];
  }
  if (!templateRows.hasOwnProperty("subject")) {
    templateRows.subject = "";
  }
  if (!templateRows.hasOwnProperty("text")) {
    templateRows.text = "";
  }
  if (!templateRows.hasOwnProperty("html")) {
    templateRows.html = "";
  }
  if (!templateRows.hasOwnProperty("indicators")) {
    templateRows.indicators = {
      appearance: {
        grammar: 0,
        link_domain: 0,
        logo_graphics: 0,
      },
      sender: {
        external: 0,
        internal: 0,
        authoritative: 0,
      },
      relevancy: {
        organization: 0,
        public_news: 0,
      },
      behavior: {
        fear: false,
        duty_obligation: false,
        curiosity: false,
        greed: false,
      },
    };
  }
  if (!templateRows.hasOwnProperty("campaigns")) {
    templateRows.campaigns = [];
  }
  return templateRows;
};

const campaignColumns = [
  { field: "id", hide: true },
  { field: "name", headerName: "Campaign Name", minWidth: 100, flex: 1 },
  { field: "status", headerName: "Status", minWidth: 100, flex: 1 },
];

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

const temNewOrEdit = (dataEntryType) => {
  if (dataEntryType == "new") {
    return "New Template";
  }
  return "Edit Template";
};

const fieldsToValidate = {
  subject: true,
  name: true,
  text: true,
  from_address: true,
};

const TemplateDataEntryPage = () => {
  const { state } = useLocation();
  let navigate = useNavigate();
  let dataEntryType = temNewOrEdit(state.dataEntryType);
  let templateValues = temRowsTransform(state.row);
  const [templateData, setTemplateData] = useState(templateValues);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [htmlValue, setHtmlValue] = useState(templateValues["html"]);
  const [tabValue, setTabValue] = useState(0);
  const [savebtnOpen, setSavebtnOpen] = useState(false);
  const [alertbtnOpen, setAlertbtnOpen] = useState(false);
  const [selectedSophTags, setSophTags] = useState(
    templateData["sophisticated"]
  );
  const [selectedRFTags, setRFTags] = useState(templateData["red_flag"]);
  const [getError, setError] = useState([false, ""]);
  const [cancelbtnOpen, setCancelbtnOpen] = useState(false);
  const alertSubtitle = (
    <p>
      Please check that <b>Template Name</b>, <b>HTML</b>, <b>Subject</b>,
      &nbsp;<b>Display Name</b>, and <b>Sender</b> are all filled out and <br />
      that the <b>Deception Score</b> is between 1 and 6.
    </p>
  );
  const validationSchema = yup.object({
    subject: yup.string().required("Subject is required"),
    name: yup.string().required("Template Name is required"),
    text: yup.string().required("Display Name is required"),
    from_address: yup.string().required("Sender is required"),
  });
  const formik = useFormik({
    initialValues: templateValues,
    validationSchema: validationSchema,
    validateOnMount: true,
    validateOnChange: true,
    onSubmit: (values) => {
      values["sophisticated"] = selectedSophTags;
      values["red_flag"] = selectedRFTags;
      values["html"] = htmlValue;
      values["indicators"] = templateData["indicators"];
      values["deception_score"] = templateData["deception_score"];
      setTemplateData(values);
      // submitTemplate(values, values._id, dataEntryType, setError);
      submitEntry("templates", values, values._id, dataEntryType, setError);
      setHasSubmitted(true);
      setTimeout(() => setSavebtnOpen(false));
    },
  });
  let subtitleConfirm = (
    <>
      <b>{formik.values.name}</b> will be updated in the database.
    </>
  );
  let formTouched =
    JSON.stringify(templateValues) != JSON.stringify(formik.values) ||
    JSON.stringify(templateValues) != JSON.stringify(templateData) ||
    templateValues.html != htmlValue ||
    // selectedRFTags !== templateData["red_flag"] &&
    JSON.stringify(selectedRFTags) !==
      JSON.stringify(templateData["red_flag"]) ||
    JSON.stringify(selectedSophTags) !==
      JSON.stringify(templateData["sophisticated"]);
  const handleSave = () => {
    formik.setTouched(fieldsToValidate);
    if (
      templateData["deception_score"] == 0 ||
      templateData["deception_score"] > 6
    ) {
      setAlertbtnOpen(true);
    } else if (formik.isValid && htmlValue != "") {
      setSavebtnOpen(true);
    } else {
      setAlertbtnOpen(true);
    }
  };
  const closeDialog = () => {
    setAlertbtnOpen(false);
    setError([false, ""]);
    // setDelete(false);
    if (!getError[0] && hasSubmitted) {
      navigate("/cat-phishing/templates");
    }
    setHasSubmitted(false);
  };
  const isDisabled = () => {
    if (!formTouched) {
      return true;
    }
    return false;
  };
  const handleCancel = () => {
    if (formTouched) {
      setCancelbtnOpen(true);
    } else {
      navigate("/cat-phishing/templates");
    }
  };
  return (
    <MainCard title={dataEntryType}>
      <Box sx={{ maxWidth: 1500 }}>
        <Grid container spacing={3}>
          {dataEntryType == "New Template" ? (
            <></>
          ) : (
            <>
              <Grid item xs={6} sm={5} md={4} lg={3} xl={3}>
                <Button
                  color="warning"
                  size="medium"
                  variant="contained"
                  fullWidth
                  startIcon={<ArrowBackIosIcon />}
                >
                  Previous Template
                </Button>
              </Grid>
              <Grid
                item
                display={{ xs: "none", sm: "block" }}
                sm={2}
                md={4}
                lg={6}
                xl={6}
              />
              <Grid item xs={6} sm={5} md={4} lg={3} xl={3}>
                <Button
                  color="warning"
                  size="medium"
                  variant="contained"
                  fullWidth
                  endIcon={<ArrowForwardIosIcon />}
                >
                  Next Template
                </Button>
              </Grid>
              <Grid item xs={12} xl={12} sx={{ mt: 2 }} />
            </>
          )}
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8} sx={{ mr: 2 }}>
            <form id="template-form" onSubmit={formik.handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={8} md={8} lg={7} xl={7}>
                  <TextField
                    size="small"
                    fullWidth
                    id="name"
                    name="name"
                    label="Template Name *"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4} xl={3}>
                  <Button size="medium" variant="contained" fullWidth>
                    Import Email
                  </Button>
                </Grid>
                <Grid item display={{ xs: "none", xl: "block" }} xl={2} />
              </Grid>
            </form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ mt: 2 }}>
                <Box sx={{ width: "100%" }}>
                  <Tabs
                    value={tabValue}
                    onChange={(event, newValue) => {
                      setTabValue(newValue);
                    }}
                    variant="scrollable"
                    scrollButtons
                    allowScrollButtonsMobile
                    sx={{
                      [`& .${tabsClasses.scrollButtons}`]: {
                        "&.Mui-disabled": { opacity: 0.3 },
                      },
                    }}
                  >
                    <Tab icon={<WebIcon />} label="HTML View" />
                    <Tab icon={<SettingsIcon />} label="Template Attributes" />
                    <Tab icon={<EmailOutlinedIcon />} label="Campaigns" />
                    <Tab icon={<RuleIcon />} label="Template Testing" />
                  </Tabs>
                  <TabPanel value={tabValue} index={0}>
                    <HtmlEditor
                      value={htmlValue}
                      setValue={setHtmlValue}
                      height={"700"}
                    />
                    {htmlValue == "<!DOCTYPE html>" || htmlValue == "" ? (
                      <Box sx={{ mt: 2 }}>
                        <Alert severity="error">
                          HTML cannot be empty in order to save the template.
                        </Alert>
                      </Box>
                    ) : (
                      <></>
                    )}
                  </TabPanel>
                  <TabPanel value={tabValue} index={1}>
                    <TemplateAttrForm
                      formik={formik}
                      selectedSophTags={selectedSophTags}
                      setSophTags={setSophTags}
                      selectedRFTags={selectedRFTags}
                      setRFTags={setRFTags}
                    />
                  </TabPanel>
                  <TabPanel value={tabValue} index={2}>
                    {templateValues.campaigns.length === 0 ? (
                      <Typography component="div" sx={{ mb: 2 }}>
                        No campaigns are currently using this template.
                      </Typography>
                    ) : (
                      <></>
                    )}
                    {tabValue == 2 ? (
                      <DataGrid
                        autoHeight
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        rows={templateValues.campaigns.map((item, index) => ({
                          id: index,
                          name: item,
                          status: "",
                        }))}
                        columns={campaignColumns}
                        density="compact"
                        // onSelectionModelChange={(id) => {
                        //   const item = templateValues.campaigns.find(
                        //     (row) => row.id === id[0]
                        //   );
                        //   console.log(item);
                        //   // TODO: Navigate to campaign page
                        // }}
                      />
                    ) : (
                      <></>
                    )}
                  </TabPanel>
                  <TabPanel value={tabValue} index={3}>
                    <TemplateTestingForm
                      initialTemplateValues={templateValues}
                      setTemplateData={setTemplateData}
                      templateData={templateData}
                      setHasSubmitted={setHasSubmitted}
                      identifiers={getOtherIdentifiers(
                        state.rows,
                        templateValues
                      )}
                    />
                  </TabPanel>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            style={{ marginRight: "5px" }}
          />
          <DeceptionCalculator
            setTemplateData={setTemplateData}
            templateData={templateData}
          />
          <Grid
            item
            display={{ xs: "none", sm: "block" }}
            sm={4}
            md={3}
            lg={4}
            xl={5}
          />
          <Grid item xs={10} sm={5} md={3} lg={3} xl={2}>
            <form id="template-form" onSubmit={formik.handleSubmit}>
              <Button
                fullWidth
                color="info"
                variant="contained"
                size="large"
                onClick={handleSave}
                disabled={isDisabled()}
              >
                Save Template
              </Button>
              <ConfirmDialog
                subtitle="Are you ready to save"
                confirmType="Save"
                formName="template-form"
                isOpen={savebtnOpen}
                setIsOpen={setSavebtnOpen}
              />
              <AlertDialog
                title="Template has missing or incorrect values"
                subtitle={alertSubtitle}
                isOpen={alertbtnOpen}
                setIsOpen={setAlertbtnOpen}
                closeDialog={closeDialog}
              />
              <ConfirmDialog
                subtitle={subtitleConfirm}
                confirmType="Save"
                formName="template-form"
                isOpen={savebtnOpen}
                setIsOpen={setSavebtnOpen}
              />
              <ResultDialog
                type={dataEntryType}
                hasSubmitted={hasSubmitted}
                error={getError}
                closeDialog={closeDialog}
              />
            </form>
          </Grid>
          <Grid item xs={10} sm={2} md={2} lg={1} xl={1}>
            <Button
              fullWidth
              color="dark"
              variant="text"
              size="large"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <ConfirmDialog
              subtitle="Unsaved changes will be discarded."
              confirmType="Leave"
              handleClick={() => navigate("/cat-phishing/templates")}
              isOpen={cancelbtnOpen}
              setIsOpen={setCancelbtnOpen}
            />
          </Grid>
        </Grid>
      </Box>
    </MainCard>
  );
};

export default TemplateDataEntryPage;

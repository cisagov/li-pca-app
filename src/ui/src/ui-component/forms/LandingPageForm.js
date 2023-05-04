import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

//material-ui
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

// project imports
import ConfirmDialog from "ui-component/popups/ConfirmDialog";
import HtmlEditor from "ui-component/forms/HtmlEditor";
import ResultDialog from "ui-component/popups/ResultDialog";
import { submitEntry, deleteEntry } from "services/api.js";

//third party
import { useFormik } from "formik";
import * as yup from "yup";

/**
 * Renders a tab panel component.
 * @param {Object} props - Component props.
 * @param {number} props.value - The index of the currently active tab.
 * @param {number} props.index - The index of this tab panel.
 * @param {ReactNode} props.children - The content to render within this tab panel.
 * @param {Object} props.other - Any additional props to be passed to the rendered div.
 * @returns {JSX.Element} - The rendered tab panel.
 */
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

// Form validation
const validationSchema = yup.object({
  name: yup.string().required("Landing Page Name is required"),
});

// An object representing the fields to be validated
const fieldsToValidate = {
  name: true,
};

/**
 * A form component for landing pages with various states and actions.
 * @param {Object} props - The props object for this component.
 * @param {Object} props.initialValues - An object containing initial form values.
 * @param {string} props.dataEntryType - The type of data entry being made.
 * @param {boolean} props.currentPageIsDefault - Indicates if the current page is the default landing page.
 * @param {Object} props.currentDefaultPage - The current default landing page.
 * @param {boolean} props.hasDefault - Indicates if there is a default landing page.
 * @returns {JSX.Element} A JSX element containing a form for landing pages.
 */
const LandingPageForm = (props) => {
  let navigate = useNavigate();
  const [cancelbtnOpen, setCancelbtnOpen] = useState(false);
  const [deletebtnOpen, setDeletebtnOpen] = useState(false);
  const [savebtnOpen, setSavebtnOpen] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [getDelete, setDelete] = useState(false);
  const [getError, setError] = useState([false, ""]);
  const [htmlValue, setHtmlValue] = useState(props.initialValues.html);
  const [tabValue, setTabValue] = useState(0);
  const [activeAlert, setActiveAlert] = useState(false);
  const isHtmlEmpty = htmlValue === "" || htmlValue === undefined;
  /**
   * Handles changes in tab value.
   * @param {Object} event - The event object.
   * @param {number} newValue - The new tab value.
   */
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    // console.log(event);
  };
  // Initialize formik form
  const formik = useFormik({
    initialValues: props.initialValues,
    validationSchema: validationSchema,
    validateOnChange: true,
    onSubmit: (values) => {
      const dType = props.dataEntryType;
      values["html"] = htmlValue;
      // Submits entry to the backend.
      submitEntry("landing_pages", values, values._id, dType, setError);
      // Changes default landing page if applicable.
      const wasNotDefault = !props.currentPageIsDefault;
      const isDefaultChanged =
        props.initialValues.is_default_template != values.is_default_template;
      if (props.hasDefault && wasNotDefault && isDefaultChanged) {
        props.currentDefaultPage["is_default_template"] = false;
        submitEntry(
          "landing_pages",
          props.currentDefaultPage,
          props.currentDefaultPage._id,
          "Edit Landing Page",
          setError
        );
      }
      setHasSubmitted(true);
      setTimeout(() => {
        setSavebtnOpen(false);
      });
    },
  });
  // Handles cancel action.
  const handleCancel = () => {
    if (formik.dirty || !isHtmlEmpty) {
      setCancelbtnOpen(true);
    } else {
      navigate("/cat-phishing/landing-pages");
    }
  };
  // Confirms delete action.
  const confirmDelete = () => {
    deleteEntry("landing_pages", props.initialValues._id, setError);
    setTimeout(() => {
      setDeletebtnOpen(false);
      setDelete(true);
    });
  };
  // Handles save action.
  const handleSave = () => {
    formik.setTouched(fieldsToValidate);
    if (formik.dirty && !isHtmlEmpty) {
      setSavebtnOpen(true);
    }
    setActiveAlert(isHtmlEmpty);
  };
  // Handles close dialog.
  const closeDialog = () => {
    setHasSubmitted(false);
    setDelete(false);
    if (!getError[0]) {
      navigate("/cat-phishing/landing-pages");
    }
  };
  return (
    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
      <form onSubmit={formik.handleSubmit} id="landing-page-form">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={10} md={8} lg={7} xl={6}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Landing Page Name *"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
          <Grid item xs={12} sm={10} md={8} lg={7} xl={7} sx={{ mt: 1 }}>
            <FormControlLabel
              control={<Checkbox checked={formik.values.is_default_template} />}
              label="Set As System Default Template"
              id="is_default_template"
              name="is_default_template"
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} />
          <Box sx={{ width: "100%", mb: 3 }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs value={tabValue} onChange={handleTabChange}>
                <Tab label="Landing Page Editor" />
                <Tab label="Templates" />
              </Tabs>
            </Box>
            <TabPanel value={tabValue} index={0}>
              <HtmlEditor value={htmlValue} setValue={setHtmlValue} />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              No templates are currently using this landing page
            </TabPanel>
            {activeAlert ? (
              <Alert severity="warning">
                Landing Page Editor must not be empty in order to save.
              </Alert>
            ) : (
              <></>
            )}
          </Box>
          {props.dataEntryType == "New Landing Page" ? (
            <Grid item xs={10} sm={6} md={7} lg={7} xl={8} />
          ) : (
            <>
              <Grid item xs={11} sm={4} md={3} lg={3} xl={2}>
                <Button
                  fullWidth
                  variant="outlined"
                  size="large"
                  color="error"
                  disabled={false}
                  onClick={() => setDeletebtnOpen(true)}
                >
                  Delete Page
                </Button>
              </Grid>
              <ConfirmDialog
                subtitle={
                  formik.values.name + " will be deleted in the database."
                }
                confirmType="Delete"
                handleClick={confirmDelete}
                isOpen={deletebtnOpen}
                setIsOpen={setDeletebtnOpen}
              />
              <Grid item xs={10} sm={2} md={4} lg={4} xl={6} />
            </>
          )}
          <Grid item xs={11} sm={4} md={3} lg={3} xl={2}>
            <Button
              fullWidth
              color="info"
              variant="contained"
              size="large"
              disabled={
                !(formik.dirty || props.initialValues.html !== htmlValue)
              }
              onClick={handleSave}
            >
              Save Page
            </Button>
          </Grid>
          <Grid item xs={11} sm={2} md={2} lg={2} xl={2}>
            <Button
              variant="text"
              size="large"
              fullWidth
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <ConfirmDialog
              subtitle={
                formik.values.name + " will be updated in the database."
              }
              confirmType="Save"
              formName="landing-page-form"
              isOpen={savebtnOpen}
              setIsOpen={setSavebtnOpen}
            />
            <ConfirmDialog
              subtitle="Unsaved changes will be discarded."
              confirmType="Leave"
              handleClick={() => navigate("/cat-phishing/landing-pages")}
              isOpen={cancelbtnOpen}
              setIsOpen={setCancelbtnOpen}
            />
            <ResultDialog
              type={getDelete ? "Delete Landing Page" : props.dataEntryType}
              hasSubmitted={getDelete || hasSubmitted}
              error={getError}
              closeDialog={closeDialog}
            />
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};

LandingPageForm.propTypes = {
  initialValues: PropTypes.object,
  dataEntryType: PropTypes.string,
  currentDefaultPage: PropTypes.object,
  currentPageIsDefault: PropTypes.bool,
  hasDefault: PropTypes.bool,
};

export default LandingPageForm;

import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

//material-ui
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

// project imports
import ConfirmDialog from "ui-component/popups/ConfirmDialog";
import ResultDialog from "ui-component/popups/ResultDialog";

//third party
import { useFormik } from "formik";
import * as yup from "yup";

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

const validationSchema = yup.object({
  name: yup.string().required("Landing Page Name is required"),
});

const LandingPageForm = (props) => {
  let navigate = useNavigate();
  const [cancelbtnOpen, setCancelbtnOpen] = React.useState(false);
  const [deletebtnOpen, setDeletebtnOpen] = React.useState(false);
  const [tabValue, setTabValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const formik = useFormik({
    initialValues: props.initialValues,
    validationSchema: validationSchema,
    validateOnChange: true,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleCancel = () => {
    if (formik.dirty) {
      setCancelbtnOpen(true);
    } else {
      navigate("/li-pca-app/landing-pages");
    }
  };

  const confirmDelete = () => {
    setTimeout(() => {
      setDeletebtnOpen(false);
      setDelete(true);
    });
  };
  const closeDialog = () => {
    // setHasSubmitted(false);
    setDelete(false);
    if (!getError[0]) {
      navigate("/li-pca-app/landing-pages");
    }
  };
  return (
    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
      <form onSubmit={formik.handleSubmit}>
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
              control={
                <Checkbox checked={formik.values.default_landing_page} />
              }
              label="Set As System Default Template"
              id="default_landing_page"
              name="default_landing_page"
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12} md={12} xl={12} sx={{ mt: 2 }} />
          <Box sx={{ width: "100%", mb: 3 }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs value={tabValue} onChange={handleChange}>
                <Tab label="Landing Page Editor HTML View" />
                <Tab label="Templates" />
              </Tabs>
            </Box>
            <TabPanel value={tabValue} index={0}>
              HTML Editor display
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              No templates are currently using this landing page
            </TabPanel>
          </Box>
          {props.dataEntryType == "New Landing Page" ? (
            <Grid item xs={10} sm={7} md={8} lg={8} xl={9} />
          ) : (
            <React.Fragment>
              <Grid item xs={10} sm={4} md={3} lg={3} xl={2}>
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
              <Grid item xs={10} sm={3} md={5} lg={5} xl={7} />
            </React.Fragment>
          )}
          <Grid item xs={10} sm={4} md={3} lg={3} xl={2}>
            <Button
              fullWidth
              color="info"
              variant="contained"
              size="large"
              // disabled={isDisabled()}
              // onClick={handleSave}
            >
              Save Page
            </Button>
          </Grid>
          <Grid item xs={10} sm={1} md={1} lg={1} xl={1}>
            <Button
              color="dark"
              variant="text"
              size="large"
              fullWidth
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <ConfirmDialog
              subtitle="Unsaved changes will be discarded."
              confirmType="Leave"
              handleClick={() => navigate("/li-pca-app/landing-pages")}
              isOpen={cancelbtnOpen}
              setIsOpen={setCancelbtnOpen}
            />
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};

export default LandingPageForm;

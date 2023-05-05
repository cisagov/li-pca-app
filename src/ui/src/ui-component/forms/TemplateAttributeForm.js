import { useState } from "react";
import PropTypes from "prop-types";

//material-ui
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

// project imports
import TemplateMultiSelectChip from "../user-input/TemplateMultiSelectChip";
import TemplateAttrRecsForm from "./TemplateAttrRecsForm";
import { useGetAll } from "services/api.js";

const recsJson = require("views/templates/recommendations.json");
/**
 * Retrieves the recommendations JSON to return only the entries with the recommendation type "Sophisticated".
 */
const sophJson = recsJson.filter(
  (entry) => entry.recommendation_type === "Sophisticated"
);
/**
 * Filters the recommendations JSON to return only the entries with the recommendation type "Red Flag".
 */
const redFlagJson = recsJson.filter(
  (entry) => entry.recommendation_type === "Red Flag"
);

/**
 * Renders a form for editing or creating attributes for an email template.
 * @param {object} props - The props for the component.
 * @param {object} props.formik - The Formik state manager.
 * @param {function} props.setSophTags - Function to update the selection of "Sophisticated" tags.
 * @param {function} props.setRFTags - Function to update the selection "Red Flag" tags array.
 * @param {array} props.selectedRFTags - An array with all the "Red Flag" tags selected.
 * @param {array} props.selectedSophTags - An array with all the "Sophisticated" tags selected.
 * @returns {JSX.Element} JSX element representing the email template creation form.
 */
const TemplateAttrForm = (props) => {
  const [sophisticatedArray, setSophArray] = useState(sophJson);
  const [redFlagArray, setRFArray] = useState(redFlagJson);
  const domains = useGetAll("sending_domains");
  const landingPages = useGetAll("landing_pages");

  /**
   * Returns a message to display when a sending domain or landing page is not found in the system.
   * @param {string} entity - The entity that was not found. (e.g. "sending domains", "landing pages")
   * @returns {string} The error message to display.
   */
  const getNotFoundMessage = (entity) => {
    return `Either no ${entity} have been created in the system or there was an error fetching them. Please try again later or contact support if the issue persists.`;
  };

  /**
   * Returns an error message to display when a sending domain or landing page is not found.
   * @param {string} entity - The entity that was not found. (e.g. "sending domains", "landing pages")
   * @returns {JSX.Element} The error message wrapped in a Tooltip component.
   */
  const message = (entity) => {
    const msg = getNotFoundMessage(entity);
    return (
      <Tooltip placement="right" title={msg}>
        <Alert severity="error" size="small">
          No {entity} found.
        </Alert>
      </Tooltip>
    );
  };

  return (
    <Box sx={{ minWidth: 300, maxWidth: 1000 }}>
      <form id="template-form" onSubmit={props.formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography variant="h4" gutterBottom color="text.secondary">
              Subject:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={11} xl={10}>
            <TextField
              size="small"
              fullWidth
              id="subject"
              name="subject"
              label="Subject *"
              value={props.formik.values.subject}
              onChange={props.formik.handleChange}
              error={
                props.formik.touched.subject &&
                Boolean(props.formik.errors.subject)
              }
              helperText={
                props.formik.touched.subject && props.formik.errors.subject
              }
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography variant="h4" gutterBottom color="text.secondary">
              From Address:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={5}>
            <TextField
              size="small"
              fullWidth
              id="text"
              name="text"
              label="Display Name *"
              value={props.formik.values.text}
              onChange={props.formik.handleChange}
              error={
                props.formik.touched.text && Boolean(props.formik.errors.text)
              }
              helperText={props.formik.touched.text && props.formik.errors.text}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={5} xl={5}>
            <TextField
              size="small"
              fullWidth
              id="from_address"
              name="from_address"
              label="Sender *"
              value={props.formik.values.from_address}
              onChange={props.formik.handleChange}
              error={
                props.formik.touched.from_address &&
                Boolean(props.formik.errors.from_address)
              }
              helperText={
                props.formik.touched.from_address &&
                props.formik.errors.from_address
              }
            />
          </Grid>
          <Grid item s={12} sm={12} md={12} lg={12} xl={12}>
            {props.formik.values.text} &#60;{props.formik.values.from_address}
            @domain.com&#62;
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography variant="h4" gutterBottom color="text.secondary">
              Recommendations:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={11} xl={10}>
            <TemplateMultiSelectChip
              values={sophisticatedArray}
              selection={props.selectedSophTags}
              setSelection={props.setSophTags}
              label="Sophisticated"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={11} xl={10}>
            <TemplateMultiSelectChip
              values={redFlagArray}
              selection={props.selectedRFTags}
              setSelection={props.setRFTags}
              label="Red Flag"
            />
          </Grid>
        </Grid>
      </form>
      <TemplateAttrRecsForm
        sophisticatedArray={sophisticatedArray}
        redFlagArray={redFlagArray}
        setSophArray={setSophArray}
        setRFArray={setRFArray}
      />
      <form id="template-form" onSubmit={props.formik.handleSubmit}>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography variant="h4" gutterBottom color="text.secondary">
              Campaign Config:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={11} xl={10}>
            {domains.getError[0] || domains.getData.length == 0 ? (
              message("sending domains")
            ) : (
              <TextField
                size="small"
                select
                fullWidth
                label="Sending Domain Selection"
                id="sending_domain_id"
                name="sending_domain_id"
                value={props.formik.values.sending_domain_id}
                onChange={props.formik.handleChange}
                error={
                  props.formik.touched.sending_domain_id &&
                  Boolean(props.formik.errors.sending_domain_id)
                }
                helperText={
                  props.formik.touched.sending_domain_id &&
                  props.formik.errors.sending_domain_id
                }
              >
                {domains.getData.map((entry) => {
                  return (
                    <MenuItem key={entry._id} value={entry._id}>
                      {entry.name}
                    </MenuItem>
                  );
                })}
              </TextField>
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={11} xl={10}>
            {landingPages.getError[0] || landingPages.getData.length == 0 ? (
              message("landing pages")
            ) : (
              <TextField
                size="small"
                select
                fullWidth
                label="Landing Page Selection"
                id="landing_page_id"
                name="landing_page_id"
                value={props.formik.values.landing_page_id}
                onChange={props.formik.handleChange}
                error={
                  props.formik.touched.landing_page_id &&
                  Boolean(props.formik.errors.landing_page_id)
                }
                helperText={
                  props.formik.touched.landing_page_id &&
                  props.formik.errors.landing_page_id
                }
              >
                {landingPages.getData.map((entry) => {
                  return (
                    <MenuItem key={entry._id} value={entry._id}>
                      {entry.name}
                    </MenuItem>
                  );
                })}
              </TextField>
            )}
          </Grid>
          <Grid item xs={10} sm={1} md={1} lg={1} xl={1} />
        </Grid>
      </form>
    </Box>
  );
};

TemplateAttrForm.propTypes = {
  formik: PropTypes.object,
  setSophTags: PropTypes.func,
  setRFTags: PropTypes.func,
  selectedRFTags: PropTypes.array,
  selectedSophTags: PropTypes.array,
};

export default TemplateAttrForm;

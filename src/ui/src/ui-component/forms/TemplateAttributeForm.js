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
import { useGetAll as domainGetAll } from "services/api/SendingDomains";
import { useGetAll as landingPgGetAll } from "services/api/LandingPages";

const recsJson = require("views/templates/recommendations.json");
const sophJson = recsJson.filter(
  (entry) => entry.recommendation_type === "Sophisticated"
);
const redFlagJson = recsJson.filter(
  (entry) => entry.recommendation_type === "Red Flag"
);

const TemplateAttrForm = (props) => {
  const [sophisticatedArray, setSophArray] = useState(sophJson);
  const [redFlagArray, setRFArray] = useState(redFlagJson);
  let domain = domainGetAll();
  let landingPage = landingPgGetAll();

  const message = (str) => {
    let msg =
      "Either no " +
      str +
      " have been created in the system or there was an error fetching them.";
    return (
      <Tooltip placement="right" title={msg}>
        <Alert severity="error" size="small">
          No {str} found.
        </Alert>
      </Tooltip>
    );
  };

  return (
    <Box sx={{ midWidth: 300, maxWidth: 1000 }}>
      <form id="template-form" onSubmit={props.formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography variant="h4" gutterBottom component="div">
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
            <Typography variant="h4" gutterBottom component="div">
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
            <Typography variant="h4" gutterBottom component="div">
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
            <Typography variant="h4" gutterBottom component="div">
              Campaign Config:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={11} xl={10}>
            {domain.getError[0] || domain.getData.length == 0 ? (
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
                {domain.getData.map((entry) => {
                  const title = entry.name;
                  return (
                    <MenuItem key={title} value={title}>
                      {title}
                    </MenuItem>
                  );
                })}
              </TextField>
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={11} xl={10}>
            {landingPage.getError[0] || landingPage.getData.length == 0 ? (
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
                {landingPage.getData.map((entry) => {
                  const title = entry.name;
                  return (
                    <MenuItem key={title} value={title}>
                      {title}
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

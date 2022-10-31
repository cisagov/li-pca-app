import { useState, useEffect } from "react";
import PropTypes from "prop-types";

//material-ui
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

//third party
import { useFormik } from "formik";
import * as yup from "yup";

// project imports
import TemplateMultiSelectChip from "../user-input/TemplateMultiSelectChip";
import TemplateAttrRecsForm from "./TemplateAttrRecsForm";
import { useGetAll as domainGetAll } from "services/api/SendingDomains";
import { useGetAll as landingPgGetAll } from "services/api/LandingPages";

const sophJson = require("views/templates/sophisticatedTags.json");
const redFlagJson = require("views/templates/redFlagTags.json");

const TemplateAttrForm = (props) => {
  const [sophisticatedArray, setSophArray] = useState(sophJson);
  const [redFlagArray, setRFArray] = useState(redFlagJson);
  const [selectedSophTags, setSophTags] = useState([]);
  const [selectedRFTags, setRFTags] = useState([]);
  let domain = domainGetAll();
  let landingPage = landingPgGetAll();

  const validationSchema = yup.object({
    subject: yup.string().required("Subject is required"),
    name: yup.string().required("Template Name is required"),
    from_address: yup.string().required("Sender is required"),
  });
  const formik = useFormik({
    initialValues: props.initialTemplateValues,
    validationSchema: validationSchema,
    validateOnChange: true,
    onSubmit: (values) => {
      values["sophisticated"] = selectedSophTags;
      values["red_flag"] = selectedRFTags;
      props.setTemplateData(Object.assign(props.templateData, values));
      props.setHasSubmitted(true);
    },
  });
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
      <form id="template-attr-form" onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography variant="h4" gutterBottom component="div">
              Subject:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={11} lg={10} xl={9}>
            <TextField
              size="small"
              fullWidth
              id="subject"
              name="subject"
              label="Subject *"
              value={formik.values.subject}
              onChange={formik.handleChange}
              error={formik.touched.subject && Boolean(formik.errors.subject)}
              helperText={formik.touched.subject && formik.errors.subject}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography variant="h4" gutterBottom component="div">
              From Address:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={5} lg={5} xl={4}>
            <TextField
              size="small"
              fullWidth
              id="name"
              name="name"
              label="Display Name *"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={5} xl={5}>
            <TextField
              size="small"
              fullWidth
              id="from_address"
              name="from_address"
              label="Sender *"
              value={formik.values.from_address}
              onChange={formik.handleChange}
              error={
                formik.touched.from_address &&
                Boolean(formik.errors.from_address)
              }
              helperText={
                formik.touched.from_address && formik.errors.from_address
              }
            />
          </Grid>
          <Grid item xs={12} xl={11}>
            {formik.values.name} &#60;{formik.values.from_address}@domain.com
            &#62;
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography variant="h4" gutterBottom component="div">
              Recommendations:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={11} lg={10} xl={9}>
            <TemplateMultiSelectChip
              values={sophisticatedArray}
              selection={selectedSophTags}
              setSelection={setSophTags}
              label="Sophisticated"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={11} lg={10} xl={9}>
            <TemplateMultiSelectChip
              values={redFlagArray}
              selection={selectedRFTags}
              setSelection={setRFTags}
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
      <form id="template-attr-form" onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography variant="h4" gutterBottom component="div">
              Subscription Config:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={11} lg={10} xl={9}>
            {domain.getError[0] || domain.getData.length == 0 ? (
              message("sending domains")
            ) : (
              <TextField
                size="small"
                select
                fullWidth
                label="Sending Domain Selection"
                id="sending_profile_id"
                name="sending_profile_id"
                value={formik.values.sending_profile_id}
                onChange={formik.handleChange}
                error={
                  formik.touched.sending_profile_id &&
                  Boolean(formik.errors.sending_profile_id)
                }
                helperText={
                  formik.touched.sending_profile_id &&
                  formik.errors.sending_profile_id
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
          <Grid item xs={12} sm={12} md={11} lg={10} xl={9}>
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
                value={formik.values.landing_page_id}
                onChange={formik.handleChange}
                error={
                  formik.touched.landing_page_id &&
                  Boolean(formik.errors.landing_page_id)
                }
                helperText={
                  formik.touched.landing_page_id &&
                  formik.errors.landing_page_id
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
          <Grid item xs={12} sm={5} md={5} lg={5} xl={5}>
            <Button
              fullWidth
              color="info"
              variant="contained"
              size="large"
              disabled={!formik.dirty}
              type="submit"
            >
              Save Template
            </Button>
          </Grid>
          <Grid item xs={10} sm={1} md={1} lg={1} xl={1} />
        </Grid>
      </form>
    </Box>
  );
};

TemplateAttrForm.propTypes = {
  initialTemplateValues: PropTypes.object,
  setTemplateData: PropTypes.func,
  templateData: PropTypes.object,
  setHasSubmitted: PropTypes.func,
  dataEntryType: PropTypes.string,
  setDelete: PropTypes.func,
  identifiers: PropTypes.array,
};

export default TemplateAttrForm;

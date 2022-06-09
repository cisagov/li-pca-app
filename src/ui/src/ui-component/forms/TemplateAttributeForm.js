import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

//material-ui
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

//third party
import { useFormik } from "formik";
import * as yup from "yup";

const TemplateAttrForm = (props) => {
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
      props.setTemplateData(Object.assign(props.templateData, values));
      props.setHasSubmitted(true);
    },
  });
  return (
    <form id="template-attr-form" onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Typography variant="h4" gutterBottom component="div">
            Subject:
          </Typography>
        </Grid>
        <Grid item xs={11} sm={11} md={11} lg={10} xl={9}>
          <TextField
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
        <Grid item xs={11} sm={5} md={5} lg={5} xl={4}>
          <TextField
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
        <Grid item xs={11} sm={6} md={6} lg={5} xl={5}>
          <TextField
            fullWidth
            id="from_address"
            name="from_address"
            label="Sender *"
            value={formik.values.from_address}
            onChange={formik.handleChange}
            error={
              formik.touched.from_address && Boolean(formik.errors.from_address)
            }
            helperText={
              formik.touched.from_address && formik.errors.from_address
            }
          />
        </Grid>
        <Grid item xs={12} xl={11}>
          {formik.values.name} &#60;{formik.values.from_address}@domain.com&#62;
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Typography variant="h4" gutterBottom component="div">
            Recommendations:
          </Typography>
        </Grid>
        <Grid item xs={11} sm={5} md={5} lg={5} xl={4}>
          <TextField
            fullWidth
            id="title"
            name="title"
            label="Title *"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
        </Grid>
        <Grid item xs={11} sm={6} md={6} lg={5} xl={5}>
          <TextField
            select
            fullWidth
            label="Type"
            id="recommendation_type"
            name="recommendation_type"
            value={formik.values.recommendation_type}
            onChange={formik.handleChange}
            error={
              formik.touched.recommendation_type &&
              Boolean(formik.errors.recommendation_type)
            }
            helperText={
              formik.touched.recommendation_type &&
              formik.errors.recommendation_type
            }
          >
            <MenuItem value={"Red Flag"}>Red Flag</MenuItem>
            <MenuItem value={"Sophisticated"}>Sophisticated</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={11} sm={11} md={11} lg={10} xl={9}>
          <TextField
            fullWidth
            multiline
            minRows={3}
            id="recommendation_description"
            name="recommendation_description"
            label="Description"
            value={formik.values.recommendation_description}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid item xs={11} sm={11} md={11} lg={10} xl={9}>
          <TextField
            select
            fullWidth
            label="Sophisticated"
            id="sophisticated"
            name="sophisticated"
            value={formik.values.sophisticated}
            onChange={formik.handleChange}
            error={
              formik.touched.sophisticated &&
              Boolean(formik.errors.sophisticated)
            }
            helperText={
              formik.touched.sophisticated && formik.errors.sophisticated
            }
          >
            <MenuItem value={"Sophisticated 1"}>Value 1</MenuItem>
            <MenuItem value={"Sophisticated 2"}>Value 2</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={11} sm={11} md={11} lg={10} xl={9}>
          <TextField
            select
            fullWidth
            label="Red Flag"
            id="red_flag"
            name="red_flag"
            value={formik.values.red_flag}
            onChange={formik.handleChange}
            error={
              formik.touched.sophisticated &&
              Boolean(formik.errors.sophisticated)
            }
            helperText={
              formik.touched.sophisticated && formik.errors.sophisticated
            }
          >
            <MenuItem value={"Red Flag 1"}>Value 1</MenuItem>
            <MenuItem value={"Red Flag 2"}>Value 2</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Typography variant="h4" gutterBottom component="div">
            Subscription Config:
          </Typography>
        </Grid>
        <Grid item xs={11} sm={11} md={11} lg={10} xl={9}>
          <TextField
            select
            fullWidth
            label="Sending Profile Selection"
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
            <MenuItem value={"Sending Profile 1"}>Value 1</MenuItem>
            <MenuItem value={"Sending Profile 2"}>Value 2</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={11} sm={11} md={11} lg={10} xl={9}>
          <TextField
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
              formik.touched.landing_page_id && formik.errors.landing_page_id
            }
          >
            <MenuItem value={"Landing Page 1"}>Value 1</MenuItem>
            <MenuItem value={"Landing Page 2"}>Value 2</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={11} sm={5} md={5} lg={5} xl={5}>
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

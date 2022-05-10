import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

//material-ui
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Button from "@mui/material/Button";
import DatePicker from "@mui/lab/DatePicker";
import Grid from "@mui/material/Grid";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

// project imports
import ConfirmDialog from "ui-component/popups/ConfirmDialog";

//third party
import { useFormik } from "formik";
import * as yup from "yup";
import { format } from "date-fns";

const TemplateAttrForm = (props) => {
  const validationSchema = yup.object({
    name: yup
      .string()
      .required("Template Name is required")
      .min(2, "Please enter more than one character")
      .unique(props.identifiers, "Please enter a unique template name"),
    from_address: yup.string().required("From Address is required"),
  });
  let navigate = useNavigate();
  condy[(savebtnOpen, setSavebtnOpen)] = React.useState(false);
  const fieldsToValidate = {
    name: true,
    from_address: true,
    landing_page_id: false,
    sending_profile_id: false,
    sophisticated: false,
    red_flag: false,
    recommendation_title: false,
    recommendation_type: false,
    recommendation_description: false,
  };
  const formik = useFormik({
    initialValues: props.initialTemplateAttrValues,
    validationSchema: validationSchema,
    validateOnChange: true,
    onSubmit: (values) => {
      props.setTemplateAttrData(Object.assign(props.templateAttrData, values));
      props.setHasSubmitted(true);
      setTimeout(() => {
        setSavebtnOpen(false);
      });
    },
  });

  const handleCancel = () => {
    if (formik.dirty) {
      setCancelbtnOpen(true);
    } else {
      navigate("/li-pca-app/template");
    }
  };

  const isDisabled = () => {
    if (!props.hasContact) {
      return true;
    } else if (props.hasContact && (formik.dirty || props.contactUpdate)) {
      return false;
    }
    return true;
  };

  const handleSave = () => {
    formik.setTouched(fieldsToValidate);
    if (formik.isValid && props.hasContact) {
      setSavebtnOpen(true);
    }
  };

  return (
    <form id="template-attr-form" onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Typography variant="h4" gutterBottom component="div">
            Subject:
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <TextField
            fullWidth
            id="subject"
            name="subject"
            label="Subject *"
            value={formik.values.subject}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.subject)}
            helperText={formik.touched.name && formik.errors.subject}
          />
        </Grid>
        <br />
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Typography variant="h4" gutterBottom component="div">
            From Address:
          </Typography>
        </Grid>
        <Grid item xs={10} sm={3} md={3} lg={3} xl={6}>
          <TextField
            fullWidth
            id="display_name"
            name="display_name"
            label="Display Name*"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </Grid>
        <Grid item xs={10} sm={3} md={3} lg={3} xl={6}>
          <TextField
            fullWidth
            id="sender"
            name="sender"
            label="Sender*"
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
        <br />
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Typography variant="h4" gutterBottom component="div">
            Recommendations:
          </Typography>
        </Grid>
        <Grid item xs={10} sm={3} md={3} lg={3} xl={12}>
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
        <Grid item xs={10} sm={8} md={7} lg={7} xl={7}>
          <TextField
            select
            fullWidth
            label="Type *"
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
        <Grid item xs={10} sm={10} md={7} lg={7} xl={7}>
          <TextField
            fullWidth
            multiline
            minRows={6}
            id="recommendation_description"
            name="recommendation_description"
            label="Description *"
            value={formik.values.recommendation_description}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid item xs={10} sm={8} md={7} lg={7} xl={7}>
          <TextField
            select
            fullWidth
            label="Sophisticated *"
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
        <Grid item xs={10} sm={8} md={7} lg={7} xl={7}>
          <TextField
            select
            fullWidth
            label="Red Flag *"
            id="red_flag"
            name="red_flag"
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
            <MenuItem value={"Red Flag 1"}>Value 1</MenuItem>
            <MenuItem value={"Red Flag 2"}>Value 2</MenuItem>
          </TextField>
        </Grid>
        <br />
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Typography variant="h4" gutterBottom component="div">
            Subscription Config:
          </Typography>
        </Grid>
        <Grid item xs={10} sm={8} md={7} lg={7} xl={7}>
          <TextField
            select
            fullWidth
            label="Sending Profile Selection *"
            id="sending_profile"
            name="sending_profile"
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
        <Grid item xs={10} sm={8} md={7} lg={7} xl={7}>
          <TextField
            select
            fullWidth
            label="Landing Page Selection *"
            id="landing_page"
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
        <Grid item xs={10} sm={5} md={4} lg={3} xl={3}>
          <Button
            fullWidth
            color="info"
            variant="contained"
            size="large"
            disabled={isDisabled()}
            onClick={handleSave}
          >
            Save Template
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
            handleClick={() => navigate("/li-pca-app/templates")}
            isOpen={cancelbtnOpen}
            setIsOpen={setCancelbtnOpen}
          />
        </Grid>
      </Grid>
    </form>
  );
};

TemplateAttrForm.propTypes = {
  initialTemplateAttrValues: PropTypes.object,
  setTemplateAttrData: PropTypes.func,
  templateAttrData: PropTypes.object,
  setHasSubmitted: PropTypes.func,
  dataEntryType: PropTypes.string,
  setDelete: PropTypes.func,
  identifiers: PropTypes.array,
};

export default TemplateAttrForm;

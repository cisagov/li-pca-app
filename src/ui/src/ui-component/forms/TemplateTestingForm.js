import React from "react";

//material-ui
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

//third party
import { useFormik } from "formik";
import * as yup from "yup";

// TODO: Link up to sending_profiles and customers
const initialTemplateTestVals = {
  sending_profile: "",
  customer: "",
  email: "",
  first_name: "",
  last_name: "",
  role: "",
};

const TemplateTestingForm = () => {
  const validationSchema = yup.object({
    sending_profile: yup.string().required("Sending Profile is required"),
    customer: yup.string().required("Customer is required"),
    email: yup.string().required("Email is required"),
  });

  const formik = useFormik({
    initialValues: initialTemplateTestVals,
    validationSchema: validationSchema,
    validateOnChange: true,
    onSubmit: (values) => {
      // TODO: Link up to an email system
      console.log(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Typography variant="h4" gutterBottom component="div">
            Sending Profile:
          </Typography>
          <Typography variant="body2" gutterBottom component="div">
            Select the sending profile that will be used.
          </Typography>
        </Grid>
        <Grid item xs={11} sm={11} md={11} lg={10} xl={9}>
          <TextField
            select
            fullWidth
            label="Sending Profile"
            id="sending_profile"
            name="sending_profile"
            value={formik.values.sending_profile}
            onChange={formik.handleChange}
            error={
              formik.touched.sending_profile &&
              Boolean(formik.errors.sending_profile)
            }
            helperText={
              formik.touched.sending_profile && formik.errors.sending_profile
            }
          >
            <MenuItem value={"Sending Profile 1"}>Value 1</MenuItem>
            <MenuItem value={"Sending Profile 2"}>Value 2</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Typography variant="h4" gutterBottom component="div">
            Customer:
          </Typography>
          <Typography variant="body2" gutterBottom component="div">
            Select the customer that will be used in generating tags.
          </Typography>
        </Grid>
        <Grid item xs={11} sm={11} md={11} lg={10} xl={9}>
          <TextField
            select
            fullWidth
            label="Customer"
            id="customer"
            name="customer"
            value={formik.values.customer}
            onChange={formik.handleChange}
            error={formik.touched.customer && Boolean(formik.errors.customer)}
            helperText={formik.touched.customer && formik.errors.customer}
          >
            <MenuItem value={"Customer 1"}>Idaho Labs</MenuItem>
            <MenuItem value={"Customer 2"}>DHS CISA</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Typography variant="h4" gutterBottom component="div">
            Email:
          </Typography>
          <Typography variant="body2" gutterBottom component="div">
            Email to send to. Default sends to a mail tester.
          </Typography>
        </Grid>
        <Grid item xs={11} sm={11} md={11} lg={10} xl={9}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={10} xl={9}>
          <Typography variant="h4" gutterBottom component="div">
            Tags:
          </Typography>
          <Typography variant="body2" gutterBottom component="div">
            Enter other attributes used for tags.
          </Typography>
        </Grid>
        <Grid item xs={11} sm={5} md={5} lg={5} xl={4}>
          <TextField
            fullWidth
            id="first_name"
            name="first_name"
            label="First Name"
            value={formik.values.first_name}
            onChange={formik.handleChange}
            error={
              formik.touched.first_name && Boolean(formik.errors.first_name)
            }
            helperText={formik.touched.first_name && formik.errors.first_name}
          />
        </Grid>
        <Grid item xs={11} sm={6} md={6} lg={5} xl={5}>
          <TextField
            fullWidth
            id="last_name"
            name="last_name"
            label="Last Name"
            value={formik.values.last_name}
            onChange={formik.handleChange}
            error={formik.touched.last_name && Boolean(formik.errors.last_name)}
            helperText={formik.touched.last_name && formik.errors.last_name}
          />
        </Grid>
        <Grid item xs={11} sm={5} md={5} lg={5} xl={4}>
          <TextField
            fullWidth
            id="role"
            name="role"
            label="Role"
            value={formik.values.role}
            onChange={formik.handleChange}
            error={formik.touched.role && Boolean(formik.errors.role)}
            helperText={formik.touched.role && formik.errors.role}
          />
        </Grid>
        <Grid item xs={12} sm={7} md={7} lg={7} xl={8} />
        <Grid item xs={11} sm={5} md={5} lg={5} xl={5} sx={{ mt: 3 }}>
          <Button
            fullWidth
            color="info"
            variant="contained"
            size="large"
            disabled={!formik.dirty}
            type="submit"
          >
            Send Test Email
          </Button>
        </Grid>
        <Grid item xs={10} sm={1} md={1} lg={1} xl={1} />
        <Grid item xs={11} sm={11} md={11} lg={10} xl={9}>
          <TextField disabled fullWidth multiline minRows={3} label="" />
        </Grid>
      </Grid>
    </form>
  );
};

export default TemplateTestingForm;

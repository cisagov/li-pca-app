import PropTypes from "prop-types";

// material-ui
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

//third party
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  first_name: yup.string().required("First Name is required"),
  last_name: yup.string().required("Last Name is required"),
  email: yup.string().required("Email is required").email("Email is invalid"),
});

function CustomerPOCForm(props) {
  const formik = useFormik({
    initialValues: props.initialPOCValues,
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      const cF = [...props.custPOCData];
      const nextIndex = cF.length;
      cF[nextIndex] = {
        id: nextIndex,
        email: values.email,
        first_name: values.first_name,
        last_name: values.last_name,
        mobile_phone: values.mobile_phone,
        notes: values.notes,
        office_phone: values.office_phone,
        title: values.title,
      };
      props.setCustPOCData(cF);
      props.setHasContact(true);
      actions.resetForm();
      props.setToggleCard(!props.isToggleCardOn);
    },
  });
  return (
    <Card variant="outlined">
      <CardContent>
        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ ml: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} />
              <Grid item xs={10} sm={6} md={6} lg={6} xl={6}>
                <TextField
                  fullWidth
                  id="first_name"
                  name="first_name"
                  label="First Name *"
                  value={formik.values.first_name}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.first_name &&
                    Boolean(formik.errors.first_name)
                  }
                  helperText={
                    formik.touched.first_name && formik.errors.first_name
                  }
                />
              </Grid>
              <Grid item xs={10} sm={6} md={6} lg={6} xl={6}>
                <TextField
                  fullWidth
                  id="last_name"
                  name="last_name"
                  label="Last Name *"
                  value={formik.values.last_name}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.last_name && Boolean(formik.errors.last_name)
                  }
                  helperText={
                    formik.touched.last_name && formik.errors.last_name
                  }
                />
              </Grid>
              <Grid item xs={10} sm={4} md={4} lg={4} xl={4}>
                <TextField
                  fullWidth
                  id="title"
                  name="title"
                  label="Title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={10} sm={4} md={4} lg={4} xl={4}>
                <TextField
                  fullWidth
                  id="office_phone"
                  name="office_phone"
                  label="Office Phone"
                  value={formik.values.office_phone}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={10} sm={4} md={4} lg={4} xl={4}>
                <TextField
                  fullWidth
                  id="mobile_phone"
                  name="mobile_phone"
                  label="Mobile Phone"
                  value={formik.values.mobile_phone}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={10} sm={10} md={7} lg={7} xl={7}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email *"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={10} sm={10} md={7} lg={7} xl={7}>
                <TextField
                  fullWidth
                  multiline
                  minRows={2}
                  id="contact_notes"
                  name="contact_notes"
                  label="Contact Notes"
                  value={formik.values.contact_notes}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={2} sm={2} md={5} lg={5} xl={5}></Grid>
              <Grid item xs={10} sm={4} md={3} lg={2} xl={2}>
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  size="large"
                  fullWidth
                  endIcon={<AddIcon />}
                  disabled={!(formik.isValid && formik.dirty)}
                >
                  Add
                </Button>
              </Grid>
              <Grid item xs={10} sm={2} md={2} lg={2} xl={2}>
                <Button
                  color="primary"
                  size="large"
                  fullWidth
                  onClick={() => props.setToggleCard(!props.isToggleCardOn)}
                >
                  Close
                </Button>
              </Grid>
              <Grid item xs={2} sm={3} md={5} lg={6} xl={7}></Grid>
              <Grid
                item
                display={{ xs: "none", sm: "block" }}
                sm={3}
                md={2}
                lg={2}
                xl={1}
              >
                <Button size="large" fullWidth onClick={formik.handleReset}>
                  Reset
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
}

CustomerPOCForm.propTypes = {
  initialPOCValues: PropTypes.object,
  custPOCData: PropTypes.array,
  setCustPOCData: PropTypes.func,
  setHasContact: PropTypes.func,
  setToggleCard: PropTypes.func,
  isToggleCardOn: PropTypes.bool,
};

export default CustomerPOCForm;

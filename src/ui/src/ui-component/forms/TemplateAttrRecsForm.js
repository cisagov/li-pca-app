import { useState } from "react";
import PropTypes from "prop-types";

//material-ui
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

//third party
import { useFormik } from "formik";
import * as yup from "yup";

// project imports
import ResultDialog from "ui-component/popups/ResultDialog";

const TemplateAttrRecsForm = (props) => {
  const [toggleOn, setToggleOn] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const initialValues = {
    title: "",
    recommendation_type: "",
    recommendation_description: "",
  };
  const validationSchema = yup.object({
    title: yup.string().required("Title is required"),
    recommendation_type: yup.string().required("Type is required"),
  });
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    validateOnChange: true,
    onSubmit: (values) => {
      if (values.recommendation_type == "Red Flag") {
        props.setRFArray([...props.redFlagArray, values]);
      }
      if (values.recommendation_type == "Sophisticated") {
        props.setSophArray([...props.sophisticatedArray, values]);
      }
      setHasSubmitted(true);
    },
  });
  const isDisabled = () => {
    if (formik.dirty) {
      return false;
    }
    return true;
  };
  const closeDialog = () => {
    setHasSubmitted(false);
    setToggleOn(false);
    formik.setTouched({});
    formik.setValues(initialValues);
  };
  return (
    <form id="template-attr-recs-form" onSubmit={formik.handleSubmit}>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {!toggleOn ? (
          <>
            <Grid item xs={12} sm={7} md={6} lg={6} xl={4}>
              <Button
                color="warning"
                variant="contained"
                size="large"
                fullWidth
                onClick={() => setToggleOn(!toggleOn)}
              >
                Add New Recommendation
              </Button>
            </Grid>
            <Grid item xs={12} sm={4} md={6} lg={6} xl={8} />
          </>
        ) : (
          <Grid item xs={12} sm={12} md={11} lg={10} xl={9}>
            <Card variant="outlined">
              <CardContent>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={12} lg={12} xl={12} sx={{ mb: 1 }}>
                    <Typography sx={{ fontSize: 14, fontWeight: "bold" }}>
                      New Recommendation
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <TextField
                      size="small"
                      select
                      fullWidth
                      label="Recommendation Type"
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
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <TextField
                      size="small"
                      fullWidth
                      id="title"
                      name="title"
                      label="Title *"
                      value={formik.values.title}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.title && Boolean(formik.errors.title)
                      }
                      helperText={formik.touched.title && formik.errors.title}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <TextField
                      size="small"
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
                  <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                    <Button
                      color="warning"
                      variant="contained"
                      size="large"
                      fullWidth
                      onClick={() => {
                        formik.setValues(initialValues);
                        formik.setTouched({});
                        setToggleOn(!toggleOn);
                      }}
                    >
                      Close
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                    <Button
                      size="large"
                      fullWidth
                      onClick={() => {
                        formik.setTouched({});
                        formik.setValues(initialValues);
                      }}
                    >
                      Reset
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                    <Button
                      color="primary"
                      variant="contained"
                      type="submit"
                      size="large"
                      fullWidth
                      disabled={isDisabled()}
                    >
                      Save
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <ResultDialog
              type="New Recommendation"
              hasSubmitted={hasSubmitted}
              getDelete={false}
              error={[]}
              closeDialog={closeDialog}
            />
          </Grid>
        )}
      </Grid>
    </form>
  );
};

TemplateAttrRecsForm.propTypes = {
  setRFArray: PropTypes.func,
  setSophArray: PropTypes.func,
  redFlagArray: PropTypes.array,
  sophisticatedArray: PropTypes.array,
};

export default TemplateAttrRecsForm;

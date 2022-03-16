// import React from "react";
// import ReactDOM from 'react-dom';
// import { useFormik } from 'formik';
// import * as yup from "yup";
// material-ui
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

export default function CustomerPOCForm() {
  return (
    // <form onSubmit={formik.handleSubmit}>
    <div>
      <CardContent>
        <FormControl>
          <Box sx={{ ml: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} />
              <Grid item xs={10} sm={6} md={6} lg={6} xl={6}>
                <TextField
                  fullWidth
                  required
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  // onChange={formik.handleChange}
                  // value={values.firstName}
                />
              </Grid>
              <Grid item xs={10} sm={6} md={6} lg={6} xl={6}>
                <TextField
                  fullWidth
                  required
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  // onChange={formik.handleChange}
                  // value={values.lastName}
                />
              </Grid>
              <Grid item xs={10} sm={4} md={4} lg={4} xl={4}>
                <TextField
                  fullWidth
                  id="title"
                  name="title"
                  label="Title"
                  // onChange={formik.handleChange}
                  // value={values.title}
                />
              </Grid>
              <Grid item xs={10} sm={4} md={4} lg={4} xl={4}>
                <TextField
                  fullWidth
                  id="officePhone"
                  name="officePhone"
                  label="Office Phone"
                  // onChange={formik.handleChange}
                  // value={values.officePhone}
                />
              </Grid>
              <Grid item xs={10} sm={4} md={4} lg={4} xl={4}>
                <TextField
                  fullWidth
                  id="mobilePhone"
                  name="mobilePhone"
                  label="Mobile Phone"
                  // onChange={formik.handleChange}
                  // value={values.mobilePhone}
                />
              </Grid>
              <Grid item xs={10} sm={10} md={7} lg={7} xl={7}>
                <TextField
                  fullWidth
                  required
                  id="email"
                  name="email"
                  label="Email"
                  // onChange={formik.handleChange}
                  // value={values.email}
                />
              </Grid>
              <Grid item xs={10} sm={10} md={7} lg={7} xl={7}>
                <TextField
                  fullWidth
                  multiline
                  minRows={2}
                  id="contactNotes"
                  name="contactNotes"
                  label="Contact Notes"
                  // onChange={formik.handleChange}
                  // value={values.contactNotes}
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
                >
                  Add
                </Button>
              </Grid>
              <Grid item xs={10} sm={2} md={2} lg={2} xl={2}>
                <Button color="primary" type="submit" size="large" fullWidth>
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
                <Button size="large" fullWidth>
                  Clear
                </Button>
              </Grid>
            </Grid>
          </Box>
        </FormControl>
      </CardContent>
    </div>
  );
}

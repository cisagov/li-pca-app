// material-ui
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

export default function CustomerPOCForm(props) {
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
                  value={props.custForm.contact_list.firstName}
                  onChange={(e) => {
                    const cF = { ...props.custForm };
                    cF.contact_list.firstName = e.target.value;
                    props.setCustform(cF);
                  }}
                />
              </Grid>
              <Grid item xs={10} sm={6} md={6} lg={6} xl={6}>
                <TextField
                  fullWidth
                  required
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  value={props.custForm.contact_list.lastName}
                  onChange={(e) => {
                    const cF = { ...props.custForm };
                    cF.contact_list.lastName = e.target.value;
                    props.setCustform(cF);
                  }}
                />
              </Grid>
              <Grid item xs={10} sm={4} md={4} lg={4} xl={4}>
                <TextField
                  fullWidth
                  id="title"
                  name="title"
                  label="Title"
                  value={props.custForm.contact_list.title}
                  onChange={(e) => {
                    const cF = { ...props.custForm };
                    cF.contact_list.title = e.target.value;
                    props.setCustform(cF);
                  }}
                />
              </Grid>
              <Grid item xs={10} sm={4} md={4} lg={4} xl={4}>
                <TextField
                  fullWidth
                  id="officePhone"
                  name="officePhone"
                  label="Office Phone"
                  value={props.custForm.contact_list.officePhone}
                  onChange={(e) => {
                    const cF = { ...props.custForm };
                    cF.contact_list.officePhone = e.target.value;
                    props.setCustform(cF);
                  }}
                />
              </Grid>
              <Grid item xs={10} sm={4} md={4} lg={4} xl={4}>
                <TextField
                  fullWidth
                  id="mobilePhone"
                  name="mobilePhone"
                  label="Mobile Phone"
                  value={props.custForm.contact_list.mobilePhone}
                  onChange={(e) => {
                    const cF = { ...props.custForm };
                    cF.contact_list.mobilePhone = e.target.value;
                    props.setCustform(cF);
                  }}
                />
              </Grid>
              <Grid item xs={10} sm={10} md={7} lg={7} xl={7}>
                <TextField
                  fullWidth
                  required
                  id="email"
                  name="email"
                  label="Email"
                  value={props.custForm.contact_list.email}
                  onChange={(e) => {
                    const cF = { ...props.custForm };
                    cF.contact_list.email = e.target.value;
                    props.setCustform(cF);
                  }}
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
                  value={props.custForm.contact_list.contactNotes}
                  onChange={(e) => {
                    const cF = { ...props.custForm };
                    cF.contact_list.contactNotes = e.target.value;
                    props.setCustform(cF);
                  }}
                />
              </Grid>
              <Grid item xs={2} sm={2} md={5} lg={5} xl={5}></Grid>
              <Grid item xs={10} sm={4} md={3} lg={2} xl={2}>
                <Button
                  disabled
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
                <Button
                  color="primary"
                  size="large"
                  fullWidth
                  onClick={() => props.setToggle(!props.isToggleOn)}
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
                <Button
                  size="large"
                  fullWidth
                  onClick={() => {
                    const cF = { ...props.custForm };
                    cF.contact_list = {
                      firstName: "",
                      lastName: "",
                      title: "",
                      officePhone: "",
                      mobilePhone: "",
                      email: "",
                      contactNotes: "",
                    };
                    props.setCustform(cF);
                  }}
                >
                  Reset
                </Button>
              </Grid>
            </Grid>
          </Box>
        </FormControl>
      </CardContent>
    </div>
  );
}

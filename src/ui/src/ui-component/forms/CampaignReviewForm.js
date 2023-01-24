import PropTypes from "prop-types";

// material-ui
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const CampaignReviewForm = (props) => {
  const poc_placeholder = props.formik.values.customer_poc_placeholder;
  const sd_id = props.formik.values.sending_domain_id;
  const lp_id = props.formik.values.landing_page_id;
  const c_id = props.formik.values.customer_id;
  const t_id = props.formik.values.target_template_uuid;
  const domains = props.domains;
  const landingPages = props.landingPages;
  const customers = props.customers;
  const templates = props.templates;
  let sending_domain_name = " ";
  let landing_page_name = " ";
  let customer_name = " ";
  let template_name = " ";
  let poc_obj = { first_name: " ", last_name: " ", email: " " };
  let customer_poc = " ";
  if (poc_placeholder != undefined && poc_placeholder != "") {
    poc_obj = JSON.parse(props.formik.values.customer_poc_placeholder);
    customer_poc = poc_obj.first_name + " " + poc_obj.last_name;
  }
  let start_datetime = props.formik.values.start_datetime;
  let end_datetime = props.formik.values.end_datetime;
  if (start_datetime == "1970-01-01T00:00:00+00:00") {
    start_datetime = " ";
  }
  if (end_datetime == "1970-01-01T00:00:00+00:00") {
    end_datetime = " ";
  }
  if (sd_id && !domains.getError[0] && domains.getData.length != 0) {
    let entry = props.domains.getData.find((d) => d._id == sd_id);
    sending_domain_name = entry.name;
  }
  if (lp_id && !landingPages.getError[0] && landingPages.getData.length != 0) {
    let entry = props.landingPages.getData.find((l) => l._id == lp_id);
    landing_page_name = entry.name;
  }
  if (c_id && !customers.getError[0] && customers.getData.length != 0) {
    let entry = props.customers.getData.find((c) => c._id == c_id);
    customer_name = entry.name;
  }
  if (t_id && !templates.getError[0] && templates.getData.length != 0) {
    let entry = props.templates.getData.find((t) => t._id == t_id);
    template_name = entry.name;
  }
  return (
    <>
      <Divider color="gray" sx={{ height: 2 }} />
      <Grid container spacing={2} sx={{ mt: 1, mb: 3 }}>
        <Grid item xs={12} sm={3} md={3} lg={3} xl={4}>
          <Typography variant="h5" gutterBottom component="div">
            Campaign Name
          </Typography>
        </Grid>
        <Grid item xs={12} sm={9} md={9} lg={9} xl={8}>
          <TextField
            size="small"
            fullWidth
            id="name"
            name="name"
            label="Campaign Name"
            disabled
            value={props.formik.values.name}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={3} lg={3} xl={4}>
          <Typography variant="h5" gutterBottom component="div">
            Admin Email
          </Typography>
        </Grid>
        <Grid item xs={12} sm={9} md={9} lg={9} xl={8}>
          <TextField
            size="small"
            fullWidth
            id="admin_email"
            name="admin_email"
            label="Admin Email"
            disabled
            value={props.formik.values.admin_email}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={3} lg={3} xl={4}>
          <Typography variant="h5" gutterBottom component="div">
            Operator Email
          </Typography>
        </Grid>
        <Grid item xs={12} sm={9} md={9} lg={9} xl={8}>
          <TextField
            size="small"
            fullWidth
            id="operator_email"
            name="operator_email"
            label="Operator Email"
            disabled
            value={props.formik.values.operator_email}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={3} lg={3} xl={4}>
          <Typography variant="h5" gutterBottom component="div">
            Sending Domain
          </Typography>
        </Grid>
        <Grid item xs={12} sm={9} md={9} lg={9} xl={8}>
          <TextField
            size="small"
            fullWidth
            id="sending_domain_name"
            name="sending_domain_name"
            label="Sending Domain"
            disabled
            value={sending_domain_name}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={3} lg={3} xl={4}>
          <Typography variant="h5" gutterBottom component="div">
            Landing Page
          </Typography>
        </Grid>
        <Grid item xs={12} sm={9} md={9} lg={9} xl={8}>
          <TextField
            size="small"
            fullWidth
            id="landing_page_name"
            name="landing_page_name"
            label="Landing Page"
            disabled
            value={landing_page_name}
          />
        </Grid>
      </Grid>
      <Divider color="gray" sx={{ height: 2 }} />
      <Grid container spacing={2} sx={{ mt: 1, mb: 3 }}>
        <Grid item xs={12} sm={3} md={3} lg={3} xl={4}>
          <Typography variant="h5" gutterBottom component="div">
            Customer
          </Typography>
        </Grid>
        <Grid item xs={12} sm={9} md={9} lg={9} xl={8}>
          <TextField
            size="small"
            fullWidth
            id="customer_name"
            name="customer_name"
            label="Customer"
            disabled
            value={customer_name}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={3} lg={3} xl={4}>
          <Typography variant="h5" gutterBottom component="div">
            Primary Point of Contact
          </Typography>
        </Grid>
        <Grid item xs={12} sm={9} md={9} lg={9} xl={8}>
          <TextField
            size="small"
            fullWidth
            id="poc_name"
            name="poc_name"
            label="Point of Contact"
            disabled
            value={customer_poc}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={3} lg={3} xl={4}>
          <Typography variant="h5" gutterBottom component="div">
            Target Domains
          </Typography>
        </Grid>
        <Grid item xs={12} sm={9} md={9} lg={9} xl={8}>
          <TextField
            size="small"
            fullWidth
            id="target_domains"
            name="target_domains"
            label="Target Domains"
            disabled
            value={props.formik.values.target_email_domains}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={3} lg={3} xl={4}>
          <Typography variant="h5" gutterBottom component="div">
            Target Emails
          </Typography>
        </Grid>
        <Grid item xs={12} sm={9} md={9} lg={9} xl={8}>
          <TextField
            size="small"
            fullWidth
            id="target_emails"
            name="target_emails"
            label="Target Emails"
            disabled
            value={props.formik.values.target_emails}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={3} lg={3} xl={4}>
          <Typography variant="h5" gutterBottom component="div">
            Template Name
          </Typography>
        </Grid>
        <Grid item xs={12} sm={9} md={9} lg={9} xl={8}>
          <TextField
            size="small"
            fullWidth
            id="template_name"
            name="template_name"
            label="Template ID"
            disabled
            value={template_name}
          />
        </Grid>
      </Grid>
      <Divider color="gray" sx={{ height: 2 }} />
      <Grid container spacing={2} sx={{ mt: 1, mb: 3 }}>
        <Grid item xs={12} sm={3} md={3} lg={3} xl={4}>
          <Typography variant="h5" gutterBottom component="div">
            Start Date and Time
          </Typography>
        </Grid>
        <Grid item xs={12} sm={9} md={9} lg={9} xl={8}>
          <TextField
            size="small"
            fullWidth
            id="start_datetime"
            name="start_datetime"
            label="Start Date and Time"
            disabled
            value={start_datetime}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={3} lg={3} xl={4}>
          <Typography variant="h5" gutterBottom component="div">
            End Date and Time
          </Typography>
        </Grid>
        <Grid item xs={12} sm={9} md={9} lg={9} xl={8}>
          <TextField
            size="small"
            fullWidth
            id="end_datetime"
            name="end_datetime"
            label="End Date and Time"
            disabled
            value={end_datetime}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={3} lg={3} xl={4}>
          <Typography variant="h5" gutterBottom component="div">
            Time Zone
          </Typography>
        </Grid>
        <Grid item xs={12} sm={9} md={9} lg={9} xl={8}>
          <TextField
            size="small"
            fullWidth
            id="time_zone"
            name="time_zone"
            label="Time Zone"
            disabled
            value={props.formik.values.time_zone}
          />
        </Grid>
      </Grid>
      <Divider color="gray" sx={{ height: 2 }} />
      <Grid container spacing={2} sx={{ mt: 1, mb: 1 }}>
        <Grid item xs={12} sm={3} md={3} lg={3} xl={4}>
          <Typography variant="h5" gutterBottom component="div">
            Test Email Recipients
          </Typography>
        </Grid>
        <Grid item xs={12} sm={9} md={9} lg={9} xl={8}>
          <FormLabel sx={{ mt: 1, mb: 1 }}>
            The recipients below will recieve a test email when Send Test Email
            is clicked.
          </FormLabel>
          <FormGroup onChange={(e) => console.log(e.target.checked)}>
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  value="admin_email"
                  defaultChecked
                  // checked={}
                />
              }
              label={props.formik.values.admin_email}
            />
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  value="operator_email"
                  defaultChecked
                  // checked={}
                />
              }
              label={props.formik.values.operator_email}
            />
            {poc_placeholder == undefined || poc_placeholder == "" ? (
              <></>
            ) : (
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    value="customer_poc_email"
                    // checked={}
                  />
                }
                label={poc_obj.email}
              />
            )}
          </FormGroup>
          <Typography variant="caption" sx={{ mt: 1, mb: 1 }} component="div">
            Additional recipients may be provided here in a comma separated
            list. Format: name@domain.com, name@domain.com
          </Typography>
          <TextField
            size="small"
            fullWidth
            id="additional_recipients"
            name="additional_recipients"
            label="Additional Email Addresses"
            multiline
            minRows={2}
            // value=""
          />
        </Grid>
        <Grid item xs={12} sm={3} md={3} lg={3} xl={4} />
        <Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
          <Button
            fullWidth
            variant="contained"
            size="small"
            color="warning"
            endIcon={<SendIcon />}
            // onClick={() => setDeletebtnOpen(true)}
          >
            Send Test Email
          </Button>
        </Grid>
        <Grid item xs={12} sm={3} md={3} lg={3} xl={4} />
      </Grid>
    </>
  );
};

CampaignReviewForm.propTypes = {
  formik: PropTypes.object,
  customers: PropTypes.object,
  domains: PropTypes.object,
  landingPages: PropTypes.object,
  templates: PropTypes.object,
};

export default CampaignReviewForm;

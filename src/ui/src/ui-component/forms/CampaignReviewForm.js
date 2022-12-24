import PropTypes from "prop-types";

// material-ui
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const CampaignReviewForm = (props) => {
  const sending_domain_id = props.formik.values.sending_domain_id;
  const landing_pg_id = props.formik.values.landing_page_id;
  const customer_id = props.formik.values.customer_id;
  const template_id = props.formik.values.target_template_uuid;
  let sending_domain_name = "";
  let landing_page_name = "";
  let customer_name = "";
  let template_name = "";
  if (sending_domain_id && !props.domains.getError[0]) {
    let entry = props.domains.getData.find((d) => d._id == sending_domain_id);
    sending_domain_name = entry.name;
  }
  if (landing_pg_id && !props.landingPages.getError[0]) {
    let entry = props.landingPages.getData.find((l) => l._id == landing_pg_id);
    landing_page_name = entry.name;
  }
  if (customer_id && !props.customers.getError[0]) {
    let entry = props.customers.getData.find((c) => c._id == customer_id);
    customer_name = entry.name;
  }
  if (template_id && !props.templates.getError[0]) {
    let entry = props.templates.getData.find((t) => t._id == template_id);
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
            value={props.formik.values.customer_poc}
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
            // value={props.formik.values.target_email_domains}
            value="@domain.com"
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
            value={props.formik.values.start_datetime}
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
            value={props.formik.values.end_datetime}
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
        <Grid item></Grid>
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

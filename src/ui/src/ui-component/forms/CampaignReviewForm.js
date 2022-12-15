// material-ui
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const CampaignReviewForm = () => {
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
            value="Campaign Name"
            // value={props.formik.values.name}
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
            value="Admin email"
            // value={props.formik.values.admin_email}
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
            value="Operator Email"
            // value={props.formik.values.operator_email}
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
            id="domain"
            name="domain"
            label="Sending Domain"
            disabled
            value="Sending Domain"
            // value={props.formik.values.domain}
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
            id="landing_page_id"
            name="landing_page_id"
            label="Landing Page Selection"
            disabled
            value="Landing Page"
            // value={props.formik.values.landing_page_id}
          />
        </Grid>
      </Grid>
      <Divider color="gray" sx={{ height: 2 }} />
      <Grid container spacing={2} sx={{ mt: 1, mb: 3 }}>
        <Grid item xs={12} sm={3} md={3} lg={3} xl={4}>
          <Typography variant="h5" gutterBottom component="div">
            Customer Name
          </Typography>
        </Grid>
        <Grid item xs={12} sm={9} md={9} lg={9} xl={8}>
          <TextField
            size="small"
            fullWidth
            id="customer_name"
            name="customer_name"
            label="Customer Name"
            disabled
            value="Customer Name"
            // value={props.formik.values.customer_name}
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
            label="Point of Contact Name"
            disabled
            value="Point of Contact Name"
            // value={props.formik.values.poc_name}
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
            value="Target Domains"
            // value={props.formik.values.target_domains}
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
            value="Target Emails"
            // value={props.formik.values.target_emails}
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
            label="Template Name"
            disabled
            value="Template Name"
            // value={props.formik.values.template_name}
          />
        </Grid>
      </Grid>
      <Divider color="gray" sx={{ height: 2 }} />
      <Grid container spacing={2} sx={{ mt: 1, mb: 3 }}>
        <Grid item xs={12} sm={3} md={3} lg={3} xl={4}>
          <Typography variant="h5" gutterBottom component="div">
            Schedule (Between Days)
          </Typography>
        </Grid>
        <Grid item xs={12} sm={9} md={9} lg={9} xl={8}>
          <TextField
            size="small"
            fullWidth
            id="date_scheduled"
            name="date_scheduled"
            label="Date Scheduled"
            disabled
            value="2/12/2023 - 2/12/2023"
            // value={props.formik.values.template_name}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={3} lg={3} xl={4}>
          <Typography variant="h5" gutterBottom component="div">
            Schedule (Between Times)
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={4} xl={3.5}>
          <TextField
            size="small"
            fullWidth
            id="time_start"
            name="time_start"
            label="Time Start"
            disabled
            value="09:00 AM"
            // value={props.formik.values.time_start}
          />
        </Grid>
        <Grid item xs={12} sm={1} md={1} lg={1} xl={1}>
          <Box justifyContent="center" display="flex" sx={{ mt: 1 }}>
            <Typography variant="h5" gutterBottom component="div">
              To
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={4} xl={3.5}>
          <TextField
            size="small"
            fullWidth
            id="time_end"
            name="time_end"
            label="Time End"
            disabled
            value="05:00 PM"
            // value={props.formik.values.time_end}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={3} lg={3} xl={4}>
          <Typography variant="h5" gutterBottom component="div">
            Schedule (Time Zone)
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
            value="Time Zone"
            // value={props.formik.values.time_zone}
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

// CampaignReviewForm.propTypes = {
//   formik: PropTypes.object,
// };

export default CampaignReviewForm;

import { useState } from "react";
import PropTypes from "prop-types";

// material-ui
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import UploadIcon from "@mui/icons-material/Upload";

// project imports
import AdvancedSimpleDataTable from "ui-component/tables/AdvancedSimpleDataTable";

const cols = [
  { field: "id", hide: true },
  { field: "name", headerName: "Name", midWidth: 500, flex: 1.5 },
  { field: "identifier", headerName: "Identifier", midWidth: 100, flex: 0.5 },
  {
    field: "address_1",
    headerName: "Address 1",
    midWidth: 200,
    flex: 1,
  },
  {
    field: "address_2",
    headerName: "Address 2",
    midWidth: 100,
    flex: 0.5,
  },
  {
    field: "city",
    headerName: "City",
    midWidth: 150,
    flex: 1,
  },
  {
    field: "state",
    headerName: "State",
    midWidth: 100,
    flex: 0.75,
  },
  {
    field: "zip",
    headerName: "Zip",
    midWidth: 100,
    flex: 0.5,
  },
];

const CustomerDisplay = (props) => {
  let formik = props.formik;
  let customer_id = formik.values.customer_id;
  const customers = props.customers;
  const [tableDisplayed, showTableDisplay] = useState(false);
  const handleRowClick = (params) => {
    showTableDisplay(false);
    formik.setFieldValue("customer_id", params.row._id);
    formik.setFieldValue("customer_poc", "");
  };
  const cancelCusSelect = () => {
    showTableDisplay(false);
  };
  const customerTableDisplay = (
    <>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Typography variant="caption" sx={{ mb: 0.5 }} component="div">
          Select a customer by clicking on a row.
        </Typography>
        <AdvancedSimpleDataTable
          data={{ rows: customers.getData, columns: cols }}
          handleRowClick={handleRowClick}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
        <Button variant="contained" fullWidth onClick={cancelCusSelect}>
          Cancel
        </Button>
      </Grid>
    </>
  );
  const selectButton = (
    <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
      <Button
        variant="contained"
        fullWidth
        onClick={() => showTableDisplay(true)}
      >
        Select Customer
      </Button>
    </Grid>
  );
  if (customers.getError[0]) {
    return <>Error loading customer data from the database.</>;
  } else if (customers.getData.length == 0) {
    return (
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Alert severity="error">
          No customers found. Go to "Customers" in the Main Menu to add
          customers.
        </Alert>
      </Grid>
    );
  } else if (!customer_id) {
    if (!tableDisplayed) {
      return selectButton;
    }
    return customerTableDisplay;
  } else if (customer_id) {
    const selectedRow = customers.getData.find(
      (customer) => customer._id == customer_id
    );
    if (typeof selectedRow == "undefined") {
      props.formik.values.customer_id = "";
      customer_id = "";
      return null;
    }
    const selectedCustomerDisplay = (
      <>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Card variant="outlined" style={{ backgroundColor: "#fafafa" }}>
            <CardContent sx={{ m: -1.5 }}>
              <Typography variant="h5" color="#8a8a8a">
                {selectedRow.name} ({selectedRow.identifier})
              </Typography>
              <Typography color="#8a8a8a">
                {selectedRow.address_1} {selectedRow.address_2}
                <br />
                {selectedRow.city}, {selectedRow.state}
                {" " + selectedRow.zip_code}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <TextField
            size="small"
            select
            fullWidth
            id="customer_poc"
            name="customer_poc"
            label="Primary Point of Contact"
            defaultValue={""}
            value={formik.values.customer_poc}
            onChange={formik.handleChange}
            error={
              formik.touched.customer_poc && Boolean(formik.errors.customer_poc)
            }
            helperText={
              formik.touched.customer_poc && formik.errors.customer_poc
            }
          >
            {selectedRow.contact_list.map((entry, index) => {
              let name = entry.first_name + " " + entry.last_name;
              return (
                <MenuItem key={index} value={name}>
                  {name}
                </MenuItem>
              );
            })}
          </TextField>
        </Grid>
      </>
    );
    if (!tableDisplayed) {
      return (
        <>
          {selectedCustomerDisplay}
          <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => showTableDisplay(true)}
            >
              Re-select Customer
            </Button>
          </Grid>
        </>
      );
    }
    return (
      <>
        {selectedCustomerDisplay}
        {customerTableDisplay}
      </>
    );
  }
};

CustomerDisplay.propTypes = {
  formik: PropTypes.object,
  customers: PropTypes.object,
};

const CampaignInitialForm = (props) => {
  const domains = props.domains;
  const landingPages = props.landingPages;
  let formik = props.formik;
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      let fileReader = new FileReader();
      fileReader.readAsText(file);
      fileReader.onload = function () {
        formik.setFieldValue("target_emails", fileReader.result);
      };
      fileReader.onerror = function () {
        console.log(fileReader.error);
      };
    }
  };
  const handleDuplicates = () => {
    const target_emails = formik.values.target_emails;
    const newLineExpression = /\r\n|\n\r|\n|\r/g;
    const new_te = target_emails
      .split(newLineExpression)
      .filter((item, index, array) => array.indexOf(item) === index)
      .join("\n");
    formik.setFieldValue("target_emails", new_te);
  };
  if (!domains.getData.some((e) => e._id === formik.values.sending_domain_id)) {
    formik.values.sending_domain_id = "";
  }
  if (
    !landingPages.getData.some((e) => e._id === formik.values.landing_page_id)
  ) {
    formik.values.landing_page_id = "";
  }
  return (
    <>
      <Divider color="gray" sx={{ height: 2 }} />
      <Grid container spacing={2} sx={{ mt: 0.1, mb: 2.5 }}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Typography color="black" fontSize={18} component="div">
            <Box sx={{ fontWeight: "regular" }}>Campaign Assignment</Box>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h5" gutterBottom component="div">
              Specify the Campaign Name
            </Typography>
          </Box>
          <TextField
            size="small"
            fullWidth
            id="name"
            name="name"
            label="Campaign Name"
            placeholder="Enter a unique campaign name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h5" gutterBottom component="div">
              Select the Sending Domain
            </Typography>
          </Box>
          {domains.getError[0] ? (
            <Alert severity="error">
              Error loading domain data from the database.
            </Alert>
          ) : domains.getData.length == 0 ? (
            <Alert severity="error">
              No domains found. Go to "Sending Domains" in the Main Menu to add
              them.
            </Alert>
          ) : (
            <TextField
              size="small"
              select
              fullWidth
              label="Sending Domain Selection"
              id="sending_domain_id"
              name="sending_domain_id"
              value={formik.values.sending_domain_id}
              onChange={formik.handleChange}
              error={
                formik.touched.sending_domain_id &&
                Boolean(formik.errors.sending_domain_id)
              }
              helperText={
                formik.touched.sending_domain_id &&
                formik.errors.sending_domain_id
              }
            >
              {domains.getData.map((entry) => {
                return (
                  <MenuItem key={entry._id} value={entry._id}>
                    {entry.name}
                  </MenuItem>
                );
              })}
            </TextField>
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h5" gutterBottom component="div">
              Assign the Administrator
            </Typography>
          </Box>
          <TextField
            size="small"
            fullWidth
            id="admin_email"
            name="admin_email"
            label="Admin Email"
            value={formik.values.admin_email}
            onChange={formik.handleChange}
            error={
              formik.touched.admin_email && Boolean(formik.errors.admin_email)
            }
            helperText={formik.touched.admin_email && formik.errors.admin_email}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h5" gutterBottom component="div">
              Assign the Operator
            </Typography>
          </Box>
          <TextField
            size="small"
            fullWidth
            id="operator_email"
            name="operator_email"
            label="Operator Email"
            value={formik.values.operator_email}
            onChange={formik.handleChange}
            error={
              formik.touched.operator_email &&
              Boolean(formik.errors.operator_email)
            }
            helperText={
              formik.touched.operator_email && formik.errors.operator_email
            }
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Typography variant="h5" gutterBottom component="div">
            Select the Landing Page
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          {landingPages.getError[0] ? (
            <Alert severity="error" sx={{ mt: -1 }}>
              Error loading landing pages from the database.
            </Alert>
          ) : landingPages.getData.length == 0 ? (
            <Alert severity="error" sx={{ mt: -1 }}>
              No landing pages found. Go to "Landing Pages" in the Main Menu to
              add them.
            </Alert>
          ) : (
            <TextField
              sx={{ mt: -1 }}
              size="small"
              fullWidth
              id="landing_page_id"
              name="landing_page_id"
              label="Landing Page Selection"
              select
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
              {landingPages.getData.map((entry) => {
                return (
                  <MenuItem key={entry._id} value={entry._id}>
                    {entry.name}
                  </MenuItem>
                );
              })}
            </TextField>
          )}
          <Typography variant="caption" sx={{ mt: 1 }} component="div">
            If a customer hosted landing page is requested, an optional url can
            be provided to redirect clicks after our server is hit for click
            tracking.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <TextField
            sx={{ mt: -1 }}
            size="small"
            fullWidth
            id="landing_page_url"
            name="landing_page_url"
            label="Landing Page URL"
            value={formik.values.landing_page_url}
            onChange={formik.handleChange}
            error={
              formik.touched.landing_page_url &&
              Boolean(formik.errors.landing_page_url)
            }
            helperText={
              formik.touched.landing_page_url && formik.errors.landing_page_url
            }
          />
          <Typography variant="caption" sx={{ mt: 1 }} component="div">
            Optional link to an external landing page. <br />
            (e.g., https://internal.example.org/)
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ mb: -1 }}>
          <Typography variant="h5" gutterBottom component="div">
            Assign the Customer
          </Typography>
        </Grid>
        <CustomerDisplay formik={formik} customers={props.customers} />
        <Grid item sx={{ mb: 2 }} />
      </Grid>
      <Divider color="gray" sx={{ height: 2 }} />
      <Grid container spacing={2} sx={{ mt: 0.1 }}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Typography fontSize={18} color="black" component="div">
            <Box sx={{ fontWeight: "regular" }}>Target Email Selection</Box>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ mb: -1 }}>
          <Typography variant="h5" gutterBottom component="div">
            Target Email Domain
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <TextField
            size="small"
            multiline
            minRows={1}
            fullWidth
            id="target_email_domains"
            name="target_email_domains"
            label="Target Email Domains"
            onChange={formik.handleChange}
            error={
              formik.touched.target_email_domains &&
              Boolean(formik.errors.target_email_domains)
            }
            helperText={
              formik.touched.target_email_domains &&
              formik.errors.target_email_domains
            }
          />
          <Typography variant="caption" sx={{ mt: 1 }} component="div">
            Specify the domains that the target emails can be under. Provide a
            list of domains separated by commas. <br />
            Format: @domainOne.com, @domainTwo.com, @domainThree.com
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ mb: -1 }}>
          <Typography variant="h5" gutterBottom component="div">
            Target Recipients
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
          <Button
            component="label"
            variant="contained"
            fullWidth
            endIcon={<UploadIcon />}
          >
            <input
              type="file"
              accept=".csv, text/plain"
              hidden
              onChange={handleFileUpload}
            />
            Upload Email Targets
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
          <Button variant="contained" fullWidth onClick={handleDuplicates}>
            Remove Duplicate Emails
          </Button>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <TextField
            size="small"
            multiline
            minRows={2}
            fullWidth
            value={formik.values.target_emails}
            id="target_emails"
            name="target_emails"
            label="Target Emails"
            onChange={formik.handleChange}
            error={
              formik.touched.target_emails &&
              Boolean(formik.errors.target_emails)
            }
            helperText={
              formik.touched.target_emails && formik.errors.target_emails
            }
          />
          <Typography variant="caption" sx={{ mt: 1 }} component="div">
            Upload a .CSV file or an Excel spreadsheet saved as a .CSV or
            comma-separated value text file containing the list of target
            individuals or enter them directly in the field below. <br />
            Format: email, first name, last name, position
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

CampaignInitialForm.propTypes = {
  formik: PropTypes.object,
  customers: PropTypes.object,
  domains: PropTypes.object,
  landingPages: PropTypes.object,
};

export default CampaignInitialForm;

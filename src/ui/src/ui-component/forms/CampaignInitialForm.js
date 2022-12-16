import { useState } from "react";
import PropTypes from "prop-types";

// material-ui
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import UploadIcon from "@mui/icons-material/Upload";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

// project imports
import AdvancedSimpleDataTable from "ui-component/tables/AdvancedSimpleDataTable";
import { useGetAll } from "services/api.js";

const cols = [
  { field: "id", hide: true },
  { field: "name", headerName: "Name", midWidth: 500, flex: 1 },
  { field: "identifier", headerName: "Identifier", midWidth: 100, flex: 1 },
  {
    field: "primaryPOC",
    headerName: "Primary Point of Contact",
    midWidth: 200,
    flex: 1,
  },
];
const cusRows = (rowsArray) => {
  if (Object.keys(rowsArray).length !== 0) {
    let counter = 0;
    let cusRows = [];
    cusRows = Array.from(rowsArray);
    cusRows.forEach((entry) => {
      entry["id"] = counter;
      counter = counter + 1;
      entry["primaryPOC"] =
        entry["contact_list"][0]["first_name"] +
        " " +
        entry["contact_list"][0]["last_name"];
    });
    return rowsArray;
  }
  return [];
};
// const getData = require("views/customers/mockCusData.json");

const CampaignInitialForm = (props) => {
  const customers = useGetAll("customers");
  const domains = useGetAll("sending_domains");
  const landingPages = useGetAll("landing_pages");
  const rows = cusRows(customers.getData);
  const [cusShown, showCus] = useState(false);
  const [cusSelected, selectCus] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const handleRowClick = (params) => {
    // console.log(params.row);
    selectCus(true);
    setSelectedRow(params.row);
  };
  const cancelCusSelect = () => {
    if (Object.keys(selectedRow).length === 0) {
      showCus(false);
    } else {
      selectCus(true);
    }
  };
  const custTable = (
    <>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Typography variant="caption" sx={{ mb: 0.5 }} component="div">
          Select a customer by clicking on a row.
        </Typography>
        {customers.isLoading ? (
          <>Loading...</>
        ) : customers.getError[0] ? (
          <>Unable to load customer data from the database.</>
        ) : (
          <AdvancedSimpleDataTable
            data={{ rows: rows, columns: cols }}
            handleRowClick={handleRowClick}
          />
        )}
      </Grid>
      <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
        <Button variant="contained" fullWidth onClick={cancelCusSelect}>
          Cancel
        </Button>
      </Grid>
    </>
  );
  const custDisplay = (
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
  );

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
            value={props.formik.values.name}
            onChange={props.formik.handleChange}
            error={
              props.formik.touched.name && Boolean(props.formik.errors.name)
            }
            helperText={props.formik.touched.name && props.formik.errors.name}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h5" gutterBottom component="div">
              Select the Sending Domain
            </Typography>
          </Box>
          <TextField
            size="small"
            select
            fullWidth
            label="Sending Domain Selection"
            id="sending_domain_id"
            name="sending_domain_id"
            value={props.formik.values.sending_domain_id}
            onChange={props.formik.handleChange}
            error={
              props.formik.touched.sending_domain_id &&
              Boolean(props.formik.errors.sending_domain_id)
            }
            helperText={
              props.formik.touched.sending_domain_id &&
              props.formik.errors.sending_domain_id
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
            value={props.formik.values.admin_email}
            onChange={props.formik.handleChange}
            error={
              props.formik.touched.admin_email &&
              Boolean(props.formik.errors.admin_email)
            }
            helperText={
              props.formik.touched.admin_email &&
              props.formik.errors.admin_email
            }
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
            value={props.formik.values.operator_email}
            onChange={props.formik.handleChange}
            error={
              props.formik.touched.operator_email &&
              Boolean(props.formik.errors.operator_email)
            }
            helperText={
              props.formik.touched.operator_email &&
              props.formik.errors.operator_email
            }
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Typography variant="h5" gutterBottom component="div">
            Select the Landing Page
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <TextField
            sx={{ mt: -1 }}
            size="small"
            fullWidth
            id="landing_page_id"
            name="landing_page_id"
            label="Landing Page Selection"
            select
            value={props.formik.values.landing_page_id}
            onChange={props.formik.handleChange}
            error={
              props.formik.touched.landing_page_id &&
              Boolean(props.formik.errors.landing_page_id)
            }
            helperText={
              props.formik.touched.landing_page_id &&
              props.formik.errors.landing_page_id
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
            value={props.formik.values.landing_page_url}
            onChange={props.formik.handleChange}
            error={
              props.formik.touched.landing_page_url &&
              Boolean(props.formik.errors.landing_page_url)
            }
            helperText={
              props.formik.touched.landing_page_url &&
              props.formik.errors.landing_page_url
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
        {!cusShown ? (
          <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
            <Button variant="contained" fullWidth onClick={() => showCus(true)}>
              Select Customer
            </Button>
          </Grid>
        ) : !cusSelected && Object.keys(selectedRow).length == 0 ? (
          custTable
        ) : !cusSelected && Object.keys(selectedRow).length != 0 ? (
          <>
            {custDisplay}
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextField
                size="small"
                fullWidth
                id="poc_name"
                name="poc_name"
                label="Primary Point of Contact"
                value={
                  selectedRow.contact_list[0].first_name +
                  " " +
                  selectedRow.contact_list[0].last_name
                }
                // onChange={props.formik.handleChange}
                // error={
                //   props.formik.touched.subject &&
                //   Boolean(props.formik.errors.subject)
                // }
                // helperText={
                //   props.formik.touched.subject && props.formik.errors.subject
                // }
              />
            </Grid>
            {custTable}
          </>
        ) : (
          <>
            {custDisplay}
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextField
                size="small"
                fullWidth
                id="poc_name"
                name="poc_name"
                label="Primary Point of Contact"
                value={
                  selectedRow.contact_list[0].first_name +
                  " " +
                  selectedRow.contact_list[0].last_name
                }
                // onChange={props.formik.handleChange}
                // error={
                //   props.formik.touched.subject &&
                //   Boolean(props.formik.errors.subject)
                // }
                // helperText={
                //   props.formik.touched.subject && props.formik.errors.subject
                // }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
              <Button
                variant="contained"
                fullWidth
                onClick={() => selectCus(false)}
              >
                Re-select Customer
              </Button>
            </Grid>
          </>
        )}
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
            minRows={2}
            fullWidth
            id="target_domains"
            name="target_domains"
            label="Target Domains"
            // onChange={props.formik.handleChange}
            // error={
            //   props.formik.touched.subject &&
            //   Boolean(props.formik.errors.subject)
            // }
            // helperText={
            //   props.formik.touched.subject && props.formik.errors.subject
            // }
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
        <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
          <Button
            variant="contained"
            fullWidth
            endIcon={<UploadIcon />}
            // onClick={() => selectCus(false)}
          >
            Upload Email Targets
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
          <Button
            variant="contained"
            fullWidth
            // onClick={() => selectCus(false)}
          >
            Remove Duplicate Emails
          </Button>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <TextField
            size="small"
            multiline
            minRows={2}
            fullWidth
            id="target_emails"
            name="target_emails"
            label="Target Emails"
            // onChange={props.formik.handleChange}
            // error={
            //   props.formik.touched.subject &&
            //   Boolean(props.formik.errors.subject)
            // }
            // helperText={
            //   props.formik.touched.subject && props.formik.errors.subject
            // }
          />
          <Typography variant="caption" sx={{ mt: 1 }} component="div">
            Upload an Excel spreadsheet or comma-separated value text file
            containing the list of target individuals or enter them directly in
            the field below. <br />
            Format: email, first name, last name, position
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

CampaignInitialForm.propTypes = {
  formik: PropTypes.object,
};

export default CampaignInitialForm;

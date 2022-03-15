// material-ui
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
// project imports
import CustomerForm from "ui-component/forms/CustomerForm";
import CustomerPOCForm from "ui-component/forms/CustomerPOCForm";
import DisplayDataTable from "ui-component/tables/DisplayDataTable";
import MainCard from "ui-component/cards/MainCard";

// ==============================|| New Customer View ||============================== //

const cusContactsRows = [
  {
    id: 1,
    col1: "John Smith",
    col2: "test",
    col3: "john.smith@org.gov",
    col4: "test",
    col5: "9876543210",
    col6: "test",
  },
  {
    id: 2,
    col1: "Jane Smith",
    col2: "test",
    col3: "test",
    col4: "test",
    col5: "test",
    col6: "test",
  },
  {
    id: 3,
    col1: "John Doe",
    col2: "test",
    col3: "test",
    col4: "test",
    col5: "test",
    col6: "test",
  },
  {
    id: 4,
    col1: "Jane Doe",
    col2: "test",
    col3: "test",
    col4: "test",
    col5: "test",
    col6: "test",
  },
  {
    id: 5,
    col1: "John Johnson",
    col2: "test",
    col3: "test",
    col4: "test",
    col5: "test",
    col6: "test",
  },
  {
    id: 6,
    col1: "Jane Johnson",
    col2: "DEF",
    col3: "test",
    col4: "test",
    col5: "test",
    col6: "test",
  },
  {
    id: 7,
    col1: "John Wilson",
    col2: "test",
    col3: "test",
    col4: "test",
    col5: "test",
    col6: "test",
  },
];
const cusContactsCols = [
  { field: "id", hide: true },
  { field: "col1", headerName: "Name", flex: 1 },
  { field: "col2", headerName: "Title", flex: 0.5 },
  { field: "col3", headerName: "Email", flex: 1 },
  { field: "col4", headerName: "Mobile Phone", flex: 1 },
  { field: "col5", headerName: "Office Phone", flex: 1 },
  {
    field: "col6",
    headerName: "",
    sortable: false,
    disableClickEventBubbling: true,
    renderCell: () => {
      return (
        <div>
          <IconButton variant="contained" color="primary">
            <EditIcon />
          </IconButton>
          <IconButton variant="contained" color="error">
            <DeleteIcon />
          </IconButton>
        </div>
      );
    },
    flex: 0.75,
  },
];
const cusContactsData = { rows: cusContactsRows, columns: cusContactsCols };

const cusCampaignsRows = [
  {
    id: 1,
    col1: "INL_1",
    col2: "stopped",
    col3: "no",
    col4: "2022-03-08",
  },
  {
    id: 2,
    col1: "test",
    col2: "test",
    col3: "test",
    col4: "test",
  },
  {
    id: 3,
    col1: "test",
    col2: "test",
    col3: "test",
    col4: "test",
  },
];
const cusCampaignsCols = [
  { field: "id", hide: true },
  { field: "col1", headerName: "Name", flex: 1 },
  { field: "col2", headerName: "Status", flex: 1 },
  { field: "col3", headerName: "Active", flex: 1 },
  { field: "col4", headerName: "Start Date", flex: 1 },
  {
    field: "col5",
    headerName: "Inspect",
    sortable: false,
    disableClickEventBubbling: true,
    renderCell: () => {
      return (
        <div>
          <IconButton variant="contained" color="primary">
            <FormatListBulletedIcon />
          </IconButton>
        </div>
      );
    },
    flex: 0.5,
  },
];
const cusCampaignsData = { rows: cusCampaignsRows, columns: cusCampaignsCols };

const NewCustomerPage = () => (
  <MainCard title="Campaigns">
    <Box sx={{ ml: 5, mr: 5, mt: 3, maxWidth: 1000 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Typography variant="h4" gutterBottom component="div">
            Customer Information
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <CustomerForm
            cusContactsData={cusContactsData}
            cusCampaignsData={cusCampaignsData}
          ></CustomerForm>
        </Grid>
        <Grid item xs={10} sm={6} md={5} lg={4} xl={3}>
          <Button color="warning" variant="contained" size="large" fullWidth>
            Add Customer Contact
          </Button>
        </Grid>
        <Grid
          item
          display={{ xs: "none", sm: "block" }}
          sm={3}
          md={5}
          lg={6}
          xl={8}
        ></Grid>
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
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ mt: 3 }}>
          <Typography variant="h4" gutterBottom component="div">
            Customer/Organization Point of Contact
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Card variant="outlined">
            <CustomerPOCForm />
          </Card>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          sx={{ mt: 2, mb: 1 }}
        >
          <DisplayDataTable data={cusContactsData} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ mt: 2 }}>
          <Typography variant="h4" gutterBottom component="div">
            Customer Campaigns
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ mb: 3 }}>
          <DisplayDataTable data={cusCampaignsData} />
        </Grid>
        <Grid
          item
          display={{ xs: "none", sm: "block" }}
          sm={5}
          md={7}
          lg={8}
          xl={8}
        ></Grid>
        <Grid item xs={10} sm={5} md={4} lg={3} xl={3}>
          <Button disabled variant="contained" size="large" fullWidth>
            Save Customer
          </Button>
        </Grid>
        <Grid item xs={10} sm={1} md={1} lg={1} xl={1}>
          <Button color="dark" variant="text" size="large" fullWidth>
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Box>
  </MainCard>
);

export default NewCustomerPage;

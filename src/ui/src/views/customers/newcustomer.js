import React from "react";
import { useLocation } from "react-router-dom";

// material-ui
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

// project imports
import CustomerForm from "ui-component/forms/CustomerForm";
import CustomerPOCForm from "ui-component/forms/CustomerPOCForm";
import DisplayDataTable from "ui-component/tables/DisplayDataTable";
import MainCard from "ui-component/cards/MainCard";

// ==============================|| Create/Update Customer View ||============================== //

let custValues = {
  name: "",
  identifier: "",
  domain: "",
  appendixADate: Date.now(), // TODO: change date type to follow back-end
  customer_type: "",
  address_1: "",
  address_1: "",
  city: "",
  state: "",
  zip_code: "",
  contact_list: [],
};
let custPOCValues = {
  id: 0,
  email: "",
  first_name: "",
  last_name: "",
  mobile_phone: "",
  notes: "",
  office_phone: "",
  title: "",
};
const custRowsTransform = (custRows) => {
  if (!custRows.hasOwnProperty("appendixADate")) {
    custRows.appendixADate = Date.now();
  }
  if (!custRows.hasOwnProperty("customer_type")) {
    custRows.customer_type = "";
  }
  if (!custRows.hasOwnProperty("domain")) {
    custRows.domain = "";
  }
  if (!custRows.hasOwnProperty("contact_list")) {
    custRows.contact_list = [
      {
        email: "",
        first_name: "",
        last_name: "",
        mobile_phone: "",
        notes: "",
        office_phone: "",
        title: "",
      },
    ];
  }
  let counter = 0;
  custRows.contact_list.forEach((row) => {
    row["id"] = counter;
    counter = counter + 1;
  });
  return custRows;
};

const CustDataEntryPage = () => {
  const [isToggleCardOn, setToggleCard] = React.useState(true);
  const { state } = useLocation();
  let mainCardTitle = "New Customer";
  let hasContactBool = false;
  const cusContactsCols = [
    { field: "id", hide: true },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "title", headerName: "Title", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "mobile_phone", headerName: "Mobile Phone", flex: 1 },
    { field: "office_phone", headerName: "Office Phone", flex: 1 },
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
  if (state !== null && state !== undefined) {
    custValues = custRowsTransform(state.row);
    hasContactBool = true;
    mainCardTitle = "Edit Customer";
  }
  const [hasContact, setHasContact] = React.useState(hasContactBool);
  const [custData, setCustData] = React.useState(custValues);
  const [custPOCData, setCustPOCData] = React.useState(custValues.contact_list);

  if (custPOCData.length >= 1) {
    custPOCData.forEach((row) => {
      row["name"] = row["first_name"] + " " + row["last_name"];
    });
  }
  const custPOCTableData = {
    rows: custPOCData,
    columns: cusContactsCols,
  };
  return (
    <MainCard title={mainCardTitle}>
      <Box sx={{ ml: 5, mr: 5, mt: 3, maxWidth: 1000 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography variant="h4" gutterBottom component="div">
              Customer Information
            </Typography>
          </Grid>
          <CustomerForm
            initialCustValues={custValues}
            setCustData={setCustData}
            custData={custData}
            hasContact={hasContact}
          >
            <Grid item xs={10} sm={12} md={12} lg={12} xl={12} sx={{ mb: 2 }}>
              <Typography variant="h4" gutterBottom component="div">
                Customer/Organization Point of Contacts
              </Typography>
            </Grid>
            {isToggleCardOn ? (
              <React.Fragment>
                <Grid item xs={10} sm={6} md={5} lg={4} xl={3} sx={{ mb: 1 }}>
                  <Button
                    color="warning"
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={() => setToggleCard(!isToggleCardOn)}
                  >
                    Add Customer Contact
                  </Button>
                </Grid>
                <Grid
                  item
                  display={{ xs: "none", sm: "block" }}
                  sm={6}
                  md={7}
                  lg={8}
                  xl={9}
                ></Grid>
              </React.Fragment>
            ) : (
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ mb: 1 }}>
                <CustomerPOCForm
                  initialPOCValues={custPOCValues}
                  setCustPOCData={setCustPOCData}
                  custPOCData={custPOCData}
                  isToggleCardOn={isToggleCardOn}
                  setToggleCard={setToggleCard}
                  hasContact={hasContact}
                  setHasContact={setHasContact}
                />
              </Grid>
            )}
            {hasContact ? (
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                sx={{ mt: 3, mb: 1 }}
              >
                <DisplayDataTable data={custPOCTableData} />
              </Grid>
            ) : (
              <Grid
                item
                xs={10}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                sx={{ mb: 3, mt: 3 }}
              >
                <Tooltip
                  title="Add at least one contact to save a new customer."
                  placement="bottom-start"
                >
                  <Alert severity="error"> No contacts available.</Alert>
                </Tooltip>
              </Grid>
            )}
          </CustomerForm>
        </Grid>
      </Box>
    </MainCard>
  );
};

export default CustDataEntryPage;

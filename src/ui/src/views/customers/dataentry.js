import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

// material-ui
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// project imports
import CustomerForm from "ui-component/forms/CustomerForm";
import CustomerPOCForm from "ui-component/forms/CustomerPOCForm";
import DisplayDataTable from "ui-component/tables/DisplayDataTable";
import MainCard from "ui-component/cards/MainCard";
import ResultDialog from "ui-component/popups/ResultDialog";

// third party
import axios from "axios";

// ==============================|| Create/Update Customer View ||============================== //

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

let custFilledPOCValues = {};

const custRowsTransform = (custRows) => {
  if (!custRows.hasOwnProperty("name")) {
    custRows.name = "";
  }
  if (!custRows.hasOwnProperty("identifier")) {
    custRows.identifier = "";
  }
  if (!custRows.hasOwnProperty("domain")) {
    custRows.domain = "";
  }
  if (!custRows.hasOwnProperty("appendix_a_date")) {
    custRows.appendix_a_date = new Date().toISOString();
  }
  if (!custRows.hasOwnProperty("customer_type")) {
    custRows.customer_type = "";
  }
  if (!custRows.hasOwnProperty("address_1")) {
    custRows.address_1 = "";
  }
  if (!custRows.hasOwnProperty("address_2")) {
    custRows.address_2 = "";
  }
  if (!custRows.hasOwnProperty("city")) {
    custRows.city = "";
  }
  if (!custRows.hasOwnProperty("state")) {
    custRows.state = "";
  }
  if (!custRows.hasOwnProperty("zip_code")) {
    custRows.zip_code = "";
  }
  if (!custRows.hasOwnProperty("contact_list")) {
    custRows.contact_list = [];
  }
  if (!custRows.hasOwnProperty("critical_infrastructure")) {
    custRows.critical_infrastructure = "";
  }
  return custRows;
};

const custNewOrEdit = (dataEntryType) => {
  if (dataEntryType == "new") {
    return "New Customer";
  }
  return "Edit Customer";
};

const getOtherIdentifiers = (custData, custValues) => {
  const identifierArr = custData.map(({ identifier }) => identifier);
  return identifierArr.filter((identifier) => {
    if (identifier != custValues.identifier) {
      return identifier;
    }
  });
};

const CustDataEntryPage = () => {
  const { state } = useLocation();
  let navigate = useNavigate();
  let custValues = custRowsTransform(state.row);
  let mainCardTitle = custNewOrEdit(state.dataEntryType);
  const [custData, setCustData] = React.useState(custValues);
  const [hasSubmitted, setHasSubmitted] = React.useState(false);
  const [getError, setError] = React.useState([false, ""]);
  const [getDelete, setDelete] = React.useState(false);
  const [hasCampaigns, setCampaigns] = React.useState(false);

  React.useEffect(() => {
    const baseURL = "http://localhost:8080/li-pca/v1/customers";
    const cust_id = custData._id;
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    if (hasSubmitted && mainCardTitle == "New Customer") {
      axios
        .post(baseURL, custData, {
          headers: headers,
        })
        .then((response) => {
          console.log(response);
          setError([false, ""]);
        })
        .catch((error) => {
          setError([true, error.message]);
          console.log("Error adding data");
          console.log(custData);
          console.log(error);
        });
    } else if (hasSubmitted && mainCardTitle == "Edit Customer") {
      axios
        .put(baseURL + "/" + cust_id, custData, {
          headers: headers,
        })
        .then((response) => {
          console.log(response);
          setError([false, ""]);
        })
        .catch((error) => {
          setError([true, error.message]);
          console.log("Error updating data");
          console.log(custData);
          console.log(error);
        });
    } else if (getDelete) {
      axios
        .delete(baseURL + "/" + cust_id, {
          headers: headers,
        })
        .then((response) => {
          console.log(response);
          setError([false, ""]);
        })
        .catch((error) => {
          setError([true, error.message]);
          console.log("Error deleting data");
          console.log(custData);
          console.log(error);
        });
    }
  }, [custData, hasSubmitted, mainCardTitle, getDelete]);
  const closeDialog = () => {
    setHasSubmitted(false);
    setDelete(false);
    if (!getError[0]) {
      navigate("/li-pca-app/customers");
    }
  };
  const campaignCols = [
    { field: "id", hide: true },
    { field: "name", headerName: "Name", flex: 2 },
    { field: "status", headerName: "Status", flex: 2 },
    { field: "active", headerName: "Active", flex: 2 },
    { field: "start_date", headerName: "Start Date", flex: 1.5 },
    { field: "inpsect", headerName: "Inspect", flex: 1.5 },
  ];
  const renderCampaigns = () => {
    const title = (
      <Grid item xs={12} sm={12} lg={12} xl={12} sx={{ mt: 5, mb: 3 }}>
        <Typography variant="h4" gutterBottom component="div">
          Customer Campaigns
        </Typography>
      </Grid>
    );
    if (state.dataEntryType != "new" && hasCampaigns) {
      return (
        <>
          {title}
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ mb: 1 }}>
            <DisplayDataTable data={{ rows: [], columns: campaignCols }} />
          </Grid>
        </>
      );
    } else if (state.dataEntryType != "new") {
      return (
        <>
          {title}
          <Alert severity="info">Customer has no campaigns</Alert>
        </>
      );
    }
  };
  return (
    <MainCard title={mainCardTitle}>
      <Box sx={{ ml: 5, mr: 5, mt: 3, maxWidth: 1000 }}>
        <Grid container spacing={2}>
          <ResultDialog
            type={getDelete ? "Delete Customer" : mainCardTitle}
            hasSubmitted={hasSubmitted}
            getDelete={getDelete}
            error={getError}
            closeDialog={closeDialog}
          />
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography variant="h4" gutterBottom component="div">
              Customer Information
            </Typography>
          </Grid>
          <CustomerForm
            initialCustValues={custValues}
            setCustData={setCustData}
            custData={custData}
            setHasSubmitted={setHasSubmitted}
            dataEntryType={mainCardTitle}
            setDelete={setDelete}
            identifiers={getOtherIdentifiers(state.rows, custValues)}
          >
            <Grid item xs={10} sm={12} md={12} lg={12} xl={12} sx={{ mb: 2 }}>
              <Typography variant="h4" gutterBottom component="div">
                Customer/Organization Point of Contacts
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ mb: 1 }}>
              <CustomerPOCForm
                initialPOCValues={custPOCValues}
                custFilledPOCValues={custFilledPOCValues}
                setCustData={setCustData}
                custPOCData={custData.contact_list}
                custData={custData}
              />
            </Grid>
            {renderCampaigns()}
          </CustomerForm>
        </Grid>
      </Box>
    </MainCard>
  );
};

export default CustDataEntryPage;

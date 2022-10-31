import PropTypes from "prop-types";

// material-ui
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// project imports
import MainCard from "ui-component/cards/MainCard";
import MainDataTable from "ui-component/tables/MainDataTable";
import { useGetAll } from "services/api/Customers.js";

// ==============================|| Customers view ||============================== //

function BaseJSX(props) {
  const cols = [
    { field: "id", hide: true },
    { field: "name", headerName: "Name", flex: 2 },
    { field: "identifier", headerName: "Identifier", flex: 1 },
    {
      field: "critical_infrastructure",
      headerName: "Critical Infrastructure",
      flex: 1.5,
    },
    { field: "primaryPOC", headerName: "Primary Point of Contact", flex: 1.5 },
  ];
  return (
    <MainCard title="Customers">
      <Grid container spacing={2}>
        <Grid item xs={8} sm={12} md={12} lg={12} xl={12}>
          {props.children}
          <MainDataTable
            data={{ rows: props.rows, columns: cols }}
            newEntryRoute={props.dataEntry}
            editEntryRoute={props.dataEntry}
            tableCategory={"Customer"}
          />
        </Grid>
      </Grid>
    </MainCard>
  );
}

BaseJSX.propTypes = {
  rows: PropTypes.array,
  children: PropTypes.object,
  dataEntry: PropTypes.string,
};

function CustomersPage() {
  const { isLoading, getData, getError } = useGetAll();

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
  // Mock data test
  // const jsonRows = require("./mockCusData.json");
  // const rows = cusRows(jsonRows);
  const rows = cusRows(getData);

  if (isLoading) {
    return (
      <BaseJSX rows={[]} dataEntry={""}>
        <Typography>Loading...</Typography>
      </BaseJSX>
    );
  } else if (getError[0]) {
    return (
      <BaseJSX rows={[]} dataEntry={""}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {getError[1]}. Unable to load customer data from the database.
        </Alert>
      </BaseJSX>
    );
  } else if (rows.length === 0) {
    return (
      <BaseJSX rows={[]} dataEntry={"data-entry"}>
        <Typography sx={{ mb: 2 }}>No customer data entries found.</Typography>
      </BaseJSX>
    );
  }
  return (
    <BaseJSX rows={rows} dataEntry={"data-entry"}>
      <Typography sx={{ mb: 2 }}>
        Customer data from the database shown below.
      </Typography>
    </BaseJSX>
  );
}
export default CustomersPage;

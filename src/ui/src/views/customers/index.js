import PropTypes from "prop-types";

// material-ui
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// project imports
import MainCard from "ui-component/cards/MainCard";
import MainDataTable from "ui-component/tables/MainDataTable";
import { useGetAll } from "services/api.js";

// ==============================|| Customers view ||============================== //

/**
 * Renders the main card with the customer table.
 * @param {object} props - Component props.
 * @param {array} props.rows - Array of rows to display in the table.
 * @param {string} props.dataEntry - Route to add or edit a customer entry.
 * @param {React.ReactNode} props.children - Child components to render.
 * @returns {JSX.Element} The MainCard and MainDataTable of the component.
 */
function CustomerTable({ rows, dataEntry, children }) {
  const cols = [
    { field: "id", hide: true },
    { field: "name", headerName: "Name", minWidth: 100, flex: 2 },
    { field: "identifier", headerName: "Identifier", minWidth: 100, flex: 1 },
    {
      field: "critical_infrastructure",
      headerName: "Critical Infrastructure",
      minWidth: 100,
      flex: 1.5,
    },
    {
      field: "primaryPOC",
      headerName: "Primary Point of Contact",
      minWidth: 100,
      flex: 1.5,
    },
  ];
  return (
    <MainCard title="Customers">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          {children}
          <Box sx={{ maxWidth: 1200 }}>
            <MainDataTable
              data={{ rows: rows, columns: cols }}
              newEntryRoute={dataEntry}
              editEntryRoute={dataEntry}
              tableCategory={"Customer"}
            />
          </Box>
        </Grid>
      </Grid>
    </MainCard>
  );
}

CustomerTable.propTypes = {
  rows: PropTypes.array,
  children: PropTypes.object,
  dataEntry: PropTypes.string,
};

/**
 * Updates an array of customer objects by adding a "primaryPOC" property
 * which concatenates the first and last name of the primary contact.
 *
 * @param {Array} rowsArray - An array of customer objects.
 * @returns {Array} The updated array of customer objects.
 */
function addPrimaryPOC(rowsArray) {
  if (rowsArray.length === 0) return [];
  const updatedRows = rowsArray.map((entry) => {
    const primaryContact = entry.contact_list[0];
    const primaryPOC = `${primaryContact.first_name} ${primaryContact.last_name}`;
    return {
      ...entry,
      primaryPOC,
    };
  });
  return updatedRows;
}

/**
 * The CustomersPage component, used to render the customers view.
 *
 * @returns {JSX.Element} The CustomersPage component.
 */
function CustomersPage() {
  const isLoading = useGetAll("customers").isLoading;
  const getData = useGetAll("customers").getData;
  const getError = useGetAll("customers").getError;
  const rows = addPrimaryPOC(getData);
  // Mock data test
  // const jsonRows = require("./mockCusData.json");
  // const rows = cusRows(jsonRows);

  return (
    <CustomerTable rows={isLoading ? [] : rows} dataEntry={"data-entry"}>
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : getError[0] ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {getError[1]}. Unable to load customer data from the database.
        </Alert>
      ) : rows.length === 0 ? (
        <Typography sx={{ mb: 2 }}>No customer data entries found.</Typography>
      ) : (
        <Typography sx={{ mb: 2 }}>
          Customer data from the database shown below.
        </Typography>
      )}
    </CustomerTable>
  );
}

export default CustomersPage;

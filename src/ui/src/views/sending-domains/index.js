import PropTypes from "prop-types";

// material-ui
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// project imports
import MainCard from "ui-component/cards/MainCard";
import MainDataTable from "ui-component/tables/MainDataTable";
import { useGetAll, deleteEntry } from "services/api.js";

// ==============================|| Sending Domains view ||============================== //

/**
 * Renders the main card with the sending domain table.
 * @param {object} props - Component props.
 * @param {array} props.rows - Array of rows to display in the table.
 * @param {string} props.dataEntry - Route to add or edit a sending domain entry.
 * @param {React.ReactNode} props.children - Child components to render.
 * @returns {JSX.Element} The MainCard and MainDataTable of the component.
 */
function SendingDomainTable({ rows, dataEntry, children }) {
  const cols = [
    { field: "id", hide: true },
    { field: "name", headerName: "Sending Domain", midWidth: 100, flex: 1.25 },
    {
      field: "interface_type",
      headerName: "Interface Type",
      midWidth: 100,
      flex: 0.75,
    },
    {
      field: "#_of_customers_using",
      headerName: "# of Customers Using",
      midWidth: 100,
      flex: 1,
    },
    {
      field: "#last_modified_date",
      headerName: "Last Modified Date",
      midWidth: 100,
      flex: 1,
    },
  ];
  return (
    <MainCard title="Sending Domains">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          {children}
          <Box sx={{ maxWidth: 1200 }}>
            <MainDataTable
              data={{ rows: rows, columns: cols }}
              newEntryRoute={dataEntry}
              editEntryRoute={dataEntry}
              tableCategory={"Sending Domains"}
              deleteEntry={deleteEntry}
              apiType={"sending_domains"}
            />
          </Box>
        </Grid>
      </Grid>
    </MainCard>
  );
}

SendingDomainTable.propTypes = {
  rows: PropTypes.array,
  children: PropTypes.object,
  dataEntry: PropTypes.string,
};

/**
 * The SendingDomainsPage component, used to render the sending domains view.
 *
 * @returns {JSX.Element} The SendingDomainsPage component.
 */
function SendingDomainsPage() {
  const isLoading = useGetAll("sending_domains").isLoading;
  const getData = useGetAll("sending_domains").getData;
  const getError = useGetAll("sending_domains").getError;
  const rows = getData;
  // Mock data test
  // const jsonRows = require("./mockDomainData.json");
  // const rows = domainRows(jsonRows);

  return (
    <SendingDomainTable rows={isLoading ? [] : rows} dataEntry={"data-entry"}>
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : getError[0] ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {getError[1]}. Unable to load sending domain data from the database.
        </Alert>
      ) : rows.length === 0 ? (
        <Typography sx={{ mb: 2 }}>
          No sending domain data entries found.
        </Typography>
      ) : (
        <Typography sx={{ mb: 2 }}>
          Sending domain data from the database shown below.
        </Typography>
      )}
    </SendingDomainTable>
  );
}

export default SendingDomainsPage;

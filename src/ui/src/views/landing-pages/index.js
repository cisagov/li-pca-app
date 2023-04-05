import PropTypes from "prop-types";

// material-ui
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Grid";

// project imports
import MainCard from "ui-component/cards/MainCard";
import MainDataTable from "ui-component/tables/MainDataTable";
import { useGetAll } from "services/api.js";

// ==============================|| Landing Page view ||============================== //

/**
 * Renders the main card with the landing page table.
 * @param {object} props - Component props.
 * @param {array} props.rows - Array of rows to display in the table.
 * @param {string} props.dataEntry - Route to add or edit a landing page entry.
 * @param {React.ReactNode} props.children - Child components to render.
 * @returns {JSX.Element} The MainCard and MainDataTable of the component.
 */
function LandingPageTable({ rows, dataEntry, children }) {
  const cols = [
    { field: "id", hide: true },
    { field: "name", headerName: "Name", midWidth: 100, flex: 1 },
    {
      field: "created_by",
      headerName: "Created By",
      midWidth: 100,
      flex: 0.75,
    },
    {
      field: "is_default_template",
      headerName: "Default Landing Page",
      midWidth: 100,
      flex: 0.5,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        if (params.value) {
          return <CheckCircleIcon />;
        }
        return false;
      },
    },
  ];
  return (
    <MainCard title="Landing Pages">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          {children}
          <Box sx={{ maxWidth: 1200 }}>
            <MainDataTable
              data={{ rows: rows, columns: cols }}
              newEntryRoute={dataEntry}
              editEntryRoute={dataEntry}
              tableCategory={"Landing Pages"}
            />
          </Box>
        </Grid>
      </Grid>
    </MainCard>
  );
}

LandingPageTable.propTypes = {
  rows: PropTypes.array,
  children: PropTypes.object,
  dataEntry: PropTypes.string,
};

/**
 * The LandingPagesPage component, used to render the landing pages view.
 *
 * @returns {JSX.Element} The LandingPagesPage component.
 */
function LandingPagesPage() {
  const isLoading = useGetAll("landing_pages").isLoading;
  const getData = useGetAll("landing_pages").getData;
  const getError = useGetAll("landing_pages").getError;
  const rows = getData;
  // Mock data test
  // const jsonRows = require("./mockLandingPageData.json");
  // const rows = landingpageRows(jsonRows);

  return (
    <LandingPageTable rows={isLoading ? [] : rows} dataEntry={"data-entry"}>
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : getError[0] ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {getError[1]}. Unable to load landing page data from the database.
        </Alert>
      ) : rows.length === 0 ? (
        <Typography sx={{ mb: 2 }}>
          No landing page data entries found.
        </Typography>
      ) : (
        <Typography sx={{ mb: 2 }}>
          Landing page data from the database shown below.
        </Typography>
      )}
    </LandingPageTable>
  );
}

export default LandingPagesPage;

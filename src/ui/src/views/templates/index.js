import PropTypes from "prop-types";

// material-ui
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";

// project imports
import AdvancedDataTable from "ui-component/tables/AdvancedDataTable";
import MainCard from "ui-component/cards/MainCard";
import { useGetAll } from "services/api.js";

// ==============================|| Templates view ||============================== //

/**
 * Renders the main card with the template table.
 * @param {object} props - Component props.
 * @param {array} props.rows - Array of rows to display in the table.
 * @param {string} props.dataEntry - Route to add or edit a template entry.
 * @param {React.ReactNode} props.children - Child components to render.
 * @returns {JSX.Element} The MainCard and MainDataTable of the component.
 */
function TemplateTable({ rows, dataEntry, children }) {
  const cols = [
    { field: "id", hide: true },
    { field: "name", headerName: "Template Name", minWidth: 140, flex: 2.5 },
    {
      field: "deception_score",
      headerName: "Deception Score",
      minWidth: 110,
      flex: 1.5,
    },
    {
      field: "from_address",
      headerName: "From Address",
      minWidth: 100,
      flex: 2,
    },
    {
      field: "created_by",
      headerName: "Created By",
      minWidth: 100,
      flex: 1,
    },
    { field: "retired", hide: true },
  ];
  const filterModel = {
    items: [
      {
        columnField: "retired",
        operatorValue: "equals",
        value: "false",
      },
    ],
  };
  return (
    <MainCard title="Templates">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          {children}
          <Box sx={{ maxWidth: 1200 }}>
            <AdvancedDataTable
              data={{ rows: rows, columns: cols }}
              filterModel={filterModel}
              newEntryRoute={dataEntry}
              editEntryRoute={dataEntry}
              tableCategory={"Template"}
              apiType={"templates"}
            />
          </Box>
        </Grid>
      </Grid>
    </MainCard>
  );
}

TemplateTable.propTypes = {
  rows: PropTypes.array,
  children: PropTypes.object,
  dataEntry: PropTypes.string,
};

/**
 * The TemplatesPage component, used to render the templates view.
 *
 * @returns {JSX.Element} The TemplatesPage component.
 */
function TemplatesPage() {
  const isLoading = useGetAll("templates").isLoading;
  const getData = useGetAll("templates").getData;
  const getError = useGetAll("templates").getError;
  const rows = getData;
  //  Mock data test
  // const jsonRows = require("./mockTemData.json");
  // const rows = temRows(jsonRows);
  // const rows = temRows(getData);

  return (
    <TemplateTable rows={isLoading ? [] : rows} dataEntry={"data-entry"}>
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : getError[0] ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {getError[1]}. Unable to load template data from the database.
        </Alert>
      ) : rows.length === 0 ? (
        <Typography sx={{ mb: 2 }}>No template data entries found.</Typography>
      ) : (
        <Typography sx={{ mb: 2 }}>
          Template data from the database shown below.
        </Typography>
      )}
    </TemplateTable>
  );
}
export default TemplatesPage;

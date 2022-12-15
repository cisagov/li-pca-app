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

function BaseJSX(props) {
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
        if (params.value == true) {
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
          <Box sx={{ maxWidth: 1200 }}>
            <MainDataTable
              data={{ rows: props.rows, columns: cols }}
              newEntryRoute={props.dataEntry}
              editEntryRoute={props.dataEntry}
              tableCategory={"Landing Pages"}
            />
          </Box>
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

function LandingPagesPage() {
  const { isLoading, getData, getError } = useGetAll("landing_pages");

  const landingpageRows = (rowsArray) => {
    if (Object.keys(rowsArray).length !== 0) {
      let counter = 0;
      let landingpageRows = [];
      landingpageRows = Array.from(rowsArray);
      landingpageRows.forEach((entry) => {
        entry["id"] = counter;
        counter = counter + 1;
      });
      return rowsArray;
    }
    return [];
  };
  // Mock data test
  // const jsonRows = require("./mockLandingPageData.json");
  // const rows = landingpageRows(jsonRows);

  const rows = landingpageRows(getData);

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
          {getError[1]}. Unable to load landing page data from the database.
        </Alert>
      </BaseJSX>
    );
  } else if (rows.length === 0) {
    return (
      <BaseJSX rows={[]} dataEntry={"data-entry"}>
        <Typography sx={{ mb: 2 }}>
          No landing page data entries found.
        </Typography>
      </BaseJSX>
    );
  }
  return (
    <BaseJSX rows={rows} dataEntry={"data-entry"}>
      <Typography sx={{ mb: 2 }}>
        Landing page data from the database shown below.
      </Typography>
    </BaseJSX>
  );
}

export default LandingPagesPage;

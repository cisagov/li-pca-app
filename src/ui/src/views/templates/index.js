import PropTypes from "prop-types";

// material-ui
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";

// project imports
import AdvancedDataTable from "ui-component/tables/AdvancedDataTable";
import MainCard from "ui-component/cards/MainCard";
import { useGetAll } from "services/api/Templates.js";

// ==============================|| Templates view ||============================== //

function BaseJSX(props) {
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
          {props.children}
          <Box sx={{ maxWidth: 1000 }}>
            <AdvancedDataTable
              data={{ rows: props.rows, columns: cols }}
              filterModel={filterModel}
              newEntryRoute={props.dataEntry}
              editEntryRoute={props.dataEntry}
              tableCategory={"Template"}
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

function TemplatesPage() {
  const temRows = (rowsArray) => {
    if (Object.keys(rowsArray).length !== 0) {
      let counter = 0;
      let temRows = [];
      temRows = Array.from(rowsArray);
      temRows.forEach((entry) => {
        entry["id"] = counter;
        counter = counter + 1;
      });
      return rowsArray;
    }
    return [];
  };

  const { isLoading, getData, getError } = useGetAll();

  //  Mock data test
  // const jsonRows = require("./mockTemData.json");
  // const rows = temRows(jsonRows);
  const rows = temRows(getData);

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
          {getError[1]}. Unable to load template data from the database.
        </Alert>
      </BaseJSX>
    );
  } else if (rows.length === 0) {
    return (
      <BaseJSX rows={[]} dataEntry={"data-entry"}>
        <Typography sx={{ mb: 2 }}>No template data entries found.</Typography>
      </BaseJSX>
    );
  }
  return (
    <BaseJSX rows={rows} dataEntry={"data-entry"}>
      <Typography sx={{ mb: 2 }}>
        Template data from the database shown below.
      </Typography>
    </BaseJSX>
  );
}
export default TemplatesPage;

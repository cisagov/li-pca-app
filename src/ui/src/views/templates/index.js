import { useState, useEffect } from "react";
import PropTypes from "prop-types";

// material-ui
import { Grid } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Grid";

// project imports
import MainCard from "ui-component/cards/MainCard";
import MainDataTable from "ui-component/tables/MainDataTable";

// third party
import axios from "axios";

// ==============================|| Templates view ||============================== //

function BaseJSX(props) {
  const cols = [
    { field: "id", hide: true },
    { field: "name", headerName: "Template Name", flex: 4 },
    { field: "deception_score", headerName: "Deception Score", flex: 1 },
    { field: "created_by", headerName: "Created By", flex: 2 },
  ];
  return (
    <MainCard title="Templates">
      <Grid container spacing={2}>
        <Grid item xs={8} sm={12} md={12} lg={12} xl={12}>
          {props.children}
          <MainDataTable
            data={{ rows: props.rows, columns: cols }}
            newEntryRoute={props.dataEntry}
            editEntryRoute={props.dataEntry}
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

function TemplatesPage() {
  const baseURL = "http://localhost:8080/li-pca/v1/templates";
  const [isLoading, setLoading] = useState(true);
  const [getData, setData] = useState([]);
  const [getError, setError] = useState([false, ""]);

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
  useEffect(() => {
    axios
      .get(baseURL, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        setData(response.data);
        setLoading(false);
        setError([false, ""]);
      })
      .catch((error) => {
        setError([true, error.message]);
        setLoading(false);
        console.log(error);
      });
  }, []);

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
export default TemplatesPage;

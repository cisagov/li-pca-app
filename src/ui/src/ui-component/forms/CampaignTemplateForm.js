import { useState } from "react";

// material ui
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// project imports
import AdvancedSimpleDataTable from "ui-component/tables/AdvancedSimpleDataTable";
import HtmlEditor from "./HtmlEditor";
import { useGetAll } from "services/api/Templates.js";

const cols = [
  { field: "id", hide: true },
  { field: "name", headerName: "Template Name", minWidth: 255, flex: 1.2 },
  {
    field: "deception_score",
    headerName: "Score",
    minWidth: 80,
    maxWidth: 80,
    flex: 0.5,
  },
  {
    field: "from_address",
    headerName: "From Address",
    minWidth: 130,
    flex: 1,
    hide: true,
  },
];

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

export default function CampaignTemplateForm() {
  // const getData = require("views/templates/mockTemData.json");
  const { isLoading, getData, getError } = useGetAll();
  const rows = temRows(getData);
  const [selectedRow, setRow] = useState({});
  const [htmlValue, setHTMLValue] = useState("");
  const handleRowClick = (params) => {
    setHTMLValue(params.row.html);
    setRow(params.row);
  };
  if (isLoading) {
    return <Typography>Loading...</Typography>;
  } else if (getError[0]) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {getError[1]}. Unable to load template data from the database.
      </Alert>
    );
  }
  return (
    <>
      <Divider color="gray" sx={{ height: 2 }} />
      <Grid container spacing={2} sx={{ mt: 1, mb: 3 }}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Typography color="black" fontSize={18} component="div">
            <Box sx={{ fontWeight: "regular" }}>Template Selection</Box>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={5} xl={5}>
          <Typography sx={{ mb: 1 }} fontSize={16}>
            Select a template by clicking on a row.
          </Typography>
          <AdvancedSimpleDataTable
            data={{ rows: rows, columns: cols }}
            handleRowClick={handleRowClick}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={0.5} xl={0.5} />
        <Grid item xs={12} sm={12} md={12} lg={6.5} xl={6.5}>
          {JSON.stringify(selectedRow) === "{}" ? (
            <>The selected template will display here.</>
          ) : (
            <>
              <Typography fontSize={16} display="inline">
                Subject:&nbsp;
              </Typography>
              <Typography fontSize={16} display="inline" fontWeight="medium">
                {selectedRow.subject}
              </Typography>
              <Typography fontSize={16}>
                From: {selectedRow.from_address}
              </Typography>
              <Box sx={{ mt: 2 }} />
              <HtmlEditor
                value={htmlValue}
                setValue={setHTMLValue}
                height={"510"}
                disabled={true}
              />
            </>
          )}
        </Grid>
        <Grid item>
          <Typography>
            {JSON.stringify(selectedRow) === "{}" ? (
              <>Selected Template: (No selection)</>
            ) : (
              <>Selected Template: ({selectedRow.name})</>
            )}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

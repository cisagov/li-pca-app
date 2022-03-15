import * as React from "react";
import PropTypes from "prop-types";

// material-ui
import { DataGrid } from "@mui/x-data-grid";

DisplayDataTable.propTypes = {
  data: PropTypes.object.isRequired,
};

export default function DisplayDataTable(props) {
  const [rows, setRows] = React.useState(props.data.rows);
  const columns = props.data.columns;
  React.useEffect(() => {
    setRows(props.data.rows);
  }, [props.data.rows]);

  // <DataGrid autoHeight rows={rows} columns={columns} pagination rowsPerPageOptions={[5, 10, 100]} disableSelectionOnClick density="compact" />

  return (
    <DataGrid
      autoHeight
      rows={rows}
      columns={columns}
      pagination
      pageSize={5}
      rowsPerPageOptions={[5, 10, 100]}
      disableSelectionOnClick
      density="compact"
    />
  );
}

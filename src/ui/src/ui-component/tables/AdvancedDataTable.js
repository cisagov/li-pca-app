import * as React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

// material-ui
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

// project imports
import ConfirmDialog from "ui-component/popups/ConfirmDialog";
import EditButton from "./EditButton";
import ResultDialog from "ui-component/popups/ResultDialog";
import { useRetire } from "services/api.js";
import CustomToolbar from "./CustomToolbar";
import { escapeRegExp } from "utils/stringUtils";

/**
 * Renders an advanced data table with search, edit, and retire functionality.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.data - An object containing the table data and columns.
 * @param {string} props.editEntryRoute - The route to navigate to for editing a table entry.
 * @param {string} props.newEntryRoute - The route to navigate to for adding a new table entry.
 * @param {string} props.tableCategory - The category of the table.
 * @param {string} props.apiType - The API type for retiring rows.
 * @param {Object} props.filterModel - The filter model for the table.
 * @returns {JSX.Element} The advanced data table component.
 */
AdvancedDataTable.propTypes = {
  data: PropTypes.object.isRequired,
  newEntryRoute: PropTypes.string,
  editEntryRoute: PropTypes.string,
  tableCategory: PropTypes.string,
  filterModel: PropTypes.object,
  apiType: PropTypes.string,
};

export default function AdvancedDataTable(props) {
  let navigate = useNavigate();
  const [searchText, setSearchText] = React.useState("");
  const [rows, setRows] = React.useState(props.data.rows);
  const [selectedRows, setSelectedRows] = React.useState([]);

  // Takes search input and filters the table rows to display matching criteria only.
  // The filtered rows are then set using the setRows hook.
  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
    const filteredRows = props.data.rows.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field].toString());
      });
    });
    setRows(filteredRows);
  };

  React.useEffect(() => {
    setRows(props.data.rows);
  }, [props.data.rows]);

  const columns = props.data.columns;
  columns.push({
    field: "edit",
    headerName: "Edit",
    sortable: false,
    disableClickEventBubbling: true,
    renderCell: (cellValues) => {
      return (
        <EditButton
          row={cellValues.row}
          rows={rows}
          navigate={navigate}
          editEntryRoute={props.editEntryRoute}
        />
      );
    },
    width: 80,
  });
  const [retire, setRetire] = React.useState(false);
  const [retirebtnOpen, setRetirebtnOpen] = React.useState(false);

  // Sets retire button open to be true and opens the retire confirmation dialog.
  const confirmRetire = () => {
    setRetirebtnOpen(true);
  };

  // Sets the row to be retired and closes the retire confirmation dialog.
  const toRetire = () => {
    setRetire(true);
    setRetirebtnOpen(false);
  };

  let getError = useRetire(props.apiType, retire, selectedRows);

  // Close the retire confirmation dialog and reload the page if there are no errors.
  const closeDialog = () => {
    setRetire(false);
    if (!getError[0]) {
      window.location.reload();
    }
  };
  return (
    <React.Fragment>
      <ConfirmDialog
        subtitle="This action disables them from being used in any future campaigns."
        confirmType="Retire"
        isOpen={retirebtnOpen}
        setIsOpen={setRetirebtnOpen}
        handleClick={toRetire}
      />
      <ResultDialog
        type={"Retiring record(s)"}
        hasSubmitted={retire}
        getDelete={false}
        error={getError}
        closeDialog={closeDialog}
      />
      <Box sx={{ width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight
          components={{ Toolbar: CustomToolbar }}
          pageSize={10}
          rowsPerPageOptions={[10]}
          getRowId={(row) => row._id}
          componentsProps={{
            toolbar: {
              value: searchText,
              onChange: (event) => requestSearch(event.target.value),
              clearSearch: () => requestSearch(""),
              newEntryRoute: props.newEntryRoute,
              rows: rows,
              tableCategory: props.tableCategory,
              selectedRows: selectedRows,
              confirmRetire: confirmRetire,
            },
          }}
          checkboxSelection
          onSelectionModelChange={(ids) => {
            const selectedIDs = new Set(ids);
            const selectedRows = rows.filter((row) => selectedIDs.has(row._id));
            setSelectedRows(selectedRows);
          }}
          initialState={{
            filter: { filterModel: props.filterModel },
          }}
        />
      </Box>
    </React.Fragment>
  );
}

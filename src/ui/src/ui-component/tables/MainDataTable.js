import * as React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

// material-ui
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { DataGrid } from "@mui/x-data-grid";

// project imports
import ConfirmDialog from "ui-component/popups/ConfirmDialog";
import CustomToolbar from "./CustomToolbar";
import EditButton from "./EditButton";
import ResultDialog from "ui-component/popups/ResultDialog";
import { escapeRegExp } from "utils/stringUtils";

MainDataTable.propTypes = {
  data: PropTypes.object.isRequired,
  newEntryRoute: PropTypes.string,
  editEntryRoute: PropTypes.string,
  tableCategory: PropTypes.string,
  deleteEntry: PropTypes.func,
  apiType: PropTypes.string,
};

/**
 * Renders a data table with search, edit, and delete functionality.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.data - An object containing the table data and columns.
 * @param {string} props.editEntryRoute - The route to navigate to for editing a table entry.
 * @param {string} props.newEntryRoute - The route to navigate to for adding a new table entry.
 * @param {string} props.tableCategory - The category of the table.
 * @param {string} props.apiType - The API type for retiring rows.
 * @returns {JSX.Element} The data table component.
 */
export default function MainDataTable(props) {
  let navigate = useNavigate();
  const [searchText, setSearchText] = React.useState("");
  const [rows, setRows] = React.useState(props.data.rows);
  const [deletebtnOpen, setDeletebtnOpen] = React.useState(false);
  const [getDelete, setDelete] = React.useState(false);
  const [getError, setError] = React.useState([false, ""]);
  let [rowData, setRowData] = React.useState("");
  let pageSize = 10;
  let rowsPerPage = 10;
  let density = "standard";

  /**
   * Updates the search input and filters the rows to display matching criteria only.
   *
   * @param {string} searchValue - The search value entered by the user.
   */
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

  // Adds edit or delete buttons as columns based on `tableCategory`.
  switch (props.tableCategory) {
    case "Phish Reconnaissance":
      pageSize = 5;
      rowsPerPage = 5;
      density = "compact";
      break;
    case "Sending Domains":
      columns.push({
        field: "delete",
        headerName: "Delete",
        sortable: false,
        disableClickEventBubbling: true,
        renderCell: (cellValues) => {
          return (
            <IconButton
              variant="contained"
              color="error"
              onClick={() => {
                setRowData(cellValues.row);
                setDeletebtnOpen(true);
              }}
            >
              <DeleteIcon />
            </IconButton>
          );
        },
        flex: 0.5,
      });
      break;
    default:
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
      break;
  }

  /**
   * Calls the deleteEntry function with the appropriate parameters and sets a timeout to close the delete button dialog and set the delete state to true.
   *
   * @param {function} props.deleteEntry - The function to call to delete the data.
   */
  const confirmDelete = () => {
    props.deleteEntry(props.apiType, rowData._id, setError);
    setTimeout(() => {
      setDeletebtnOpen(false);
      setDelete(true);
    });
  };

  /**
   * Closes the delete confirmation dialog and reloads the page if there is no error.
   *
   * @param {Array} getError - An array that contains the error message and a boolean value indicating whether there was an error or not.
   */
  const closeDialog = () => {
    if (!getError[0]) {
      window.location.reload();
    }
    setDelete(false);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight
        components={{
          Toolbar: CustomToolbar,
        }}
        getRowId={(row) => row._id}
        pageSize={pageSize}
        density={density}
        rowsPerPageOptions={[rowsPerPage]}
        componentsProps={{
          toolbar: {
            value: searchText,
            onChange: (event) => requestSearch(event.target.value),
            clearSearch: () => requestSearch(""),
            newEntryRoute: props.newEntryRoute,
            rows: rows,
            tableCategory: props.tableCategory,
          },
        }}
      />
      <ConfirmDialog
        subtitle={rowData.name + " will be deleted in the database."}
        confirmType="Delete"
        handleClick={confirmDelete}
        isOpen={deletebtnOpen}
        setIsOpen={setDeletebtnOpen}
      />
      <ResultDialog
        type={getDelete ? "Delete" : "Edit"}
        hasSubmitted={getDelete}
        error={getError}
        closeDialog={closeDialog}
      />
    </Box>
  );
}

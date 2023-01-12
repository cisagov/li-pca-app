import * as React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

// material-ui
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
} from "@mui/x-data-grid";

// project imports
import ConfirmDialog from "ui-component/popups/ConfirmDialog";
import ResultDialog from "ui-component/popups/ResultDialog";

function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

CustomToolbar.propTypes = {
  clearSearch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  newEntryRoute: PropTypes.string.isRequired,
  rows: PropTypes.array,
  tableCategory: PropTypes.string,
};

function CustomToolbar(props) {
  let navigate = useNavigate();
  const values = {};
  const searchTextField = (
    <TextField
      fullWidth
      variant="standard"
      value={props.value}
      onChange={props.onChange}
      placeholder="Search…"
      InputProps={{
        startAdornment: <SearchIcon fontSize="small" />,
        endAdornment: (
          <IconButton
            title="Clear"
            aria-label="Clear"
            size="small"
            style={{ visibility: props.value ? "visible" : "hidden" }}
            onClick={props.clearSearch}
          >
            <ClearIcon fontSize="small" />
          </IconButton>
        ),
      }}
      sx={{
        m: (theme) => theme.spacing(1, 0.5, 1.5),
        "& .MuiSvgIcon-root": {
          mr: 0.5,
        },
        "& .MuiInput-underline:before": {
          borderBottom: 1,
          borderColor: "divider",
        },
      }}
    />
  );
  let newEntryButton;
  if (props.tableCategory != "Phish Reconnaissance") {
    newEntryButton = (
      <Button
        size="small"
        sx={{ "& .MuiButton-startIcon": { marginRight: "1.8px" } }}
        startIcon={<AddIcon fontSize="small" />}
        onClick={() => {
          navigate(`${props.newEntryRoute}`, {
            state: { row: values, dataEntryType: "new", rows: props.rows },
          });
        }}
      >
        New {props.tableCategory}
      </Button>
    );
  }

  return (
    <GridToolbarContainer>
      <Grid container>
        <Grid item xs={11} sm={7} md={5} lg={5} xl={4} sx={{ p: 0.5, pb: 0 }}>
          {searchTextField}
        </Grid>
        <Grid item xs={12} sm={12} md={7} lg={7} xl={7} sx={{ p: 1, pl: 1 }}>
          <GridToolbarColumnsButton />
          <GridToolbarFilterButton />
          <GridToolbarExport />
          {newEntryButton}
        </Grid>
      </Grid>
    </GridToolbarContainer>
  );
}

MainDataTable.propTypes = {
  data: PropTypes.object.isRequired,
  newEntryRoute: PropTypes.string,
  editEntryRoute: PropTypes.string,
  tableCategory: PropTypes.string,
  deleteEntry: PropTypes.func,
  apiType: PropTypes.string,
};

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
  if (props.tableCategory != "Phish Reconnaissance") {
    columns.push({
      field: "edit",
      headerName: "Edit",
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (cellValues) => {
        return (
          <IconButton
            variant="contained"
            color="primary"
            onClick={() => {
              navigate(`${props.editEntryRoute}`, {
                state: {
                  row: cellValues.row,
                  dataEntryType: "edit",
                  rows: rows,
                },
              });
            }}
          >
            <EditIcon />
          </IconButton>
        );
      },
      width: 80,
    });
  } else {
    pageSize = 5;
    rowsPerPage = 5;
    density = "compact";
  }
  if (
    props.tableCategory == "Sending Domains"
    // || props.tableCategory == "Landing Pages"
  ) {
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
  }

  const confirmDelete = () => {
    props.deleteEntry(props.apiType, rowData._id, setError);
    setTimeout(() => {
      setDeletebtnOpen(false);
      setDelete(true);
    });
  };
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

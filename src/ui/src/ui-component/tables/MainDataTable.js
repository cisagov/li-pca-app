import * as React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

// material-ui
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
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
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";

function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

CustomToolbar.propTypes = {
  clearSearch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  newEntryRoute: PropTypes.string.isRequired,
};

function CustomToolbar(props) {
  let navigate = useNavigate();
  const values = {};
  return (
    <GridToolbarContainer>
      <Box
        sx={{
          p: 0.5,
          pb: 0,
        }}
      >
        <TextField
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
            width: {
              xs: 1,
              sm: "auto",
            },
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
      </Box>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
      <Button
        size="small"
        startIcon={<AddIcon fontSize="small" />}
        onClick={() => {
          navigate(`${props.newEntryRoute}`, {
            state: { row: values, dataEntryType: "new" },
          });
        }}
      >
        New Row
      </Button>
    </GridToolbarContainer>
  );
}

MainDataTable.propTypes = {
  data: PropTypes.object.isRequired,
  newEntryRoute: PropTypes.string,
  editEntryRoute: PropTypes.string,
};

export default function MainDataTable(props) {
  let navigate = useNavigate();
  const [searchText, setSearchText] = React.useState("");
  const [rows, setRows] = React.useState(props.data.rows);
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
        <IconButton
          variant="contained"
          color="primary"
          onClick={() => {
            navigate(`${props.editEntryRoute}`, {
              state: { row: cellValues.row, dataEntryType: "edit" },
            });
          }}
        >
          <EditIcon />
        </IconButton>
      );
    },
    flex: 0.5,
  });
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      autoHeight
      components={{
        Toolbar: CustomToolbar,
      }}
      pageSize={10}
      rowsPerPageOptions={[10]}
      componentsProps={{
        toolbar: {
          value: searchText,
          onChange: (event) => requestSearch(event.target.value),
          clearSearch: () => requestSearch(""),
          newEntryRoute: props.newEntryRoute,
        },
      }}
    />
  );
}

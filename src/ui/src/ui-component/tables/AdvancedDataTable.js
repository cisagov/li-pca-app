import * as React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

// material-ui
import ArchiveIcon from "@mui/icons-material/Archive";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ClearIcon from "@mui/icons-material/Clear";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EditIcon from "@mui/icons-material/Edit";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import SearchIcon from "@mui/icons-material/Search";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";

// Tabler icons
import { IconDownload, IconPlus } from "@tabler/icons";

// project imports
import ConfirmDialog from "ui-component/popups/ConfirmDialog";
import ResultDialog from "ui-component/popups/ResultDialog";
import { useRetire } from "services/api.js";

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
  selectedRows: PropTypes.array,
  confirmRetire: PropTypes.func,
};

function CustomToolbar(props) {
  let navigate = useNavigate();
  const values = {};

  let isDisabled = true;
  if (props.selectedRows.length !== 0) {
    isDisabled = false;
  }

  return (
    <GridToolbarContainer>
      <Grid container>
        <Grid item xs={11} sm={7} md={5} lg={5} xl={4} sx={{ p: 0.5 }}>
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
              "& .MuiSvgIcon-root": { mr: 0.5 },
              "& .MuiInput-underline:before": {
                borderBottom: 1,
                borderColor: "divider",
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={11} lg={11} xl={7} sx={{ p: 1, pl: 1 }}>
          <GridToolbarColumnsButton />
          <GridToolbarFilterButton />
          <Button
            size="small"
            startIcon={<IconDownload size={18} />}
            onClick={() => confirm("Download all templates?")}
          >
            Export
          </Button>
          <Button
            size="small"
            startIcon={<IconPlus size={18} />}
            onClick={() => {
              navigate(`${props.newEntryRoute}`, {
                state: { row: values, dataEntryType: "new", rows: props.rows },
              });
            }}
          >
            New {props.tableCategory}
          </Button>
          <Button
            color="error"
            size="small"
            startIcon={<ArchiveIcon />}
            onClick={props.confirmRetire}
            disabled={isDisabled}
          >
            Retire
          </Button>
          <Button
            color="inherit"
            size="small"
            startIcon={<ContentCopyIcon />}
            onClick={() => console.log(props.selectedRows)}
            disabled={isDisabled}
          >
            Duplicate
          </Button>
          <Button
            color="secondary"
            size="small"
            startIcon={<MailOutlineIcon />}
            onClick={() => console.log(props.selectedRows)}
            disabled={isDisabled}
          >
            Test
          </Button>
        </Grid>
      </Grid>
    </GridToolbarContainer>
  );
}

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
  const [retire, setRetire] = React.useState(false);
  const [retirebtnOpen, setRetirebtnOpen] = React.useState(false);

  const confirmRetire = () => {
    setRetirebtnOpen(true);
  };
  const toRetire = () => {
    setRetire(true);
    setRetirebtnOpen(false);
  };

  let getError = useRetire(props.apiType, retire, selectedRows);
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
            const selectedRows = rows.filter((row) => selectedIDs.has(row.id));
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

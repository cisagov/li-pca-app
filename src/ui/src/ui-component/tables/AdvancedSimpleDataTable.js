import { useEffect, useState } from "react";
import PropTypes from "prop-types";

// material-ui
import Box from "@mui/material/Box";
import ClearIcon from "@mui/icons-material/Clear";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";

function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

CustomToolbar.propTypes = {
  clearSearch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  rows: PropTypes.array,
};

function CustomToolbar(props) {
  return (
    <GridToolbarContainer>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Box sx={{ p: 0.5, pb: 0 }}>
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
                width: { xs: 1, sm: "auto" },
                m: (theme) => theme.spacing(1, 0.5, 1.5),
                "& .MuiSvgIcon-root": { mr: 0.5 },
                "& .MuiInput-underline:before": {
                  borderBottom: 1,
                  borderColor: "divider",
                },
              }}
            />
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
          </Box>
        </Grid>
      </Grid>
    </GridToolbarContainer>
  );
}

AdvancedSimpleDataTable.propTypes = {
  data: PropTypes.object,
  handleRowClick: PropTypes.func,
};

export default function AdvancedSimpleDataTable(props) {
  const [searchText, setSearchText] = useState("");
  const [rows, setRows] = useState(props.data.rows);
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

  useEffect(() => {
    setRows(props.data.rows);
  }, [props.data.rows]);

  const columns = props.data.columns;
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight
          components={{ Toolbar: CustomToolbar }}
          pageSize={10}
          rowsPerPageOptions={[10]}
          density="compact"
          getRowId={(row) => row._id}
          onRowClick={props.handleRowClick}
          componentsProps={{
            toolbar: {
              value: searchText,
              onChange: (event) => requestSearch(event.target.value),
              clearSearch: () => requestSearch(""),
              rows: rows,
            },
          }}
        />
      </Box>
    </>
  );
}

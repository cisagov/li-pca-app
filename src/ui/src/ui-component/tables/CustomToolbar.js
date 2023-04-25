import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

// material-ui
import ArchiveIcon from "@mui/icons-material/Archive";
import Button from "@mui/material/Button";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Grid from "@mui/material/Grid";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
} from "@mui/x-data-grid";

// Tabler icons
import { IconPlus } from "@tabler/icons";

// project imports
import SearchTextField from "./SearchTextField";

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

/**
  Custom toolbar component for a Material UI Data Grid table.
  @param {object} props - Props for the component.
  @param {string} props.tableCategory - The category of the table.
  @param {string} props.newEntryRoute - The route for a new data entry.
  @param {Array} props.rows - The rows of the table.
  @param {Array} props.selectedRows - The selected rows of the table.
  @param {string} props.value - The value of the search text field.
  @param {function} props.onChange - The function to handle changes to the search text field.
  @param {function} props.clearSearch - The function to clear the search text field.
  @param {function} props.confirmRetire - The function to confirm retiring an item.
  @returns {JSX.Element} Custom toolbar component for a Material UI Data Grid table.
  */
function CustomToolbar(props) {
  let navigate = useNavigate();
  const values = Object.create(null);

  let isDisabled = true;
  if (props.selectedRows && props.selectedRows.length !== 0) {
    isDisabled = false;
  }

  const newEntryButton =
    props.tableCategory !== "Phish Reconnaissance" ? (
      <Button
        size="small"
        sx={{ "& .MuiButton-startIcon": { marginRight: "1.8px" } }}
        startIcon={<IconPlus size={18} />}
        onClick={() => {
          navigate(`${props.newEntryRoute}`, {
            state: { row: values, dataEntryType: "new", rows: props.rows },
          });
        }}
      >
        New {props.tableCategory}
      </Button>
    ) : null;

  const templateButtons =
    props.tableCategory === "Template" ? (
      <>
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
      </>
    ) : null;
  const sz = props.tableCategory === "Template" ? 11 : 7;
  return (
    <GridToolbarContainer>
      <Grid container>
        <Grid item xs={11} sm={7} md={5} lg={5} xl={4} sx={{ p: 0.5 }}>
          <SearchTextField
            value={props.value}
            onChange={props.onChange}
            clearSearch={props.clearSearch}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={sz} lg={sz} xl={7} sx={{ p: 1, pl: 1 }}>
          <GridToolbarColumnsButton />
          <GridToolbarFilterButton />
          <GridToolbarExport />
          {newEntryButton}
          {templateButtons}
        </Grid>
      </Grid>
    </GridToolbarContainer>
  );
}

export default CustomToolbar;

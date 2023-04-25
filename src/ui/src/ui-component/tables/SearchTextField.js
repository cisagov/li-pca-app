import PropTypes from "prop-types";

// material-ui
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";

/**
 * A reusable search text field component.
 *
 * @param {Object} props - The component props.
 * @param {string} props.value - The current value of the search field.
 * @param {function} props.onChange - A callback function to handle changes to the search field value.
 * @param {function} props.clearSearch - A callback function to clear the search field.
 * @returns {JSX.Element} - The rendered SearchTextField component.
 */
function SearchTextField({ value, onChange, clearSearch }) {
  return (
    <TextField
      fullWidth
      variant="standard"
      value={value}
      onChange={onChange}
      placeholder="Search…"
      InputProps={{
        startAdornment: <SearchIcon fontSize="small" />,
        endAdornment: (
          <IconButton
            title="Clear"
            aria-label="Clear"
            size="small"
            style={{ visibility: value ? "visible" : "hidden" }}
            onClick={clearSearch}
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
}

SearchTextField.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  clearSearch: PropTypes.func.isRequired,
};

export default SearchTextField;

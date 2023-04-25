import PropTypes from "prop-types";

// material-ui
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";

/**
 * A reusable button component for editing a data entry.
 * @param {object} props - The props object for the component.
 * @param {Object} props.row - The row object to be edited.
 * @param {Array} props.rows - An array of all rows to be edited.
 * @param {Function} props.navigate - The function to navigate to the edit page.
 * @param {String} props.editEntryRoute - The route to the edit page.
 * @returns {JSX.Element} - The EditButton component.
 * @returns {JSX.Element} A button element for editing a data entry.
 */
function EditButton({ row, rows, navigate, editEntryRoute }) {
  const handleEdit = () => {
    navigate(`${editEntryRoute}`, {
      state: {
        row: row,
        dataEntryType: "edit",
        rows: rows,
      },
    });
  };

  return (
    <IconButton variant="contained" color="primary" onClick={handleEdit}>
      <EditIcon />
    </IconButton>
  );
}

EditButton.propTypes = {
  row: PropTypes.object,
  rows: PropTypes.array,
  navigate: PropTypes.func,
  editEntryRoute: PropTypes.string,
};

export default EditButton;

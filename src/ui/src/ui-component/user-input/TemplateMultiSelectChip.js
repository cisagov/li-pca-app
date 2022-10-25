import PropTypes from "prop-types";

//material-ui
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import { Tooltip } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

TemplateMultiSelectChip.propTypes = {
  setSelection: PropTypes.func,
  label: PropTypes.string,
  selection: PropTypes.array,
  values: PropTypes.array,
};

export default function TemplateMultiSelectChip(props) {
  const handleChange = (event) => {
    const value = event.target.value;
    props.setSelection(typeof value === "string" ? value.split(",") : value);
  };
  return (
    <div>
      <FormControl sx={{ width: "100%" }} size="small">
        <InputLabel>{props.label}</InputLabel>
        <Select
          multiple
          value={props.selection}
          onChange={handleChange}
          input={<OutlinedInput label={props.label} />}
          renderValue={(selection) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selection.map((value) => {
                let entry = props.values.filter(function (entry) {
                  return entry.title == value;
                });
                let description = entry[0].recommendation_description;
                return (
                  <Tooltip title={description} placement="right">
                    <Chip key={value} label={value} />
                  </Tooltip>
                );
              })}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {props.values.map((entry) => {
            const des = entry.recommendation_description;
            const title = entry.title;
            return (
              <Tooltip title={des} key={title} value={title} placement="right">
                <MenuItem key={title} value={title}>
                  {title}
                </MenuItem>
              </Tooltip>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}

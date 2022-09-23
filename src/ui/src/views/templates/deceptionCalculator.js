import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

const DeceptionCalculator = () => {
  const [isSmall, setIsSmall] = React.useState(false);
  const handleResize = () => {
    if (window.innerWidth < 900) {
      setIsSmall(true);
    } else {
      setIsSmall(false);
    }
  };
  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
  });
  const radioSize = {
    "& .MuiSvgIcon-root": { fontSize: 15 },
  };
  const radioLabelSize = {
    "& .MuiFormControlLabel-label": { fontSize: 13.5 },
  };
  return (
    <form>
      <Typography variant="h4" sx={{ mb: 1 }}>
        Appearance
      </Typography>
      <FormLabel>Grammar</FormLabel>
      <RadioGroup row={isSmall} defaultValue="0 Poor">
        <FormControlLabel
          sx={radioLabelSize}
          value="poor"
          control={<Radio sx={radioSize} />}
          label="0 = Poor"
        />
        <FormControlLabel
          sx={radioLabelSize}
          value="decent"
          control={<Radio sx={radioSize} />}
          label="1 = Decent"
        />
        <FormControlLabel
          sx={radioLabelSize}
          value="proper"
          control={<Radio sx={radioSize} />}
          label="2 = Proper"
        />
      </RadioGroup>
      <FormLabel>Link / Domain</FormLabel>
      <RadioGroup row={isSmall} defaultValue="0 = Unrelated">
        <FormControlLabel
          sx={radioLabelSize}
          value="poor"
          control={<Radio sx={radioSize} />}
          label="0 = Unrelated"
        />
        <FormControlLabel
          sx={radioLabelSize}
          value="decent"
          control={<Radio sx={radioSize} />}
          label="1 = Related/Hidden/Spoofed"
        />
      </RadioGroup>
      <FormLabel>Logo / Graphics</FormLabel>
      <RadioGroup row={isSmall} defaultValue="0 = Plain Text">
        <FormControlLabel
          sx={radioLabelSize}
          value="poor"
          control={<Radio sx={radioSize} />}
          label="0 = Poor"
          // onChange={() => console.log()}
        />
        <FormControlLabel
          sx={radioLabelSize}
          value="decent"
          control={<Radio sx={radioSize} />}
          label="1 = Decent"
        />
        <FormControlLabel
          sx={radioLabelSize}
          value="proper"
          control={<Radio sx={radioSize} />}
          label="2 = Proper"
        />
      </RadioGroup>
      <Typography variant="h4" sx={{ mb: 1 }}>
        Sender
      </Typography>
      <FormLabel>External</FormLabel>
      <RadioGroup row={isSmall} defaultValue="0 = Not External/Unspecified">
        <FormControlLabel
          sx={radioLabelSize}
          value="not_external"
          control={<Radio sx={radioSize} />}
          label="0 = Not External/Unspecified"
        />
        <FormControlLabel
          sx={radioLabelSize}
          value="specified"
          control={<Radio sx={radioSize} />}
          label="1 = Specified"
        />
      </RadioGroup>
      <FormLabel>Internal</FormLabel>
      <RadioGroup row={isSmall} defaultValue="0 = Not Internal/Unspecified">
        <FormControlLabel
          sx={radioLabelSize}
          value="not_internal"
          control={<Radio sx={radioSize} />}
          label="0 = Not Internal/Unspecified"
        />
        <FormControlLabel
          sx={radioLabelSize}
          value="generic"
          control={<Radio sx={radioSize} />}
          label="1 = Generic/Close"
        />
        <FormControlLabel
          sx={radioLabelSize}
          value="spoofed"
          control={<Radio sx={radioSize} />}
          label="1 = Spoofed"
        />
      </RadioGroup>
      <FormLabel>Authoritative</FormLabel>
      <RadioGroup row={isSmall} defaultValue="0 = None">
        <FormControlLabel
          sx={radioLabelSize}
          value="none"
          control={<Radio sx={radioSize} />}
          label="0 = None"
          // onChange={() => console.log()}
        />
        <FormControlLabel
          sx={radioLabelSize}
          value="peer"
          control={<Radio sx={radioSize} />}
          label="1 = Peer"
          // onChange={() => console.log()}
        />
        <FormControlLabel
          sx={radioLabelSize}
          value="superior"
          control={<Radio sx={radioSize} />}
          label="2 = Superior"
        />
      </RadioGroup>
      <Typography variant="h4" sx={{ mb: 1 }}>
        Relevancy
      </Typography>
      <FormLabel>Organization</FormLabel>
      <RadioGroup row={isSmall} defaultValue="0 = No">
        <FormControlLabel
          sx={radioLabelSize}
          value="no"
          control={<Radio sx={radioSize} />}
          label="0 = No"
          // onChange={() => console.log()}
        />
        <FormControlLabel
          sx={radioLabelSize}
          value="yes"
          control={<Radio sx={radioSize} />}
          label="1 = Yes"
          // onChange={() => console.log()}
        />
      </RadioGroup>
      <FormLabel>Public News</FormLabel>
      <RadioGroup row={isSmall} defaultValue="0 = No">
        <FormControlLabel
          sx={radioLabelSize}
          value="no"
          control={<Radio sx={radioSize} />}
          label="0 = No"
          // onChange={() => console.log()}
        />
        <FormControlLabel
          sx={radioLabelSize}
          value="yes"
          control={<Radio sx={radioSize} />}
          size="small"
          label="1 = Yes"
          // onChange={() => console.log()}
        />
      </RadioGroup>
      <FormLabel>Behavior</FormLabel>
      <FormGroup row={isSmall}>
        <FormControlLabel
          sx={radioLabelSize}
          control={<Checkbox size="small" />}
          label="Fear"
          // onChange={() => console.log()}
        />
        <FormControlLabel
          sx={radioLabelSize}
          control={<Checkbox size="small" />}
          label="Duty or Oblication"
        />
        <FormControlLabel
          sx={radioLabelSize}
          control={<Checkbox size="small" />}
          label="Curiosity"
        />
        <FormControlLabel
          sx={radioLabelSize}
          control={<Checkbox size="small" />}
          label="Greed"
        />
      </FormGroup>
    </form>
  );
};
export default DeceptionCalculator;

import { useState, useEffect } from "react";
import PropTypes from "prop-types";

// material-ui
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Typography from "@mui/material/Typography";

const DeceptionCalculator = (props) => {
  const indicators = props.templateData.indicators;
  const [isSmall, setIsSmall] = useState(false);
  const [deceptionValues, setDeceptionVals] = useState({
    grammar: indicators.appearance.grammar,
    link_domain: indicators.appearance.link_domain,
    logo_graphics: indicators.appearance.logo_graphics,
    external: indicators.sender.external,
    internal: indicators.sender.internal,
    authoritative: indicators.sender.authoritative,
    organization: indicators.relevancy.organization,
    public_news: indicators.relevancy.public_news,
  });
  let score = Object.values(deceptionValues).reduce((a, b) => a + b, 0);
  const handleResize = () => {
    if (window.innerWidth < 900) {
      setIsSmall(true);
    } else {
      setIsSmall(false);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });
  const radioSize = {
    "& .MuiSvgIcon-root": { fontSize: 15.5 },
  };
  const radioLabelSize = {
    "& .MuiFormControlLabel-label": { fontSize: 13.5 },
    mt: -0.5,
  };
  const changeVal = (indicatorType, type, val) => {
    if (indicatorType != "behavior") {
      const newValues = {
        ...deceptionValues,
        [type]: val,
      };
      setDeceptionVals(newValues);
      score = Object.values(newValues).reduce((a, b) => a + b, 0);
    }
    props.setTemplateData({
      ...props.templateData,
      deception_score: score,
      indicators: {
        ...indicators,
        [indicatorType]: {
          ...indicators[indicatorType],
          [type]: val,
        },
      },
    });
  };
  return (
    <Grid item xs={12} md={3.6} lg={3.6} xl={3.6}>
      <Typography variant="h3" gutterBottom component="div" color="primary">
        Deception Calculator
      </Typography>
      <Typography variant="body1" color="black" sx={{ mb: 1 }}>
        Final Deception Score: {" " + props.templateData.deception_score}
      </Typography>
      <form>
        <Typography variant="h4" sx={{ mb: 1 }}>
          Appearance
        </Typography>
        <FormLabel>Grammar</FormLabel>
        <RadioGroup
          row={isSmall}
          defaultValue={indicators.appearance["grammar"]}
          onChange={(e) =>
            changeVal("appearance", "grammar", parseInt(e.target.value))
          }
        >
          <FormControlLabel
            sx={radioLabelSize}
            value={0}
            control={<Radio sx={radioSize} />}
            label="0 = Poor"
          />
          <FormControlLabel
            sx={radioLabelSize}
            value={1}
            control={<Radio sx={radioSize} />}
            label="1 = Decent"
          />
          <FormControlLabel
            sx={radioLabelSize}
            value={2}
            control={<Radio sx={radioSize} />}
            label="2 = Proper"
          />
        </RadioGroup>
        <FormLabel>Link / Domain</FormLabel>
        <RadioGroup
          row={isSmall}
          defaultValue={indicators.appearance["link_domain"]}
          onChange={(e) =>
            changeVal("appearance", "link_domain", parseInt(e.target.value))
          }
        >
          <FormControlLabel
            sx={radioLabelSize}
            value={0}
            control={<Radio sx={radioSize} />}
            label="0 = Unrelated"
          />
          <FormControlLabel
            sx={radioLabelSize}
            value={1}
            control={<Radio sx={radioSize} />}
            label="1 = Related/Hidden/Spoofed"
          />
        </RadioGroup>
        <FormLabel>Logo / Graphics</FormLabel>
        <RadioGroup
          row={isSmall}
          defaultValue={indicators.appearance["logo_graphics"]}
          onChange={(e) =>
            changeVal("appearance", "logo_graphics", parseInt(e.target.value))
          }
        >
          <FormControlLabel
            sx={radioLabelSize}
            value={0}
            control={<Radio sx={radioSize} />}
            label="0 = Poor"
          />
          <FormControlLabel
            sx={radioLabelSize}
            value={1}
            control={<Radio sx={radioSize} />}
            label="1 = Decent"
          />
          <FormControlLabel
            sx={radioLabelSize}
            value={2}
            control={<Radio sx={radioSize} />}
            label="2 = Proper"
          />
        </RadioGroup>
        <Typography variant="h4" sx={{ mb: 1 }}>
          Sender
        </Typography>
        <FormLabel>External</FormLabel>
        <RadioGroup
          row={isSmall}
          defaultValue={indicators.sender["external"]}
          onChange={(e) =>
            changeVal("sender", "external", parseInt(e.target.value))
          }
        >
          <FormControlLabel
            sx={radioLabelSize}
            value={0}
            control={<Radio sx={radioSize} />}
            label="0 = Not External/Unspecified"
          />
          <FormControlLabel
            sx={radioLabelSize}
            value={1}
            control={<Radio sx={radioSize} />}
            label="1 = Specified"
          />
        </RadioGroup>
        <FormLabel>Internal</FormLabel>
        <RadioGroup
          row={isSmall}
          defaultValue={indicators.sender["internal"]}
          onChange={(e) =>
            changeVal("sender", "internal", parseInt(e.target.value))
          }
        >
          <FormControlLabel
            sx={radioLabelSize}
            value={0}
            control={<Radio sx={radioSize} />}
            label="0 = Not Internal/Unspecified"
          />
          <FormControlLabel
            sx={radioLabelSize}
            value={1}
            control={<Radio sx={radioSize} />}
            label="1 = Generic/Close"
          />
          <FormControlLabel
            sx={radioLabelSize}
            value={2}
            control={<Radio sx={radioSize} />}
            label="2 = Spoofed"
          />
        </RadioGroup>
        <FormLabel>Authoritative</FormLabel>
        <RadioGroup
          row={isSmall}
          defaultValue={indicators.sender["authoritative"]}
          onChange={(e) =>
            changeVal("sender", "authoritative", parseInt(e.target.value))
          }
        >
          <FormControlLabel
            sx={radioLabelSize}
            value={0}
            control={<Radio sx={radioSize} />}
            label="0 = None"
          />
          <FormControlLabel
            sx={radioLabelSize}
            value={1}
            control={<Radio sx={radioSize} />}
            label="1 = Peer"
          />
          <FormControlLabel
            sx={radioLabelSize}
            value={2}
            control={<Radio sx={radioSize} />}
            label="2 = Superior"
          />
        </RadioGroup>
        <Typography variant="h4" sx={{ mb: 1 }}>
          Relevancy
        </Typography>
        <FormLabel>Organization</FormLabel>
        <RadioGroup
          row
          defaultValue={indicators.relevancy["organization"]}
          onChange={(e) =>
            changeVal("relevancy", "organization", parseInt(e.target.value))
          }
        >
          <FormControlLabel
            sx={radioLabelSize}
            value={0}
            control={<Radio sx={radioSize} />}
            label="0 = No"
          />
          <FormControlLabel
            sx={radioLabelSize}
            value={1}
            control={<Radio sx={radioSize} />}
            label="1 = Yes"
          />
        </RadioGroup>
        <FormLabel>Public News</FormLabel>
        <RadioGroup
          row
          defaultValue={indicators.relevancy["public_news"]}
          onChange={(e) =>
            changeVal("relevancy", "public_news", parseInt(e.target.value))
          }
        >
          <FormControlLabel
            sx={radioLabelSize}
            value={0}
            control={<Radio sx={radioSize} />}
            label="0 = No"
          />
          <FormControlLabel
            sx={radioLabelSize}
            value={1}
            control={<Radio sx={radioSize} />}
            size="small"
            label="1 = Yes"
          />
        </RadioGroup>
        <FormLabel>Behavior</FormLabel>
        <FormGroup
          row={isSmall}
          onChange={(e) =>
            changeVal("behavior", e.target.value, e.target.checked)
          }
        >
          <FormControlLabel
            sx={radioLabelSize}
            control={
              <Checkbox
                size="small"
                value="fear"
                checked={indicators.behavior["fear"]}
              />
            }
            label="Fear"
          />
          <FormControlLabel
            sx={radioLabelSize}
            control={
              <Checkbox
                size="small"
                value="duty_obligation"
                checked={indicators.behavior["duty_obligation"]}
              />
            }
            label="Duty or Oblication"
          />
          <FormControlLabel
            sx={radioLabelSize}
            control={
              <Checkbox
                size="small"
                value="curiosity"
                checked={indicators.behavior["curiosity"]}
              />
            }
            label="Curiosity"
          />
          <FormControlLabel
            sx={radioLabelSize}
            control={
              <Checkbox
                size="small"
                value="greed"
                checked={indicators.behavior["greed"]}
              />
            }
            label="Greed"
          />
        </FormGroup>
      </form>
    </Grid>
  );
};

DeceptionCalculator.propTypes = {
  templateData: PropTypes.object,
  setTemplateData: PropTypes.func,
};

export default DeceptionCalculator;

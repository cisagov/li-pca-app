import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Typography from "@mui/material/Typography";

const DeceptionCalculator = () => {
  const [isSmall, setIsSmall] = React.useState(false);
  const [grammar, setGrammar] = React.useState(0);
  const [link, setLink] = React.useState(0);
  const [logo, setLogo] = React.useState(0);
  const [external, setExternal] = React.useState(0);
  const [internal, setInternal] = React.useState(0);
  const [authoritative, setAuthoritative] = React.useState(0);
  const [organization, setOrganization] = React.useState(0);
  const [publicNews, setPublicNews] = React.useState(0);
  const [behavior, setBehavior] = React.useState([]);
  // let deception = {
  //   grammar: grammar,
  //   link: link,
  //   logo: logo,
  //   external: external,
  //   internal: internal,
  //   authoritative: authoritative,
  //   organization: organization,
  //   publicNews: publicNews,
  //   behavior: behavior,
  // };
  let score =
    grammar +
    link +
    logo +
    external +
    internal +
    authoritative +
    organization +
    publicNews;
  const handleChecked = (checked, value) => {
    if (checked) {
      setBehavior((behavior) => [...behavior, value]);
    } else {
      setBehavior(behavior.filter((item) => item !== value));
    }
  };
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
    "& .MuiSvgIcon-root": { fontSize: 15.5 },
  };
  const radioLabelSize = {
    "& .MuiFormControlLabel-label": { fontSize: 13.5 },
    mt: -0.5,
  };
  return (
    <Grid item xs={12} md={3.6} lg={3.6} xl={3.6}>
      <Typography variant="h3" gutterBottom component="div" color="primary">
        Deception Calculator
      </Typography>
      <Typography variant="body1" color="black" sx={{ mb: 1 }}>
        Final Deception Score: {" " + score}
      </Typography>
      <form>
        <Typography variant="h4" sx={{ mb: 1 }}>
          Appearance
        </Typography>
        <FormLabel>Grammar</FormLabel>
        <RadioGroup row={isSmall} defaultValue="0 Poor">
          <FormControlLabel
            sx={radioLabelSize}
            value="poor"
            control={<Radio sx={radioSize} onChange={() => setGrammar(0)} />}
            label="0 = Poor"
          />
          <FormControlLabel
            sx={radioLabelSize}
            value="decent"
            control={<Radio sx={radioSize} onChange={() => setGrammar(1)} />}
            label="1 = Decent"
          />
          <FormControlLabel
            sx={radioLabelSize}
            value="proper"
            control={<Radio sx={radioSize} onChange={() => setGrammar(2)} />}
            label="2 = Proper"
          />
        </RadioGroup>
        <FormLabel>Link / Domain</FormLabel>
        <RadioGroup row={isSmall} defaultValue="0 = Unrelated">
          <FormControlLabel
            sx={radioLabelSize}
            value="poor"
            control={<Radio sx={radioSize} onChange={() => setLink(0)} />}
            label="0 = Unrelated"
          />
          <FormControlLabel
            sx={radioLabelSize}
            value="decent"
            control={<Radio sx={radioSize} onChange={() => setLink(1)} />}
            label="1 = Related/Hidden/Spoofed"
          />
        </RadioGroup>
        <FormLabel>Logo / Graphics</FormLabel>
        <RadioGroup row={isSmall} defaultValue="0 = Plain Text">
          <FormControlLabel
            sx={radioLabelSize}
            value="poor"
            control={<Radio sx={radioSize} onChange={() => setLogo(0)} />}
            label="0 = Poor"
          />
          <FormControlLabel
            sx={radioLabelSize}
            value="decent"
            control={<Radio sx={radioSize} onChange={() => setLogo(1)} />}
            label="1 = Decent"
          />
          <FormControlLabel
            sx={radioLabelSize}
            value="proper"
            control={<Radio sx={radioSize} onChange={() => setLogo(2)} />}
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
            control={<Radio sx={radioSize} onChange={() => setExternal(0)} />}
            label="0 = Not External/Unspecified"
          />
          <FormControlLabel
            sx={radioLabelSize}
            value="specified"
            control={<Radio sx={radioSize} onChange={() => setExternal(1)} />}
            label="1 = Specified"
          />
        </RadioGroup>
        <FormLabel>Internal</FormLabel>
        <RadioGroup row={isSmall} defaultValue="0 = Not Internal/Unspecified">
          <FormControlLabel
            sx={radioLabelSize}
            value="not_internal"
            control={<Radio sx={radioSize} onChange={() => setInternal(0)} />}
            label="0 = Not Internal/Unspecified"
          />
          <FormControlLabel
            sx={radioLabelSize}
            value="generic"
            control={<Radio sx={radioSize} onChange={() => setInternal(1)} />}
            label="1 = Generic/Close"
          />
          <FormControlLabel
            sx={radioLabelSize}
            value="spoofed"
            control={<Radio sx={radioSize} onChange={() => setInternal(2)} />}
            label="2 = Spoofed"
          />
        </RadioGroup>
        <FormLabel>Authoritative</FormLabel>
        <RadioGroup row={isSmall} defaultValue="0 = None">
          <FormControlLabel
            sx={radioLabelSize}
            value="none"
            control={
              <Radio sx={radioSize} onChange={() => setAuthoritative(0)} />
            }
            label="0 = None"
          />
          <FormControlLabel
            sx={radioLabelSize}
            value="peer"
            control={
              <Radio sx={radioSize} onChange={() => setAuthoritative(1)} />
            }
            label="1 = Peer"
          />
          <FormControlLabel
            sx={radioLabelSize}
            value="superior"
            control={
              <Radio sx={radioSize} onChange={() => setAuthoritative(2)} />
            }
            label="2 = Superior"
          />
        </RadioGroup>
        <Typography variant="h4" sx={{ mb: 1 }}>
          Relevancy
        </Typography>
        <FormLabel>Organization</FormLabel>
        <RadioGroup row defaultValue="0 = No">
          <FormControlLabel
            sx={radioLabelSize}
            value="no"
            control={
              <Radio sx={radioSize} onChange={() => setOrganization(0)} />
            }
            label="0 = No"
          />
          <FormControlLabel
            sx={radioLabelSize}
            value="yes"
            control={
              <Radio sx={radioSize} onChange={() => setOrganization(1)} />
            }
            label="1 = Yes"
          />
        </RadioGroup>
        <FormLabel>Public News</FormLabel>
        <RadioGroup row defaultValue="0 = No">
          <FormControlLabel
            sx={radioLabelSize}
            value="no"
            control={<Radio sx={radioSize} onChange={() => setPublicNews(0)} />}
            label="0 = No"
          />
          <FormControlLabel
            sx={radioLabelSize}
            value="yes"
            control={<Radio sx={radioSize} onChange={() => setPublicNews(1)} />}
            size="small"
            label="1 = Yes"
          />
        </RadioGroup>
        <FormLabel>Behavior</FormLabel>
        <FormGroup row={isSmall}>
          <FormControlLabel
            sx={radioLabelSize}
            control={
              <Checkbox
                size="small"
                value="fear"
                onChange={(e) =>
                  handleChecked(e.target.checked, e.target.value)
                }
              />
            }
            label="Fear"
          />
          <FormControlLabel
            sx={radioLabelSize}
            control={
              <Checkbox
                size="small"
                value="duty"
                onChange={(e) =>
                  handleChecked(e.target.checked, e.target.value)
                }
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
                onChange={(e) =>
                  handleChecked(e.target.checked, e.target.value)
                }
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
                onChange={(e) =>
                  handleChecked(e.target.checked, e.target.value)
                }
              />
            }
            label="Greed"
          />
        </FormGroup>
      </form>
    </Grid>
  );
};
export default DeceptionCalculator;

import PropTypes from "prop-types";

//material-ui
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";

// assets
import { IconCircleCheck, IconCircleX } from "@tabler/icons";

const ResultDialog = (props) => {
  let bigIcon = <IconCircleCheck color="#00b341" size={100} stroke={1} />;
  let title = "Success";
  let subtitle = [props.type + " changes have been made successfully."];

  if (props.error[0]) {
    bigIcon = <IconCircleX color="#E62C22" size={100} stroke={1} />;
    title = props.error[1];
    subtitle = [props.type + " changes were unable to be saved."];
    subtitle.push(<br key="1" />);
    subtitle.push("Check docker or console logs for more details.");
  }

  return (
    <Dialog open={props.hasSubmitted}>
      <Grid sx={{ textAlign: "center" }}>
        <DialogTitle sx={{ fontSize: 20 }}>
          <Grid item sx={{ mt: 2 }}>
            {bigIcon}
          </Grid>
          <Grid item>{title}</Grid>
        </DialogTitle>
        <DialogContent>
          <Grid item>
            <DialogContentText sx={{ fontSize: 16 }}>
              {subtitle}
            </DialogContentText>
          </Grid>
          <Grid item sx={{ mt: 3, mb: 1 }}>
            <Button
              sx={{ width: "30%" }}
              onClick={props.closeDialog}
              size="large"
              variant="contained"
            >
              Ok
            </Button>
          </Grid>
        </DialogContent>
      </Grid>
    </Dialog>
  );
};

ResultDialog.propTypes = {
  type: PropTypes.string,
  hasSubmitted: PropTypes.bool,
  error: PropTypes.array,
  closeDialog: PropTypes.func,
};

export default ResultDialog;

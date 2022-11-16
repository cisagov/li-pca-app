import PropTypes from "prop-types";

//material-ui
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";

// assets
import { IconAlertCircle } from "@tabler/icons";

const AlertDialog = (props) => {
  return (
    <Dialog open={props.isOpen} maxWidth="xs">
      <Grid sx={{ textAlign: "center" }}>
        <DialogTitle sx={{ fontSize: 20 }}>
          <Grid item sx={{ mt: 2 }}>
            <IconAlertCircle color="#ffc107" size={100} stroke={1} />
          </Grid>
          <Grid item>{props.title}</Grid>
        </DialogTitle>
        <DialogContent>
          <Grid item>
            <DialogContentText sx={{ fontSize: 16 }}>
              {props.subtitle}
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

AlertDialog.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  isOpen: PropTypes.bool,
  closeDialog: PropTypes.func,
  setIsOpen: PropTypes.func,
};

export default AlertDialog;

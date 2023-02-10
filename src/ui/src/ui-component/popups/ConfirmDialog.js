import { useState } from "react";
import PropTypes from "prop-types";

//material-ui
import ArchiveIcon from "@mui/icons-material/Archive";
import Button from "@mui/material/Button";
import CancelScheduleSendIcon from "@mui/icons-material/CancelScheduleSend";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

// assets
import { IconAlertCircle } from "@tabler/icons";

const ConfirmDialog = (props) => {
  const [getDeleteText, setDeleteText] = useState("");
  let title = "Do you want to save changes to this entry?";
  let confirmType = props.confirmType;
  let endIcon = <CheckCircleOutlineIcon />;
  let color = "primary";
  let confirmButton = <Button />;
  let cancel = "Cancel";

  const isDisabled = () => {
    if (confirmType == "Delete") {
      if (getDeleteText == "DELETE") {
        return false;
      }
      return true;
    }
    return false;
  };
  if (confirmType == "Leave") {
    title = "Are you sure you want to leave this page?";
    endIcon = <ExitToAppIcon />;
    color = "secondary";
  }
  if (confirmType == "Delete") {
    title = "Are you sure you want to delete this entry?";
    endIcon = <DeleteIcon />;
    color = "error";
  }
  if (confirmType == "Retire") {
    title = "Are you sure you want to retire these record(s)?";
    endIcon = <ArchiveIcon />;
  }
  if (confirmType == "Cancel Send") {
    title = "Are you sure you want to cancel sending?";
    endIcon = <CancelScheduleSendIcon />;
    color = "error";
    cancel = "Close";
  }
  if (confirmType == "Save") {
    confirmButton = (
      <Button
        variant="contained"
        type="submit"
        color={color}
        endIcon={endIcon}
        form={props.formName}
      >
        {props.confirmType}
      </Button>
    );
  } else {
    confirmButton = (
      <Button
        onClick={props.handleClick}
        color={color}
        variant="contained"
        endIcon={endIcon}
        disabled={isDisabled()}
      >
        {props.confirmType}
      </Button>
    );
  }
  let handleClose = () => {
    if (confirmType == "Delete") {
      setDeleteText("");
    }
    props.setIsOpen(false);
  };

  return (
    <Dialog open={props.isOpen}>
      <Grid sx={{ textAlign: "center" }}>
        <DialogTitle sx={{ fontSize: 20 }}>
          <Grid item sx={{ mt: 2 }}>
            <IconAlertCircle color="#2196f3" size={100} stroke={1} />
          </Grid>
          <Grid item sx={{ color: "text.secondary" }}>
            {title}
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid item sx={{ mb: 2 }}>
            <DialogContentText sx={{ fontSize: 16 }}>
              {props.subtitle}
            </DialogContentText>
          </Grid>
          {confirmType == "Delete" ? (
            <Grid item sx={{ mt: 3 }}>
              <TextField
                id="outlined-number"
                label="Type 'DELETE' to confirm"
                helperText="Please type DELETE in all caps to continue"
                value={getDeleteText}
                onChange={(e) => setDeleteText(e.target.value)}
              />
            </Grid>
          ) : (
            <></>
          )}
        </DialogContent>
        <DialogActions>
          <Grid item sx={{ mb: 2 }}>
            {confirmButton}
            <Button onClick={handleClose}>{cancel}</Button>
          </Grid>
        </DialogActions>
      </Grid>
    </Dialog>
  );
};

ConfirmDialog.propTypes = {
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  confirmType: PropTypes.string,
  handleClick: PropTypes.func,
  formName: PropTypes.string,
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
};

export default ConfirmDialog;

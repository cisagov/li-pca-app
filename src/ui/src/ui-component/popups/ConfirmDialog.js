import React from "react";
import PropTypes from "prop-types";

//material-ui
import Button from "@mui/material/Button";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Grid from "@mui/material/Grid";

// assets
import { IconAlertCircle } from "@tabler/icons";

const ConfirmDialog = (props) => {
  let endIcon = <React.Fragment />;
  let confirmText = props.confirmText;
  let confirmButton = <Button />;
  let color = "primary";
  let title = "Do you want to save changes to this entry?";

  if (confirmText == "Delete") {
    title = "Are you sure you want to delete this entry?";
    endIcon = <DeleteIcon />;
    color = "error";
  } else if (confirmText == "Leave") {
    title = "Are you sure you want to leave this page?";
    endIcon = <ExitToAppIcon />;
    color = "secondary";
  }

  if (confirmText == "Save") {
    confirmButton = (
      <Button
        variant="contained"
        color={color}
        endIcon={<CheckCircleOutlineIcon />}
        type={props.buttonType}
        form={props.formName}
      >
        {props.confirmText}
      </Button>
    );
  } else {
    confirmButton = (
      <Button
        onClick={props.handleClick}
        color={color}
        variant="contained"
        endIcon={endIcon}
      >
        {props.confirmText}
      </Button>
    );
  }

  return (
    <Dialog open={props.isOpen}>
      <Grid sx={{ textAlign: "center" }}>
        <DialogTitle>
          <Grid item>
            <IconAlertCircle color="#2196f3" size={100} stroke={1} />
          </Grid>
          <Grid item>{title}</Grid>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{props.subtitle}</DialogContentText>
        </DialogContent>
        <DialogActions>
          {confirmButton}
          <Button onClick={props.handleClose}>{props.closeText}</Button>
        </DialogActions>
      </Grid>
    </Dialog>
  );
};

ConfirmDialog.propTypes = {
  subtitle: PropTypes.string,
  confirmText: PropTypes.string,
  closeText: PropTypes.string,
  isOpen: PropTypes.bool,
  handleClick: PropTypes.func,
  handleClose: PropTypes.func,
  buttonType: PropTypes.string,
  formName: PropTypes.string,
};

export default ConfirmDialog;

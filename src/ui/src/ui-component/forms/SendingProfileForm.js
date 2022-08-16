import React from "react";
import { useNavigate } from "react-router-dom";

//material-ui
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

//third party
import { useFormik } from "formik";
import * as yup from "yup";

// project imports
import ConfirmDialog from "ui-component/popups/ConfirmDialog";
import ResultDialog from "ui-component/popups/ResultDialog";
import { useSubmit } from "services/api/SendingProfiles.js";

const fieldsToValidate = {
  name: true,
  from_address: true,
  interface_type: true,
  sending_ips: true,
};

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  from_address: yup
    .string()
    .email("Invalid email")
    .required("From email is required"),
  interface_type: yup.string().required("Interface Type is required"),
  sending_ips: yup.string().required("Sending IP[s] is required"),
});

const SendingProfileForm = (props) => {
  let navigate = useNavigate();
  let [emailHeaderArray, setHeaderArray] = React.useState([]);
  let [customHeader, setCustomHeader] = React.useState("");
  let [headerValue, setHeaderValue] = React.useState("");
  const [savebtnOpen, setSavebtnOpen] = React.useState(false);
  const [hasSubmitted, setHasSubmitted] = React.useState(false);
  const [cancelbtnOpen, setCancelbtnOpen] = React.useState(false);

  const addHeader = () => {
    if (customHeader != "" && headerValue != "") {
      let newElement = {
        key: customHeader,
        value: headerValue,
      };
      setHeaderArray((emailHeaderArray) => [...emailHeaderArray, newElement]);
      setCustomHeader("");
      setHeaderValue("");
    }
  };

  if (Object.keys(emailHeaderArray).length !== 0) {
    let counter = 0;
    emailHeaderArray.forEach((entry) => {
      entry["id"] = counter;
      counter = counter + 1;
    });
  }

  const handleDelete = (selectedRow) => {
    const id = selectedRow.id;
    setHeaderArray(emailHeaderArray.filter((item) => item.id !== id));
  };

  const formik = useFormik({
    initialValues: props.initialValues,
    validationSchema: validationSchema,
    validateOnMount: true,
    validateOnChange: true,
    onSubmit: (values) => {
      // TODO: Add headers to values or whatever ends of being axiosed
      values.headers = emailHeaderArray;
      props.setSpData(Object.assign(props.spData, values));
      setHasSubmitted(true);
      setTimeout(() => {
        setSavebtnOpen(false);
      });
    },
  });
  let getError = useSubmit(
    props.spData,
    props.spData._id,
    hasSubmitted,
    props.dataEntryType
  );
  let subtitleConfirm =
    formik.values.name + " will be updated in the database.";
  if (props.dataEntryType == "New Sending Profile") {
    subtitleConfirm = formik.values.name + " will be added to the database.";
  }
  const header_cols = [
    { field: "id", hide: true },
    { field: "key", headerName: "Header", flex: 1 },
    { field: "value", headerName: "Value", flex: 1 },
    {
      field: "delete_btn",
      headerName: "",
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (cellValues) => {
        return (
          <div>
            <IconButton
              variant="contained"
              color="error"
              onClick={() => handleDelete(cellValues.row)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        );
      },
      flex: 0.25,
    },
  ];

  const smtpFields = () => {
    return (
      <React.Fragment>
        <Grid item xs={12} sm={6} md={5} lg={5} xl={4.5}>
          <TextField
            fullWidth
            size="small"
            id="smtp_host"
            name="smtp_host"
            label="SMTP Host"
            value={formik.values.smtp_host}
            onChange={formik.handleChange}
            error={formik.touched.smtp_host && Boolean(formik.errors.smtp_host)}
            helperText={formik.touched.smtp_host && formik.errors.smtp_host}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={5} lg={5} xl={4.5}>
          <TextField
            fullWidth
            size="small"
            id="smtp_username"
            name="smtp_username"
            label="SMTP Username"
            value={formik.values.smtp_username}
            onChange={formik.handleChange}
            error={
              formik.touched.smtp_username &&
              Boolean(formik.errors.smtp_username)
            }
            helperText={
              formik.touched.smtp_username && formik.errors.smtp_username
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} md={5} lg={5} xl={4.5}>
          <TextField
            fullWidth
            size="small"
            id="smtp_password"
            name="smtp_password"
            label="SMTP Password"
            value={formik.values.smtp_password}
            onChange={formik.handleChange}
            error={
              formik.touched.smtp_password &&
              Boolean(formik.errors.smtp_password)
            }
            helperText={
              formik.touched.smtp_password && formik.errors.smtp_password
            }
          />
        </Grid>
      </React.Fragment>
    );
  };
  const mailgunFields = () => {
    return (
      <React.Fragment>
        <Grid item xs={12} sm={6} md={5} lg={5} xl={4.5}>
          <TextField
            fullWidth
            size="small"
            id="mailgun_domain"
            name="mailgun_domain"
            label="Mailgun Domain"
            value={formik.values.mailgun_domain}
            onChange={formik.handleChange}
            error={
              formik.touched.mailgun_domain &&
              Boolean(formik.errors.mailgun_domain)
            }
            helperText={
              formik.touched.mailgun_domain && formik.errors.mailgun_domain
            }
          />
        </Grid>
        <Grid item xs={12} sm={12} md={10} lg={10} xl={9}>
          <TextField
            fullWidth
            size="small"
            id="mailgun_api_key"
            name="mailgun_api_key"
            label="Mailgun API Key"
            value={formik.values.mailgun_api_key}
            onChange={formik.handleChange}
            error={
              formik.touched.mailgun_api_key &&
              Boolean(formik.errors.mailgun_api_key)
            }
            helperText={
              formik.touched.mailgun_api_key && formik.errors.mailgun_api_key
            }
          />
        </Grid>
      </React.Fragment>
    );
  };

  const sendTestEmail = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} xl={12} sx={{ mt: 1 }}>
          <Typography variant="h5" gutterBottom component="div">
            Email Headers
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
          <TextField
            fullWidth
            size="small"
            id="key"
            name="key"
            label="Custom Header"
            value={customHeader}
            onChange={(e) => setCustomHeader(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
          <TextField
            fullWidth
            size="small"
            id="value"
            name="value"
            label="Header Value"
            value={headerValue}
            onChange={(e) => setHeaderValue(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
          <Button
            fullWidth
            color="primary"
            variant="contained"
            size="large"
            onClick={addHeader}
          >
            Add Custom Header
          </Button>
        </Grid>
        {/* <Grid item xs={12} sm={12} md={10} lg={10} xl={9} sx={{ mt: 1 }}> */}
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <DataGrid
            autoHeight
            hideFooter={true}
            rows={emailHeaderArray}
            columns={header_cols}
            density="compact"
          />
        </Grid>
        <Grid item xs={12} md={12} xl={12} />
        <Grid item xs={12} sm={6} md={8} lg={8} xl={8}>
          <TextField
            fullWidth
            size="small"
            variant="filled"
            id="test_email"
            name="test_email"
            label="Test Email"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
          <Button
            fullWidth
            variant="contained"
            color="warning"
            size="large"
            onClick={() => console.log("")}
          >
            Send Test Email
          </Button>
        </Grid>
      </Grid>
    );
  };
  const handleCancel = () => {
    if (formik.dirty) {
      setCancelbtnOpen(true);
    } else {
      navigate("/li-pca-app/sending-profiles");
    }
  };
  const isDisabled = () => {
    if (formik.dirty) {
      return false;
    }
    return true;
  };
  const handleSave = () => {
    formik.setTouched(fieldsToValidate);
    if (formik.isValid && formik.dirty) {
      setSavebtnOpen(true);
    }
  };
  const closeDialog = () => {
    setHasSubmitted(false);
    if (!getError[0]) {
      navigate("/li-pca-app/sending-profiles");
    }
  };
  return (
    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
      <form id="sp-form" onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={5} lg={5} xl={4.5}>
            <TextField
              fullWidth
              size="small"
              id="name"
              name="name"
              label="Domain Name *"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={5} lg={5} xl={4.5}>
            <TextField
              fullWidth
              size="small"
              id="from_address"
              name="from_address"
              label="From Email *"
              value={formik.values.from_address}
              onChange={formik.handleChange}
              error={
                formik.touched.from_address &&
                Boolean(formik.errors.from_address)
              }
              helperText={
                formik.touched.from_address && formik.errors.from_address
              }
            />
          </Grid>
          <Grid item xs={12} sm={12} md={10} lg={10} xl={9}>
            <TextField
              fullWidth
              multiline
              minRows={1}
              size="small"
              id="sending_ips"
              name="sending_ips"
              label="Sending IP[s] *"
              value={formik.values.sending_ips}
              onChange={formik.handleChange}
              error={
                formik.touched.sending_ips && Boolean(formik.errors.sending_ips)
              }
              helperText={
                formik.touched.sending_ips && formik.errors.sending_ips
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={5} lg={5} xl={4.5}>
            <TextField
              select
              fullWidth
              size="small"
              label="Interface Type *"
              id="interface_type"
              name="interface_type"
              value={formik.values.interface_type}
              onChange={formik.handleChange}
              error={
                formik.touched.interface_type &&
                Boolean(formik.errors.interface_type)
              }
              helperText={
                formik.touched.interface_type && formik.errors.interface_type
              }
            >
              <MenuItem value={"SMTP"}>SMTP</MenuItem>
              <MenuItem value={"Mailgun"}>Mailgun</MenuItem>
            </TextField>
          </Grid>
          {formik.values.interface_type == "SMTP"
            ? smtpFields()
            : mailgunFields()}
          <Grid item xs={12} md={12} xl={12} />
          <Grid item xs={12} md={10} xl={10}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  backgroundColor: "#f8f8f8",
                  border: 1,
                  borderRadius: "12px",
                  borderColor: "white",
                  color: "#595959",
                  fontSize: 16,
                }}
              >
                Send Test Email
              </AccordionSummary>
              <AccordionDetails>{sendTestEmail()}</AccordionDetails>
            </Accordion>
          </Grid>
          <Grid item xs={12} md={12} xl={12} sx={{ mt: 3 }} />
          <Grid item xs={12} sm={4} md={5} lg={5} xl={4} />
          <Grid item xs={12} sm={3} md={2} lg={2} xl={2}>
            <Button
              fullWidth
              color="primary"
              variant="text"
              size="large"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item xs={12} sm={5} md={3} lg={3} xl={3}>
            <Button
              fullWidth
              color="primary"
              variant="contained"
              size="large"
              disabled={isDisabled()}
              onClick={handleSave}
            >
              Save Profile
            </Button>
          </Grid>
        </Grid>
        <ConfirmDialog
          subtitle="Unsaved changes will be discarded."
          confirmType="Leave"
          handleClick={() => navigate("/li-pca-app/sending-profiles")}
          isOpen={cancelbtnOpen}
          setIsOpen={setCancelbtnOpen}
        />
        <ConfirmDialog
          subtitle={subtitleConfirm}
          confirmType="Save"
          isOpen={savebtnOpen}
          setIsOpen={setSavebtnOpen}
          formName={"sp-form"}
        />
        <ResultDialog
          type={props.dataEntryType}
          hasSubmitted={hasSubmitted}
          getDelete={false}
          error={[]}
          closeDialog={closeDialog}
        />
      </form>
    </Grid>
  );
};

export default SendingProfileForm;

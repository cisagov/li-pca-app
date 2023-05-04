import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

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
import { submitEntry } from "services/api.js";

// This object contains fields that need to be validated
const fieldsToValidate = {
  name: true,
  from_address: true,
  interface_type: true,
  sending_ips: true,
};

// This is the validation schema for the form using the Yup library
const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  from_address: yup
    .string()
    .email("Invalid email")
    .required("From email is required"),
  interface_type: yup.string().required("Interface Type is required"),
  sending_ips: yup.string().required("Sending IP[s] is required"),
});
/**
 * Component for displaying and managing sending domains.
 * @param {Object} props - Component props.
 * @param {Object} props.initialValues - Initial values for the form.
 * @param {string} props.dataEntryType - The type of data entry (e.g. "New Sending Domain" or "Edit Sending Domain").
 * @param {Object} props.sdData - The sending domain data.
 * @param {Function} props.setSdData - A function to set the sending domain data.
 * @returns {JSX.Element} SendingDomainForm component.
 */
const SendingDomainForm = (props) => {
  let navigate = useNavigate();
  const [emailHeaderArray, setHeaderArray] = useState(
    props.initialValues.headers
  );
  const [customHeader, setCustomHeader] = useState("");
  const [headerValue, setHeaderValue] = useState("");
  const [savebtnOpen, setSavebtnOpen] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [cancelbtnOpen, setCancelbtnOpen] = useState(false);
  const [getError, setError] = useState([false, ""]);
  /**
   * Add a header to the email header array.
   */
  const addHeader = () => {
    if (customHeader !== "" && headerValue !== "") {
      const newElement = {
        key: customHeader,
        value: headerValue,
      };
      setHeaderArray([...emailHeaderArray, newElement]);
      setCustomHeader("");
      setHeaderValue("");
    }
  };
  /**
   * Delete a row from the email header array.
   * @param {Object} selectedRow - The row to delete.
   */
  const handleDelete = (selectedRow) => {
    const id = selectedRow.id;
    setHeaderArray(emailHeaderArray.filter((item) => item.id !== id));
  };
  // Initialize formik form
  const formik = useFormik({
    initialValues: props.initialValues,
    validationSchema: validationSchema,
    validateOnMount: true,
    validateOnChange: true,
    onSubmit: (values) => {
      const sd = "sending_domains";
      const dType = props.dataEntryType;
      const noIdsArray = emailHeaderArray.map((obj) => {
        return {
          key: obj.key,
          value: obj.value,
        };
      });
      values.headers = noIdsArray;
      props.setSdData(Object.assign(props.sdData, values));
      setHasSubmitted(true);
      submitEntry(sd, props.sdData, props.sdData._id, dType, setError);
      setTimeout(() => {
        setSavebtnOpen(false);
      });
    },
  });
  // Confirm subtitle based on data entry type
  const subtitleConfirm =
    props.dataEntryType === "New Sending Domain"
      ? formik.values.name + " will be added to the database."
      : formik.values.name + " will be updated in the database.";
  // Define columns for header data grid
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
  /**
  Renders SMTP input fields for a formik form
  @returns {JSX.Element} JSX Element containing SMTP input fields
  */
  const smtpFields = () => {
    return (
      <>
        <Grid item xs={12} sm={6} md={5} lg={5} xl={5}>
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
        <Grid item xs={12} sm={6} md={5} lg={5} xl={5}>
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
        <Grid item xs={12} sm={6} md={5} lg={5} xl={5}>
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
      </>
    );
  };
  /**
   * Renders two text fields for the Mailgun Domain and Mailgun API Key.
   * @returns {JSX.Element} - Returns a JSX element with two text fields.
   */
  const mailgunFields = () => {
    return (
      <>
        <Grid item xs={12} sm={6} md={5} lg={5} xl={5}>
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
        <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
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
      </>
    );
  };
  /**
   * Renders a form to send a test email with customizable email headers.
   * @returns {JSX.Element} - Returns a JSX element with a form for sending test emails.
   */
  const sendTestEmail = () => {
    // TODO: Handle validating only unique key headers.
    // TODO: Integrate Mailgun or equivalent functionality.
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} xl={12} sx={{ mt: 1 }}>
          <Typography variant="h5" gutterBottom color="text.secondary">
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
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <DataGrid
            getRowId={(row) => row.key}
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
            disabled
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
  /**
   * Handles the cancel button click event. If formik is dirty, sets the `cancelbtnOpen` state to true,
   * otherwise navigates to "/cat-phishing/sending-domains".
   */
  const handleCancel = () => {
    if (formik.dirty) {
      setCancelbtnOpen(true);
    } else {
      navigate("/cat-phishing/sending-domains");
    }
  };
  /**
   * Handles the save button click event. Sets the touched fields of formik to `fieldsToValidate`.
   * If formik is valid and dirty, sets the `savebtnOpen` state to true.
   */
  const handleSave = () => {
    formik.setTouched(fieldsToValidate);
    if (formik.isValid && formik.dirty) {
      setSavebtnOpen(true);
    }
  };
  /**
   * Closes the dialog and sets `hasSubmitted` state to false. If there is no error, navigates to "/cat-phishing/sending-domains".
   */
  const closeDialog = () => {
    setHasSubmitted(false);
    if (!getError[0]) {
      navigate("/cat-phishing/sending-domains");
    }
  };
  return (
    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
      <form id="sp-form" onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={5} lg={5} xl={5}>
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
          <Grid item xs={12} sm={6} md={5} lg={5} xl={5}>
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
          <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
            <TextField
              fullWidth
              multiline
              minRows={2}
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
          <Grid item xs={12} sm={6} md={5} lg={5} xl={5}>
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
          {formik.values.interface_type === "SMTP"
            ? smtpFields()
            : mailgunFields()}
          <Grid item xs={12} md={12} xl={12} />
          <Grid item xs={12} md={10} xl={10}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  border: 1,
                  borderRadius: "12px",
                  borderColor: "white",
                  fontSize: 16,
                }}
              >
                Send Test Email
              </AccordionSummary>
              <AccordionDetails>{sendTestEmail()}</AccordionDetails>
            </Accordion>
          </Grid>
          <Grid item xs={12} md={12} xl={12} sx={{ mt: 3 }} />
          <Grid item xs={12} sm={4} md={5} lg={5} xl={5} />
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
              disabled={!formik.dirty}
              onClick={handleSave}
            >
              Save Domain
            </Button>
          </Grid>
        </Grid>
        <ConfirmDialog
          subtitle="Unsaved changes will be discarded."
          confirmType="Leave"
          handleClick={() => navigate("/cat-phishing/sending-domains")}
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
          error={getError}
          closeDialog={closeDialog}
        />
      </form>
    </Grid>
  );
};

SendingDomainForm.propTypes = {
  setSdData: PropTypes.func,
  sdData: PropTypes.object,
  initialValues: PropTypes.object,
  dataEntryType: PropTypes.string,
};

export default SendingDomainForm;

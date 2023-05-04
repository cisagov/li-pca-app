import PropTypes from "prop-types";
import { useState } from "react";

// material-ui
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";

// project imports
import ConfirmDialog from "ui-component/popups/ConfirmDialog";
import DisplayDataTable from "ui-component/tables/DisplayDataTable";

// third party
import { useFormik } from "formik";
import * as yup from "yup";
import { isEqual } from "lodash";

// Regular expression for validating phone number format
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

// This is the validation schema for the form using the Yup library
const validationSchema = yup.object({
  first_name: yup.string().required("First Name is required"),
  last_name: yup.string().required("Last Name is required"),
  office_phone: yup
    .string()
    .required("Work phone is required")
    .matches(phoneRegExp, "Phone number is not valid"),
  mobile_phone: yup.string().matches(phoneRegExp, "Phone number is not valid"),
  email: yup.string().required("Email is required").email("Email is invalid"),
});

/**
 * A functional component that renders a form for managing customer point of contact data.
 * @param {Object} props - Component props.
 * @param {Array} props.custPOCData - An array containing customer point of contact data.
 * @param {Object} props.initialPOCValues - An object containing initial point of contact values.
 * @param {Object} props.custFilledPOCValues - An object containing initial filled point of contact values.
 * @param {Function} props.setCustData - A function that sets customer data.
 * @param {Object} props.setCustData - An object containing customer data.
 * @returns {JSX.Element} CustomerPOCForm component.
 */
function CustomerPOCForm(props) {
  // Define initial values for various state variables
  let contactLen = props.custPOCData.length;
  const [isToggleCardOn, setToggleCard] = useState(contactLen < 2);
  const [editContact, setEditContact] = useState(false);
  const [cusContactsRows, setCusContactsRows] = useState(props.custPOCData);
  const [deletebtnOpen, setDeletebtnOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  let [entryToEdit, setEntryToEdit] = useState({});
  let initialPOCValues = editContact
    ? props.custFilledPOCValues
    : props.initialPOCValues;
  let updatedPOCData = [];
  // Define the columns that will be displayed in the point of contact table
  const cusContactsCols = [
    { field: "id", hide: true },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "title", headerName: "Title", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "office_phone", headerName: "Work Phone", flex: 1 },
    { field: "mobile_phone", headerName: "Mobile Phone", flex: 1 },
    {
      field: "col6",
      headerName: "",
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (cellValues) => {
        return (
          <div>
            <IconButton
              variant="contained"
              color="primary"
              onClick={() => handleEdit(cellValues.row)}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              variant="contained"
              color="error"
              onClick={() => {
                setDeletebtnOpen(true);
                setSelectedRow(cellValues.row);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        );
      },
      flex: 0.75,
    },
  ];
  // Initialize formik form
  const formik = useFormik({
    initialValues: initialPOCValues,
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      updatedPOCData = [...props.custPOCData];
      // Sets idIndex to the values.id if editContact is true, otherwise to the length of updatedPOCData
      let idIndex = editContact ? values.id : updatedPOCData.length;
      updatedPOCData[idIndex] = {
        id: idIndex,
        email: values.email,
        first_name: values.first_name,
        last_name: values.last_name,
        mobile_phone: values.mobile_phone,
        notes: values.notes,
        office_phone: values.office_phone,
        title: values.title,
        name: values.first_name + " " + values.last_name,
      };
      props.setCustData({
        ...props.custData,
        contact_list: updatedPOCData,
      });
      setTimeout(() => {
        setCusContactsRows(updatedPOCData);
      });
      actions.resetForm();
      // Toggles the display of a contact card based on whether the number of existing contacts is less than two
      setToggleCard(contactLen + 1 < 2);
      setEditContact(false);
    },
  });

  let idCounter = 0;
  if (contactLen >= 1) {
    props.custPOCData.forEach((entry) => {
      entry.id = idCounter;
      entry.name = `${entry.first_name} ${entry.last_name}`;
      idCounter++;
    });
  }
  /**
   * Sets formik values, toggles edit mode, sets entry to edit.
   * @param {Object} entry - Object containing POC data.
   */
  const handleEdit = (entry) => {
    formik.setValues(entry);
    setToggleCard(true);
    setEditContact(true);
    setEntryToEdit(entry);
  };
  /**
   * Determines if save button should be disabled.
   * @returns {boolean} - True if save button should be disabled, false otherwise.
   */
  const isDisabled = () => {
    const { dirty, values } = formik;
    if (!editContact && dirty) {
      return false;
    } else if (editContact && !isEqual(values, entryToEdit)) {
      return false;
    }
    return true;
  };
  /**
   * Removes entry from updatedPOCData and updates props.custData.
   * @param {Object} entry - Object containing POC data.
   */
  const confirmDelete = (entry) => {
    updatedPOCData = cusContactsRows.filter((prevEntry) => {
      return prevEntry !== entry;
    });
    props.setCustData({
      ...props.custData,
      contact_list: updatedPOCData,
    });
    setTimeout(() => {
      setCusContactsRows(updatedPOCData);
      setDeletebtnOpen(false);
      setSelectedRow({});
    });
  };
  return (
    <>
      {!isToggleCardOn ? (
        <>
          <Grid item xs={10} sm={6} md={5} lg={4} xl={3} sx={{ mb: 1 }}>
            <Button
              color="primary"
              variant="contained"
              size="large"
              fullWidth
              onClick={() => {
                setToggleCard(true);
              }}
            >
              Add Customer Contact
            </Button>
          </Grid>
          <Grid
            item
            display={{ xs: "none", sm: "block" }}
            sm={6}
            md={7}
            lg={8}
            xl={9}
          ></Grid>
        </>
      ) : (
        <Card variant="outlined">
          <CardContent>
            <form onSubmit={formik.handleSubmit}>
              <Box sx={{ ml: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} />
                  <Grid item xs={11} sm={6} md={4} lg={4} xl={4}>
                    <TextField
                      fullWidth
                      size="small"
                      id="first_name"
                      name="first_name"
                      label="First Name *"
                      value={formik.values.first_name}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.first_name &&
                        Boolean(formik.errors.first_name)
                      }
                      helperText={
                        formik.touched.first_name && formik.errors.first_name
                      }
                    />
                  </Grid>
                  <Grid item xs={11} sm={6} md={4} lg={4} xl={4}>
                    <TextField
                      fullWidth
                      size="small"
                      id="last_name"
                      name="last_name"
                      label="Last Name *"
                      value={formik.values.last_name}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.last_name &&
                        Boolean(formik.errors.last_name)
                      }
                      helperText={
                        formik.touched.last_name && formik.errors.last_name
                      }
                    />
                  </Grid>
                  <Grid item xs={11} sm={6} md={4} lg={4} xl={4}>
                    <TextField
                      fullWidth
                      size="small"
                      id="title"
                      name="title"
                      label="Title"
                      value={formik.values.title}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item xs={11} sm={6} md={4} lg={4} xl={4}>
                    <TextField
                      fullWidth
                      size="small"
                      id="email"
                      name="email"
                      label="Email *"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </Grid>
                  <Grid item xs={11} sm={6} md={4} lg={4} xl={4}>
                    <TextField
                      fullWidth
                      size="small"
                      id="office_phone"
                      name="office_phone"
                      label="Work Phone *"
                      value={formik.values.office_phone}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.office_phone &&
                        Boolean(formik.errors.office_phone)
                      }
                      helperText={
                        formik.touched.office_phone &&
                        formik.errors.office_phone
                      }
                    />
                  </Grid>
                  <Grid item xs={11} sm={6} md={4} lg={4} xl={4}>
                    <TextField
                      fullWidth
                      size="small"
                      id="mobile_phone"
                      name="mobile_phone"
                      label="Mobile Phone"
                      value={formik.values.mobile_phone}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.mobile_phone &&
                        Boolean(formik.errors.mobile_phone)
                      }
                      helperText={
                        formik.touched.mobile_phone &&
                        formik.errors.mobile_phone
                      }
                    />
                  </Grid>
                  <Grid item xs={11} sm={10} md={7} lg={7} xl={7}>
                    <TextField
                      fullWidth
                      size="small"
                      multiline
                      minRows={2}
                      id="contact_notes"
                      name="contact_notes"
                      label="Contact Notes"
                      value={formik.values.contact_notes}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item xs={1} sm={2} md={5} lg={5} xl={5}></Grid>
                  <Grid item xs={11} sm={5} md={3} lg={3} xl={2}>
                    <Button
                      color="primary"
                      variant="contained"
                      type="submit"
                      size="large"
                      fullWidth
                      disabled={isDisabled()}
                    >
                      Save Contact
                    </Button>
                  </Grid>
                  <Grid item xs={1} sm={1} md={5} lg={5} xl={7}></Grid>
                  <Grid item xs={11} sm={3} md={2} lg={2} xl={1}>
                    <Button
                      size="large"
                      fullWidth
                      onClick={() => {
                        formik.setTouched({});
                        formik.setValues(props.initialPOCValues);
                      }}
                    >
                      Reset
                    </Button>
                  </Grid>
                  <Grid item xs={11} sm={2} md={2} lg={2} xl={2}>
                    <Button
                      color="warning"
                      variant="contained"
                      size="large"
                      fullWidth
                      onClick={() => {
                        formik.setValues(props.initialPOCValues);
                        formik.setTouched({});
                        setToggleCard(false);
                      }}
                    >
                      Close
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </form>
          </CardContent>
        </Card>
      )}
      {contactLen >= 1 ? (
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          sx={{ mt: 3, mb: 1 }}
        >
          <DisplayDataTable
            data={{ rows: cusContactsRows, columns: cusContactsCols }}
          />
        </Grid>
      ) : (
        <></>
      )}
      {contactLen < 2 ? (
        <Grid
          item
          xs={10}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          sx={{ mb: 3, mt: 3 }}
        >
          <Tooltip
            title="Add at least two point of contacts to be able to Save"
            placement="bottom-start"
          >
            <Alert severity="warning">
              Customer must have two or more contacts in order to save a form
            </Alert>
          </Tooltip>
        </Grid>
      ) : (
        <></>
      )}
      <ConfirmDialog
        subtitle={selectedRow["name"] + " will be deleted."}
        confirmType="Delete"
        handleClick={() => confirmDelete(selectedRow)}
        isOpen={deletebtnOpen}
        setIsOpen={setDeletebtnOpen}
      />
    </>
  );
}

CustomerPOCForm.propTypes = {
  initialPOCValues: PropTypes.object,
  custFilledPOCValues: PropTypes.object,
  setCustData: PropTypes.func,
  custPOCData: PropTypes.array,
  custData: PropTypes.object,
};

export default CustomerPOCForm;

import PropTypes from "prop-types";
import React from "react";

// material-ui
import AddIcon from "@mui/icons-material/Add";
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
import DisplayDataTable from "ui-component/tables/DisplayDataTable";

// third party
import { useFormik } from "formik";
import * as yup from "yup";
import { isEqual } from "lodash";

const validationSchema = yup.object({
  first_name: yup.string().required("First Name is required"),
  last_name: yup.string().required("Last Name is required"),
  email: yup.string().required("Email is required").email("Email is invalid"),
});

function CustomerPOCForm(props) {
  const [isToggleCardOn, setToggleCard] = React.useState(true);
  const [editContact, setEditContact] = React.useState(false);
  const [cusContactsRows, setCusContactsRows] = React.useState(
    props.custPOCData
  );
  let [entryToEdit, setEntryToEdit] = React.useState({});
  let initialPOCValues = {};
  if (!editContact) {
    initialPOCValues = props.initialPOCValues;
  } else {
    initialPOCValues = props.custFilledPOCValues;
  }
  let updatedPOCData = [];
  const cusContactsCols = [
    { field: "id", hide: true },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "title", headerName: "Title", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "mobile_phone", headerName: "Mobile Phone", flex: 1 },
    { field: "office_phone", headerName: "Office Phone", flex: 1 },
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
              onClick={() => handleDelete(cellValues.row)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        );
      },
      flex: 0.75,
    },
  ];
  const formik = useFormik({
    initialValues: initialPOCValues,
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      updatedPOCData = [...props.custPOCData];
      let idIndex = 0;
      if (editContact) {
        idIndex = values.id;
      } else {
        idIndex = updatedPOCData.length;
      }
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
      props.setHasContact(true);
      actions.resetForm();
      setToggleCard(!isToggleCardOn);
      setEditContact(false);
      props.setContactUpdate(true);
    },
  });

  let counter = 0;
  if (props.hasContact) {
    props.custPOCData.forEach((custRows) => {
      custRows.id = counter;
      counter = counter + 1;
      custRows.name = custRows.first_name + " " + custRows.last_name;
    });
  }

  const handleEdit = (entry) => {
    entryToEdit = entry;
    formik.setValues(entryToEdit);
    setToggleCard(false);
    setEditContact(true);
    setEntryToEdit(entry);
  };

  const isDisabled = () => {
    if (!editContact && formik.dirty) {
      return false;
    } else if (editContact && !isEqual(formik.values, entryToEdit)) {
      return false;
    }
    return true;
  };

  const handleDelete = (entry) => {
    updatedPOCData = cusContactsRows.filter((prevEntry) => {
      return prevEntry !== entry;
    });
    props.setCustData({
      ...props.custData,
      contact_list: updatedPOCData,
    });
    if (props.custPOCData.length <= 1) {
      props.setHasContact(false);
    }
    setTimeout(() => {
      setCusContactsRows(updatedPOCData);
    });
  };
  return (
    <React.Fragment>
      {isToggleCardOn ? (
        <React.Fragment>
          <Grid item xs={10} sm={6} md={5} lg={4} xl={3} sx={{ mb: 1 }}>
            <Button
              color="warning"
              variant="contained"
              size="large"
              fullWidth
              onClick={() => {
                setToggleCard(!isToggleCardOn);
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
        </React.Fragment>
      ) : (
        <Card variant="outlined">
          <CardContent>
            <form onSubmit={formik.handleSubmit}>
              <Box sx={{ ml: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} />
                  <Grid item xs={10} sm={6} md={6} lg={6} xl={6}>
                    <TextField
                      fullWidth
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
                  <Grid item xs={10} sm={6} md={6} lg={6} xl={6}>
                    <TextField
                      fullWidth
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
                  <Grid item xs={10} sm={4} md={4} lg={4} xl={4}>
                    <TextField
                      fullWidth
                      id="title"
                      name="title"
                      label="Title"
                      value={formik.values.title}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item xs={10} sm={4} md={4} lg={4} xl={4}>
                    <TextField
                      fullWidth
                      id="office_phone"
                      name="office_phone"
                      label="Office Phone"
                      value={formik.values.office_phone}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item xs={10} sm={4} md={4} lg={4} xl={4}>
                    <TextField
                      fullWidth
                      id="mobile_phone"
                      name="mobile_phone"
                      label="Mobile Phone"
                      value={formik.values.mobile_phone}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item xs={10} sm={10} md={7} lg={7} xl={7}>
                    <TextField
                      fullWidth
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
                  <Grid item xs={10} sm={10} md={7} lg={7} xl={7}>
                    <TextField
                      fullWidth
                      multiline
                      minRows={2}
                      id="contact_notes"
                      name="contact_notes"
                      label="Contact Notes"
                      value={formik.values.contact_notes}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item xs={2} sm={2} md={5} lg={5} xl={5}></Grid>
                  <Grid item xs={10} sm={4} md={3} lg={2} xl={2}>
                    <Button
                      color="primary"
                      variant="contained"
                      type="submit"
                      size="large"
                      fullWidth
                      endIcon={<AddIcon />}
                      disabled={isDisabled()}
                    >
                      Add
                    </Button>
                  </Grid>
                  <Grid item xs={10} sm={2} md={2} lg={2} xl={2}>
                    <Button
                      color="primary"
                      size="large"
                      fullWidth
                      onClick={() => {
                        formik.setValues(props.initialPOCValues);
                        formik.setTouched({});
                        setToggleCard(!isToggleCardOn);
                      }}
                    >
                      Close
                    </Button>
                  </Grid>
                  <Grid item xs={2} sm={3} md={5} lg={6} xl={7}></Grid>
                  <Grid
                    item
                    display={{ xs: "none", sm: "block" }}
                    sm={3}
                    md={2}
                    lg={2}
                    xl={1}
                  >
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
                </Grid>
              </Box>
            </form>
          </CardContent>
        </Card>
      )}
      {props.hasContact ? (
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
            title="Add at least one contact to save a new customer."
            placement="bottom-start"
          >
            <Alert severity="error"> No contacts available.</Alert>
          </Tooltip>
        </Grid>
      )}
    </React.Fragment>
  );
}

CustomerPOCForm.propTypes = {
  initialPOCValues: PropTypes.object,
  custFilledPOCValues: PropTypes.object,
  setCustData: PropTypes.func,
  custPOCData: PropTypes.array,
  custData: PropTypes.object,
  hasContact: PropTypes.bool,
  setHasContact: PropTypes.func,
  setContactUpdate: PropTypes.func,
};

export default CustomerPOCForm;
import React from "react";

//material-ui
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

//third party
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  from: yup.string().required("From email is required"),
  interface_type: yup.string().required("Interface Type is required"),
});

const SendingProfileForm = (props) => {
  let [emailHeaderArray, setHeaderArray] = React.useState([]);
  let [customHeader, setCustomHeader] = React.useState("");
  let [headerValue, setHeaderValue] = React.useState("");

  const addHeader = () => {
    let newElement = {
      custom_header: customHeader,
      header_value: headerValue,
    };
    setHeaderArray((emailHeaderArray) => [...emailHeaderArray, newElement]);
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
    // console.log(id);
    setHeaderArray(emailHeaderArray.filter((item) => item.id !== id));
  };
  const emailHeaders = () => {
    return (
      <DataGrid
        autoHeight
        hideFooter={true}
        rows={emailHeaderArray}
        columns={cols}
        density="compact"
      />
    );
  };
  console.log(props.initialValues);
  const formik = useFormik({
    initialValues: props.initialValues,
    validationSchema: validationSchema,
    validateOnChange: true,
    onSubmit: (values) => {
      // TODO: Add headers to values or whatever ends of being axiosed
      console.log(values);
    },
  });
  const cols = [
    { field: "id", hide: true },
    { field: "custom_header", headerName: "Header", flex: 1 },
    { field: "header_value", headerName: "Value", flex: 1 },
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
        <Grid item xs={12} sm={12} md={10} lg={10} xl={9}>
          <TextField
            fullWidth
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
        <Grid item xs={12} sm={12} md={10} lg={10} xl={9}>
          <TextField
            fullWidth
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
        <Grid item xs={12} sm={12} md={10} lg={10} xl={9}>
          <TextField
            fullWidth
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
      </React.Fragment>
    );
  };

  return (
    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={5} lg={5} xl={4.5}>
            <TextField
              fullWidth
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
              id="from"
              name="from"
              label="From Email *"
              value={formik.values.from}
              onChange={formik.handleChange}
              error={formik.touched.from && Boolean(formik.errors.from)}
              helperText={formik.touched.from && formik.errors.from}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={10} lg={10} xl={9}>
            <TextField
              fullWidth
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
          <Grid item xs={12} sm={12} md={10} lg={10} xl={9}>
            <TextField
              select
              fullWidth
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
          <Grid item md={12} sx={{ mt: 2 }} />
          <Grid item xs={12} sm={12} md={10} lg={10} xl={11}>
            <Typography variant="h4" gutterBottom component="div">
              Email Headers
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={5} lg={3.25} xl={3}>
            <TextField
              fullWidth
              id="custom_header"
              name="custom_header"
              label="Custom Header"
              value={customHeader}
              onChange={(e) => setCustomHeader(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={5} lg={3.25} xl={3}>
            <TextField
              fullWidth
              id="header_value"
              name="header_value"
              label="Header Value"
              value={headerValue}
              onChange={(e) => setHeaderValue(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3.5} xl={3} sx={{ mt: 1 }}>
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
          <Grid item xs={12} sm={12} md={10} lg={10} xl={9} sx={{ mt: 2 }}>
            {emailHeaders()}
          </Grid>
          <Grid item xs={12} md={12} xl={12} sx={{ mt: 1 }} />
          <Grid item xs={12} sm={7} md={4} lg={4} xl={4}>
            <TextField
              fullWidth
              size="small"
              variant="filled"
              id="test_email"
              name="test_email"
              label="Test Email"
            />
          </Grid>
          <Grid item xs={12} sm={5} md={3} lg={3} xl={2.5}>
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
          <Grid item xs={12} md={12} xl={12} sx={{ mt: 3 }} />
          <Grid item xs={12} sm={4} md={5} lg={5} xl={4} />
          <Grid item xs={12} sm={3} md={2} lg={2} xl={2}>
            <Button
              fullWidth
              color="primary"
              variant="text"
              size="large"
              onClick={() => console.log("")}
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
              onClick={() => console.log("")}
            >
              Save Profile
            </Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};

export default SendingProfileForm;

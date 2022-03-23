//material-ui
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Button from "@mui/material/Button";
import DatePicker from "@mui/lab/DatePicker";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

const CustomerForm = (props) => {
  return (
    <FormControl>
      <Grid container spacing={2}>
        <Grid item xs={10} sm={7} md={7} lg={7} xl={7}>
          <TextField
            fullWidth
            required
            id="custName"
            name="custName"
            label="Customer Name"
            value={props.custForm.custName}
            onChange={(e) => {
              props.setCustform({
                ...props.custForm,
                custName: e.target.value,
              });
            }}
          />
        </Grid>
        <Grid item xs={10} sm={5} md={5} lg={5} xl={5}>
          <TextField
            fullWidth
            required
            id="custId"
            name="custId"
            label="Customer Identifier"
            value={props.custForm.custId}
            onChange={(e) => {
              props.setCustform({ ...props.custForm, custId: e.target.value });
            }}
          />
        </Grid>
        <Grid item xs={10} sm={7} md={7} lg={7} xl={7}>
          <TextField
            fullWidth
            required
            id="custDomain"
            name="custDomain"
            label="Customer Domain"
            value={props.custForm.custDomain}
            onChange={(e) => {
              props.setCustform({
                ...props.custForm,
                custDomain: e.target.value,
              });
            }}
          />
        </Grid>
        <Grid item xs={10} sm={5} md={5} lg={5} xl={5}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              fullWidth
              required
              label="Appendix A Date"
              value={props.custForm.dateVal}
              onChange={(e) => {
                props.setCustform({ ...props.custForm, dateVal: e });
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={10} sm={8} md={7} lg={7} xl={7}>
          <TextField
            select
            fullWidth
            required
            value={props.custForm.custType}
            label="Customer Type"
            onChange={(e) => {
              props.setCustform({
                ...props.custForm,
                custType: e.target.value,
              });
            }}
          >
            <MenuItem value={"Government - Federal"}>
              Government - Federal
            </MenuItem>
            <MenuItem value={"Government - State"}>Government - State</MenuItem>
            <MenuItem value={"Government - Local"}>Government - Local</MenuItem>
            <MenuItem value={"Government - Tribal"}>
              Government - Tribal
            </MenuItem>
            <MenuItem value={"Government - Territorial"}>
              Government - Territorial
            </MenuItem>
            <MenuItem value={"Private"}>Private</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={2} sm={4} md={5} lg={5} xl={5}></Grid>
        <Grid item xs={10} sm={8} md={7} lg={7} xl={7}>
          <TextField
            fullWidth
            required
            id="addressOne"
            name="addressOne"
            label="Address 1"
            value={props.custForm.addressOne}
            onChange={(e) => {
              props.setCustform({
                ...props.custForm,
                addressOne: e.target.value,
              });
            }}
          />
        </Grid>
        <Grid item xs={10} sm={4} md={5} lg={5} xl={5}>
          <TextField
            fullWidth
            id="addressTwo"
            name="addressTwo"
            label="Address 2"
            value={props.custForm.addressTwo}
            onChange={(e) => {
              props.setCustform({
                ...props.custForm,
                addressTwo: e.target.value,
              });
            }}
          />
        </Grid>
        <Grid item xs={10} sm={6} md={6} lg={6} xl={6}>
          <TextField
            fullWidth
            required
            id="city"
            name="city"
            label="City"
            value={props.custForm.city}
            onChange={(e) => {
              props.setCustform({ ...props.custForm, city: e.target.value });
            }}
          />
        </Grid>
        <Grid item xs={10} sm={3} md={3} lg={3} xl={3}>
          <TextField
            fullWidth
            required
            id="state"
            name="state"
            label="State"
            value={props.custForm.state}
            onChange={(e) => {
              props.setCustform({ ...props.custForm, state: e.target.value });
            }}
          />
        </Grid>
        <Grid item xs={10} sm={3} md={3} lg={3} xl={3}>
          <TextField
            fullWidth
            required
            id="zip"
            name="zip"
            label="Zip Code"
            value={props.custForm.zip}
            onChange={(e) => {
              props.setCustform({ ...props.custForm, zip: e.target.value });
            }}
          />
        </Grid>
        <Grid
          item
          display={{ xs: "none", sm: "block" }}
          sm={9}
          md={10}
          lg={10}
          xl={11}
        />
        <Grid item xs={10} sm={3} md={2} lg={2} xl={1}>
          <Button
            size="large"
            fullWidth
            onClick={() => {
              props.setCustform({
                ...props.custForm,
                custName: "",
                custId: "",
                custDomain: "",
                dateVal: Date.now(),
                custType: "",
                addressOne: "",
                addressTwo: "",
                city: "",
                state: "",
                zip: "",
              });
            }}
          >
            Reset
          </Button>
        </Grid>
      </Grid>
    </FormControl>
  );
};

export default CustomerForm;

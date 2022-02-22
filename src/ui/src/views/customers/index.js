// material-ui
import { Grid } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";

// project imports
import MainCard from "ui-component/cards/MainCard";
import SingleRowSelectionGrid from "ui-component/SingleRowSelectionGrid";
// ==============================|| SAMPLE PAGE ||============================== //

const rows = [
  {
    id: 1,
    col1: "Pharmacy Laboratories",
    col2: "PHLB",
    col3: "123 Main St.",
    col4: "Townsville",
    col5: "VA",
    col6: "00001",
  },
  {
    id: 2,
    col1: "Idaho National Laboratory",
    col2: "INL",
    col3: "test",
    col4: "test",
    col5: "test",
    col6: "test",
  },
  {
    id: 3,
    col1: "Gov of Smith County",
    col2: "GSC",
    col3: "test",
    col4: "test",
    col5: "test",
    col6: "test",
  },
  {
    id: 4,
    col1: "City of Jonestown",
    col2: "CTJN",
    col3: "test",
    col4: "test",
    col5: "test",
    col6: "test",
  },
  {
    id: 5,
    col1: "DHS CISA",
    col2: "ABC",
    col3: "test",
    col4: "test",
    col5: "test",
    col6: "test",
  },
  {
    id: 6,
    col1: "City of Example",
    col2: "DEF",
    col3: "test",
    col4: "test",
    col5: "test",
    col6: "test",
  },
  {
    id: 7,
    col1: "City of Example",
    col2: "GHI",
    col3: "test",
    col4: "test",
    col5: "test",
    col6: "test",
  },
  {
    id: 8,
    col1: "City of Example",
    col2: "JKL",
    col3: "test",
    col4: "test",
    col5: "test",
    col6: "test",
  },
  {
    id: 9,
    col1: "City of Example",
    col2: "MNO",
    col3: "test",
    col4: "test",
    col5: "test",
    col6: "test",
  },
  {
    id: 10,
    col1: "City of Example",
    col2: "PQR",
    col3: "test",
    col4: "test",
    col5: "test",
    col6: "test",
  },
  {
    id: 11,
    col1: "City of Example",
    col2: "STU",
    col3: "test",
    col4: "test",
    col5: "test",
    col6: "test",
  },
];
const columns = [
  { field: "id", hide: true },
  { field: "col1", headerName: "Name", flex: 2 },
  { field: "col2", headerName: "Identifier", flex: 1 },
  { field: "col3", headerName: "Address", flex: 2.5 },
  { field: "col4", headerName: "City", flex: 1.5 },
  { field: "col5", headerName: "State", flex: 1 },
  { field: "col6", headerName: "Zip Code", flex: 1 },
  {
    field: "edit",
    headerName: "Edit",
    sortable: false,
    disableClickEventBubbling: true,
    renderCell: () => {
      return (
        <IconButton variant="contained" color="primary">
          <EditIcon />
        </IconButton>
      );
    },
    flex: 0.5,
  },
];
const data = { rows: rows, columns: columns };

const CustomersPage = () => (
  <MainCard title="Customers">
    <Grid container spacing={2}>
      <Grid item xs={8}>
        Customer data shown below.
      </Grid>
    </Grid>
    <br />
    <SingleRowSelectionGrid data={data} />
  </MainCard>
);

export default CustomersPage;

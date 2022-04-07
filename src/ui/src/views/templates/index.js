// material-ui
import axios from "axios";
import { Grid } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";

// project imports
import MainCard from "ui-component/cards/MainCard";
import MainDataTable from "ui-component/tables/MainDataTable";

// ==============================|| SAMPLE PAGE ||============================== //

// const rows2 = () => {
//   axios.get( "http://localhost:8080/li-pca/v1/templates").then(res => {
//       const templates = res.data.map((data) => ({
//         ...data,
//         id: data.uuid
//       }));
//       console.log(JSON.stringify(templates));
//       return templates
//   });
// }

const rows = [
  {
    id: "d82c687d-46b0-49f6-b640-dc574082b970",
    created: "2022-04-07T15:55:01.081000+00:00",
    created_by: "bot",
    deception_score: 1,
    from_address: "1",
    name: "Delayed Order",
    retired: false,
    retired_description: "",
    uuid: "3913708c-4c0c-437a-820f-2898833ac6e8",
  },
  {
    id: "7bb2c80b-66ff-4088-9a9a-7c9d24286b7c",
    created: "2022-04-07T15:59:25.740000+00:00",
    created_by: "bot",
    deception_score: 1,
    from_address: "test@test.com",
    name: "Order Processing Issue",
    retired: false,
    retired_description: "",
    uuid: "006e2558-4d77-4b22-88ee-5fe32365aaaa",
  },
  {
    id: "b32023f6-bd59-4b1f-a2c0-7badf6830ef3",
    created: "2022-04-07T15:59:49.916000+00:00",
    created_by: "bot",
    deception_score: 1,
    from_address: "test@test.com",
    name: "Shipping Details",
    retired: false,
    retired_description: "",
    uuid: "95f02030-67d0-4a5a-9bb1-a6696a847b53",
  },
];

const columns = [
  { field: "id", hide: true },
  { field: "name", headerName: "Template Name", flex: 4 },
  { field: "deception_score", headerName: "Deception Score", flex: 1 },
  { field: "created_by", headerName: "Created By", flex: 2 },
  {
    field: "col4",
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
const TemplatePage = () => (
  <MainCard title="Templates">
    <Grid container spacing={2}>
      <Grid item xs={8}>
        Template data shown below.
      </Grid>
    </Grid>
    <br />
    <MainDataTable data={data} newEntryRoute="newTemplate" />
  </MainCard>
);

export default TemplatePage;

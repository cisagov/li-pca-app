// material-ui
import { Typography } from "@mui/material";

// project imports
import MainCard from "ui-component/cards/MainCard";
// ==============================|| SAMPLE PAGE ||============================== //

const CustomersPage = () => (
  <MainCard title="Customers">
    <Typography variant="body2">
      Insert table here. Table must have a search bar, a way to select and edit
      existing items. There should also be a button to create a new item.
    </Typography>
  </MainCard>
);

export default CustomersPage;

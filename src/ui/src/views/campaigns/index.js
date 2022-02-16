// material-ui
import { Typography } from "@mui/material";

// project imports
import MainCard from "ui-component/cards/MainCard";
import EnhancedTable from "ui-component/EnhancedTable";
// ==============================|| SAMPLE PAGE ||============================== //

const CampaignsPage = () => (
  <MainCard title="Campaigns">
    <Typography variant="body2">
      Insert table here. Table must have a search bar, a way to select and edit
      existing items. There should also be a button to create a new item.
      <EnhancedTable />
    </Typography>
  </MainCard>
);

export default CampaignsPage;

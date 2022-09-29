// material-ui
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MainCard from "ui-component/cards/MainCard";

// project imports
import LandingPageForm from "ui-component/forms/LandingPageForm";

const lpRowTransform = (landingPageRow) => {
  if (!landingPageRow.hasOwnProperty("name")) {
    landingPageRow.name = "";
  }
  if (!landingPageRow.hasOwnProperty("created_by")) {
    landingPageRow.created_by = "";
  }
  if (!landingPageRow.hasOwnProperty("is_default_template")) {
    landingPageRow.is_default_template = false;
  }
  return landingPageRow;
};

const findDefaultPage = (rows, landingPageRow) => {
  let currentDefaultPage = {};
  let currentPageIsDefault = false;
  let hasDefault = false;
  rows.forEach((entry) => {
    if (entry.is_default_template == true) {
      currentDefaultPage = entry;
      if (entry._id == landingPageRow._id) {
        currentPageIsDefault = true;
      }
      hasDefault = true;
    }
  });
  return [currentDefaultPage, currentPageIsDefault, hasDefault];
};
const newOrEdit = (dataEntryType) => {
  if (dataEntryType == "new") {
    return "New Landing Page";
  }
  return "Edit Landing Page";
};

const LPDataEntryPage = () => {
  const { state } = useLocation();
  let lpValues = lpRowTransform(state.row);
  let mainCardTitle = newOrEdit(state.dataEntryType);
  const [currentDefaultPage, currentPageIsDefault, hasDefault] =
    findDefaultPage(state.rows, state.row);
  return (
    <MainCard title={mainCardTitle}>
      <Box sx={{ ml: 5, mr: 5, mt: 3, maxWidth: 1000, minWidth: 350 }}>
        <Grid container spacing={2}>
          <LandingPageForm
            initialValues={lpValues}
            dataEntryType={mainCardTitle}
            currentDefaultPage={currentDefaultPage}
            currentPageIsDefault={currentPageIsDefault}
            hasDefault={hasDefault}
          />
        </Grid>
      </Box>
    </MainCard>
  );
};

export default LPDataEntryPage;

import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MainCard from "ui-component/cards/MainCard";
import LandingPageForm from "ui-component/forms/LandingPageForm";

/**
 * A helper function to transform the given landing page row to ensure it has all expected properties.
 *
 * @param {Object} landingPageRows The row object to transform.
 * @returns {Object} The transformed landing page row.
 */
const lpRowTransform = (landingPageRows) => {
  const defaultValues = {
    name: "",
    created_by: "",
    is_default_template: false,
  };

  return {
    ...defaultValues,
    ...landingPageRows,
  };
};

/**
 * A helper function to find the current default landing page and determine whether the current page is the default or not.
 *
 * @param {Array} rows An array of landing page rows.
 * @param {Object} landingPageRow The current landing page row.
 * @returns {Array} An array containing the current default landing page, whether the current page is the default, and whether a default page exists or not.
 */
const findDefaultLandingPage = (rows, landingPageRow) => {
  let currentDefaultPage = {};
  let currentPageIsDefault = false;
  let hasDefault = false;
  rows.forEach((entry) => {
    if (entry.is_default_template === true) {
      currentDefaultPage = entry;
      if (entry._id === landingPageRow._id) {
        currentPageIsDefault = true;
      }
      hasDefault = true;
    }
  });
  return [currentDefaultPage, currentPageIsDefault, hasDefault];
};

/**
 * A helper function to determine whether to display a "New Landing Page" or "Edit Landing Page" header.
 *
 * @param {String} dataEntryType The type of data entry being performed, either "new" or "edit".
 * @returns {String} The header to display.
 */
const newOrEdit = (dataEntryType) => {
  return dataEntryType === "new" ? "New Landing Page" : "Edit Landing Page";
};

/**
 * The component that renders the data entry page for landing pages.
 *
 * @returns {JSX.Element} The LPDataEntryPage component.
 */
const LPDataEntryPage = () => {
  const { state } = useLocation();
  const lpValues = lpRowTransform(state.row);
  const mainCardTitle = newOrEdit(state.dataEntryType);
  const [currentDefaultPage, currentPageIsDefault, hasDefault] =
    findDefaultLandingPage(state.rows, state.row);

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

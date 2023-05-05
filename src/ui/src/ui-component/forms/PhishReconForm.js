import { useState, useEffect } from "react";
import PropTypes from "prop-types";

// material-ui
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import SaveIcon from "@mui/icons-material/Save";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

// project imports
import ConfirmDialog from "ui-component/popups/ConfirmDialog";
import ResultDialog from "ui-component/popups/ResultDialog";
import { submitEntry } from "services/api.js";

// ==============================|| Phish Reconn Form view ||============================== //

/**
 * Manage Reconnaissance details for each customer.
 * @param {Object} props - Component props.
 * @param {Object} props.selectedRow - The selected row object.
 * @param {boolean} props.viewResults - A flag indicating if the view results page is being used.
 * @param {boolean} props.isLoading - A boolean to indicate whether API response is still loading.
 * @param {Array} props.getData - An array of data to export.
 * @param {Function} props.setError - A function to set the error from the API response.
 * @param {Array} props.getError - An array of data with if there's an error, and if so, what it is.
 */
const PhishReconForm = (props) => {
  const { selectedRow, viewResults, isLoading, getData, getError, setError } =
    props;
  const { customer_notes } = selectedRow;
  const [notes, setNotes] = useState(customer_notes);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [savebtnOpen, setSavebtnOpen] = useState(false);
  // Effect hook to update the notes state variable when customer_notes change
  useEffect(() => {
    setNotes(customer_notes);
  }, [customer_notes]);
  /**
   * Function to validate notes.
   * @returns {boolean} true if notes are equal to customer_notes.
   */
  const validateNotes = () => notes === customer_notes;
  /**
   * Function to export data as JSON and download it.
   */
  const exportData = () => {
    const data = viewResults ? selectedRow.recon_results : getData;
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(data)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = `${selectedRow.domain}_results.json`;
    link.click();
  };
  /**
   * Function to save notes and submit the form data.
   */
  const saveNotes = () => {
    const data = { customer_notes: notes };
    submitEntry("customers", data, selectedRow._id, "Edit", setError);
    setHasSubmitted(true);
    setSavebtnOpen(false);
    if (!getError[0]) {
      setIsDisabled(true);
      setNotes(notes);
    }
  };
  // JSX for rendering the additional components for the recon form
  const reconExtras = (
    <>
      <Grid item xs={10} sm={6} md={4} lg={3} xl={3}>
        <Button
          color="warning"
          variant="contained"
          size="large"
          fullWidth
          onClick={exportData}
          endIcon={<FileDownloadIcon />}
        >
          Download Results
        </Button>
      </Grid>
      <Grid item xs={2} sm={6} md={8} lg={9} xl={9} />
      <Grid item xs={10} sm={10} md={10} lg={10} xl={10} sx={{ mt: 3 }}>
        <Typography>Web Search Findings</Typography>
      </Grid>
      <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
        <TextField
          fullWidth
          multiline
          minRows={5}
          id="notes"
          name="notes"
          label="Notes"
          disabled={isDisabled}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </Grid>
      <Grid item xs={10} sm={12} md={12} lg={12} xl={12}>
        <Typography variant="caption" sx={{ fontStyle: "italic" }}>
          Manual phish reconnaissance research for
          {" " + name + " "}
          can be added here.
        </Typography>
      </Grid>
      <Grid item xs={10} sm={3} md={2} lg={2} xl={1}>
        <Button
          fullWidth
          variant="outlined"
          size="large"
          onClick={() => setIsDisabled(false)}
          endIcon={<EditIcon />}
        >
          Edit
        </Button>
      </Grid>
      <Grid item xs={10} sm={3} md={2} lg={2} xl={1}>
        <Button
          fullWidth
          color="info"
          variant="contained"
          size="large"
          disabled={isDisabled || validateNotes()}
          onClick={() => setSavebtnOpen(true)}
          endIcon={<SaveIcon />}
        >
          Save
        </Button>
      </Grid>
      <ResultDialog
        type={"Edit customer notes"}
        hasSubmitted={hasSubmitted}
        error={getError}
        closeDialog={() => setHasSubmitted(false)}
      />
      <ConfirmDialog
        subtitle={"Recon notes for " + name + " will be saved in the database."}
        confirmType={"Save Notes"}
        handleClick={saveNotes}
        isOpen={savebtnOpen}
        setIsOpen={setSavebtnOpen}
      />
    </>
  );
  if (viewResults) {
    return (
      <Grid container spacing={2} sx={{ mt: 1 }} id="section2">
        <Grid item xs={12} sm={12} md={12} xl={12}>
          <Typography variant="h5">Results for {name}</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <pre>{JSON.stringify(selectedRow.recon_results, null, 2)}</pre>
        </Grid>
        {reconExtras}
      </Grid>
    );
  } else if (isLoading) {
    return (
      <Grid container spacing={2} id="section2" sx={{ mb: 2, mt: 3 }}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Typography variant="h5">Running the Harvester on {name}</Typography>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ mt: 2 }}>
            <Box sx={{ width: "100%" }}>
              <LinearProgress />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ mt: 2 }}>
            <Typography variant="subtitle2">
              Please wait while the Harvester runs...
            </Typography>
            <Typography variant="caption" sx={{ fontStyle: "italic" }}>
              This may take a few minutes
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  } else if (getError[0]) {
    return (
      <Grid container spacing={2} id="section2" sx={{ mb: 2, mt: 3 }}>
        <Grid item xs={8} lg={12} xl={12}>
          Unable to retrieve results. {getError[1]}.
        </Grid>
      </Grid>
    );
  } else if (getData.length != 0) {
    return (
      <Grid container spacing={2} sx={{ mb: 2, mt: 3 }}>
        <Grid item xs={12} sm={12} md={12} xl={12} id="section2">
          <Typography variant="h5">Results for {name}</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <pre>{JSON.stringify(getData, null, 2)}</pre>
        </Grid>
        {getError[0] ? (
          <>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              {getError[0]} Unable to save results to database. See console log
              for more details.
            </Grid>
            <Grid item xs={2} sm={6} md={8} lg={9} xl={9} />
          </>
        ) : (
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            Results have been saved successfully.
          </Grid>
        )}
        {reconExtras}
      </Grid>
    );
  }
  return (
    <Grid container spacing={2} id="section2" sx={{ mb: 2, mt: 3 }}>
      <Grid item xs={8} lg={12} xl={12}>
        No domain has been selected.
      </Grid>
    </Grid>
  );
};

PhishReconForm.propTypes = {
  selectedRow: PropTypes.object,
  triggerDataFetch: PropTypes.func,
  viewResults: PropTypes.bool,
  isLoading: PropTypes.bool,
  getData: PropTypes.array,
  setError: PropTypes.func,
  getError: PropTypes.array,
};

export default PhishReconForm;

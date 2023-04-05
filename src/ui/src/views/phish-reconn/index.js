import { useState, useRef, useMemo } from "react";
import PropTypes from "prop-types";

// material-ui
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import Typography from "@mui/material/Typography";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

// project imports
import MainCard from "ui-component/cards/MainCard";
import MainDataTable from "ui-component/tables/MainDataTable";
import PhishReconForm from "ui-component/forms/PhishReconForm";
import { useGetAll, fetchData } from "services/api.js";

// ==============================|| Phish Reconn view ||============================== //

/**
 * Renders the main card with the phish recon table.
 * @param {object} props - Component props.
 * @param {array} props.rows - Array of rows to display in the table.
 * @param {string} props.dataEntry - Route to add or edit a phish recon entry.
 * @param {string} props.triggerDataFetch - Fetched data used for the PhishReconForm.
 * @param {React.ReactNode} props.children - Child components to render.
 * @returns {JSX.Element} The MainCard and MainDataTable of the component.
 */
function PhishReconTable({ rows, dataEntry, children, triggerDataFetch }) {
  const [selectedRow, setSelectedRow] = useState({});
  const [viewResults, setViewResults] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [getHarvesterData, setHarvesterData] = useState([]);
  const [getError, setError] = useState([false, ""]);

  const sectionRef = useRef(null);
  let timerId;
  const handleScrollClick = () => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      const element = sectionRef.current;
      if (element) {
        window.scrollTo({
          top: element.getBoundingClientRect().height + 80,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  const handleHarvesterClick = (row) => {
    setViewResults(false);
    setSelectedRow(row);
    setLoading(true);
    fetchData(row, triggerDataFetch, setLoading, setHarvesterData, setError);
  };

  const cols = [
    { field: "id", hide: true },
    { field: "domain", headerName: "Customer Domain", flex: 1 },
    { field: "name", headerName: "Customer Name", flex: 1 },
    { field: "last_recon_date", headerName: "Last Run Date (UTC)", flex: 1 },
    {
      field: "see_results",
      headerName: "View Harvester Results",
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (cellValues) => {
        let isDisabled = true;
        if (cellValues.row.last_recon_date != "-") {
          isDisabled = false;
        }
        return (
          <IconButton
            variant="contained"
            disabled={isDisabled}
            onClick={() => {
              handleScrollClick();
              setSelectedRow(cellValues.row);
              setViewResults(true);
            }}
          >
            <VisibilityOutlinedIcon />
          </IconButton>
        );
      },
      flex: 0.8,
    },
    {
      field: "run",
      headerName: "Run Harvester",
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (cellValues) => {
        let isDisabled = true;
        if (cellValues.row.domain) {
          isDisabled = false;
        }
        return (
          <IconButton
            variant="contained"
            color="primary"
            href="#section2"
            disabled={isDisabled}
            onClick={() => handleHarvesterClick(cellValues.row)}
          >
            <PlayCircleFilledWhiteIcon />
          </IconButton>
        );
      },
      flex: 0.6,
    },
  ];

  return (
    <MainCard title="Phish Reconnaissance">
      <Grid container spacing={2} ref={sectionRef} id="section1">
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          {children}
          <Box sx={{ maxWidth: 1200 }}>
            <MainDataTable
              data={{ rows: rows, columns: cols }}
              newEntryRoute={dataEntry}
              editEntryRoute={dataEntry}
              tableCategory={"Phish Reconnaissance"}
            />
          </Box>
        </Grid>
      </Grid>
      <PhishReconForm
        selectedRow={selectedRow}
        triggerDataFetch={triggerDataFetch}
        viewResults={viewResults}
        isLoading={isLoading}
        getData={getHarvesterData}
        getError={getError}
      />
    </MainCard>
  );
}

PhishReconTable.propTypes = {
  rows: PropTypes.array,
  children: PropTypes.object,
  dataEntry: PropTypes.string,
  triggerDataFetch: PropTypes.func,
};

/**
 * Transforms an array of customer data to the format needed by the ReconTable component.
 * @param {Object[]} rowsArray - An array of customer data objects.
 * @returns {Object[]} - The transformed array of customer data objects.
 */
const reconRows = (rowsArray) => {
  if (!Array.isArray(rowsArray) || rowsArray.length === 0) {
    return [];
  }
  const reconRows = rowsArray.map((entry) => {
    const customer_notes = entry.hasOwnProperty("customer_notes")
      ? entry.customer_notes
      : "";
    const recon_results = entry.hasOwnProperty("recon_results")
      ? entry.recon_results
      : [];
    const last_recon_date = recon_results.reduce(
      (prev, curr) => {
        const prev_date = new Date(prev.recon_time);
        const curr_date = new Date(curr.recon_time);
        return prev_date > curr_date ? prev : curr;
      },
      { recon_time: "-" }
    ).recon_time;

    return { ...entry, customer_notes, last_recon_date };
  });

  return reconRows;
};

/**
 * Renders a page for displaying Recon data for customers.
 * @returns {JSX.Element} - The React component for the page.
 */
function PhishReconnPage() {
  const [fetchData, setFetchData] = useState(true);
  // Toggles the state of `fetchData` to trigger data refetch.
  const triggerDataFetch = () => setFetchData((t) => !t);
  const { isLoading, getData: rows, error } = useGetAll("customers");
  const transformedRows = useMemo(() => reconRows(rows), [rows]);

  return (
    <PhishReconTable
      rows={isLoading ? [] : transformedRows}
      dataEntry={"data-entry"}
      triggerDataFetch={triggerDataFetch}
    >
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}. Unable to load data from the database.
        </Alert>
      ) : transformedRows.length === 0 ? (
        <Typography sx={{ mb: 2 }}>No recon data entries found.</Typography>
      ) : (
        <Typography sx={{ mb: 2 }}>
          Select a Customer Domain to run Reconnaissance on or view its past
          results.
        </Typography>
      )}
    </PhishReconTable>
  );
}

export default PhishReconnPage;

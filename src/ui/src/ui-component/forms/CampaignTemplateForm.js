import PropTypes from "prop-types";

// material ui
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// project imports
import AdvancedSimpleDataTable from "ui-component/tables/AdvancedSimpleDataTable";
import HtmlEditor from "./HtmlEditor";

const cols = [
  { field: "id", hide: true },
  { field: "name", headerName: "Template Name", minWidth: 255, flex: 1.2 },
  {
    field: "deception_score",
    headerName: "Score",
    minWidth: 80,
    maxWidth: 80,
    flex: 0.5,
  },
  {
    field: "from_address",
    headerName: "From Address",
    minWidth: 130,
    flex: 1,
    hide: true,
  },
];

CampaignTemplateForm.propTypes = {
  formik: PropTypes.object,
  templates: PropTypes.object,
};

export default function CampaignTemplateForm(props) {
  // const getData = require("views/templates/mockTemData.json");
  const template_id = props.formik.values.target_template_uuid;
  const rows = props.templates.getData;
  let template_name = "(None Selected)";
  let selectedTemplateDisplay = (
    <Grid item xs={12} sm={12} md={12} lg={6.5} xl={6.5}>
      The selected template will display here.
    </Grid>
  );
  const handleRowClick = (params) => {
    props.formik.setFieldValue("target_template_uuid", params.row._id);
  };
  if (props.templates.getError[0]) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {props.templates.getError[1]}. Error loading template data from the
        database.
      </Alert>
    );
  } else if (props.templates.getData.length == 0) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        No templates found. Go to "Templates" in the Main Menu to add templates.
      </Alert>
    );
  } else if (template_id) {
    const selectedRow = rows.find((template) => template._id == template_id);
    template_name = selectedRow.name;
    selectedTemplateDisplay = (
      <Grid item xs={12} sm={12} md={12} lg={6.5} xl={6.5}>
        <Typography fontSize={16} display="inline">
          Subject:&nbsp;
        </Typography>
        <Typography fontSize={16} display="inline" fontWeight="medium">
          {selectedRow.subject}
        </Typography>
        <br />
        <Typography fontSize={16} display="inline">
          From:&nbsp;
        </Typography>
        <Typography fontSize={16} display="inline" fontWeight="medium">
          {selectedRow.from_address}
        </Typography>
        <Box sx={{ mt: 2 }} />
        <HtmlEditor
          value={selectedRow.html}
          setValue={() => selectedRow.html}
          height={"510"}
          disabled={true}
        />
      </Grid>
    );
  }
  return (
    <>
      <Divider color="gray" sx={{ height: 2 }} />
      <Grid container spacing={2} sx={{ mt: 1, mb: 3 }}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Typography color="black" fontSize={18} component="div">
            <Box sx={{ fontWeight: "regular" }}>Template Selection</Box>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={5} xl={5}>
          <Typography sx={{ mb: 1 }} fontSize={16}>
            Select or re-select a template by clicking on a row.
          </Typography>
          <AdvancedSimpleDataTable
            data={{ rows: rows, columns: cols }}
            handleRowClick={handleRowClick}
            selected_id={[template_id]}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={0.5} xl={0.5} />
        {selectedTemplateDisplay}
        <Grid item xs={12} sm={12} md={12} lg={5} xl={5}>
          <Typography fontSize={15}>
            Selected Template: <b>{template_name}</b>
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

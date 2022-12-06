import PropTypes from "prop-types";

import { Editor } from "@tinymce/tinymce-react";

function HtmlEditor(props) {
  let height = props.height;
  if (typeof height == undefined) {
    height = "700";
  }
  return (
    <Editor
      apiKey="93v3azvbr0e5gg10ha39h4nehsyg1f2orfiw6mp22qjr6j6j"
      value={props.value}
      onEditorChange={(newValue) => props.setValue(newValue)}
      init={{
        height: height,
        width: "100%",
        max_width: 800,
        menubar: true,
        resize: true,
        toolbar: true,
      }}
      disabled={props.disabled}
    />
  );
}

HtmlEditor.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func,
  height: PropTypes.string,
  disabled: PropTypes.bool,
};

export default HtmlEditor;

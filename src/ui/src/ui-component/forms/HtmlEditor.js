import PropTypes from "prop-types";

import { Editor } from "@tinymce/tinymce-react";

function HtmlEditor(props) {
  const htmlTag = "<!DOCTYPE html>";
  return (
    <Editor
      value={props.value}
      onEditorChange={(newValue) => props.setValue(htmlTag + newValue)}
      init={{
        height: 500,
        width: "100%",
        max_width: 800,
        menubar: true,
        resize: true,
        plugins:
          "print preview powerpaste casechange importcss \
            searchreplace autolink autosave save directionality \
            advcode visualblocks visualchars fullscreen image link \
            media mediaembed template codesample table charmap hr \
            pagebreak nonbreaking anchor toc insertdatetime advlist \
            lists checklist wordcount tinymcespellchecker a11ychecker \
            textpattern noneditable help formatpainter pageembed charmap \
            mentions linkchecker emoticons advtable",
        toolbar: true,
      }}
    />
  );
}

HtmlEditor.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func,
};

export default HtmlEditor;

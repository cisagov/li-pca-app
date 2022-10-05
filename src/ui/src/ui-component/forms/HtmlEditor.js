import React, { useState, useEffect } from "react";

import { Editor } from "@tinymce/tinymce-react";

function SanitizeValue(content) {
  content = "<html>" + content + "</html>";
  return content;
}

function HtmlEditor(props) {
  // const [value, setValue] = useState(props.initalValue ?? "");
  return (
    <Editor
      // initialValue={props.value}
      value={props.value}
      onEditorChange={(newValue) => props.setValue(newValue)}
      init={{
        height: 500,
        width: 800,
        menubar: true,
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

export default HtmlEditor;

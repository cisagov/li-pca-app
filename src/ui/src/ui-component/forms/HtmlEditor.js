import PropTypes from "prop-types";

import { Editor } from "@tinymce/tinymce-react";

/**
 * A React component for rendering an HTML editor.
 * @param {Object} props - The props object for the component.
 * @param {string} [props.height="700"] - The height of the editor (in pixels).
 * @param {string} props.value - The current value of the editor.
 * @param {function} props.setValue - A function to set the value of the editor.
 * @param {boolean} [props.disabled=false] - Whether the editor should be disabled.
 * @returns {JSX.Element} - The HTML editor component.
 */
function HtmlEditor(props) {
  let height = props.height;
  if (typeof height == undefined) {
    height = "700";
  }
  return (
    <Editor
      value={props.value}
      onEditorChange={(newValue) => props.setValue(newValue)}
      init={{
        height: height,
        width: "100%",
        max_width: 800,
        menubar: "file edit insert view format table tools help",
        selector: "textarea#image-tools",
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
        plugins: [
          "advlist autolink lists link image charmap print preview anchor",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table paste imagetools wordcount",
        ],
        toolbar:
          "insertfile undo redo | styleselect | bold italic | \
          alignleft aligncenter alignright alignjustify | \
          bullist numlist outdent indent | link image",
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
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

import { useState } from "react";

// third party 
import { Editor } from "@tinymce/tinymce-react";

/**
 * A component for editing HTML email templates using the TinyMCE editor.
 * @returns {JSX.Element} TemplateHtmlEditor component.
 */
function TemplateHtmlEditor() {
  const [content, setContent] = useState("");

  /**
   * Handles a change in the editor's content.
   * @param {string} content - The new content of the editor.
   * @param {Editor} editor - The TinyMCE editor object.
   */
  function handleChange(content, editor) {
    content = "<html>" + content + "</html>";
    setContent(content);
  }

  /**
   * Handles the submission of the form.
   * @param {Event} event - The form submission event.
   */
  function handleSubmit(event) {
    alert("Text was submitted: " + content);
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Enter and style the HTML content for this template.</h3>
      <Editor
        value={content}
        init={{
          height: 500,
          width: 800,
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
          toolbar:
            "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
        onEditorChange={handleChange}
      />
      <br />
      <input type="submit" value="Submit" />
    </form>
  );
}

export default TemplateHtmlEditor;

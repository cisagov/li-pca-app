import React from "react";
// import "./styles.css";

import { Editor } from "@tinymce/tinymce-react";

class TemplateHtmlEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { content: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(content, editor) {
    content = "<html>" + content + "</html>";
    this.setState({ content });
  }

  handleSubmit(event) {
    alert("Text was submitted: " + this.state.content);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Enter and style the HTML content for this template.</h3>
        <Editor
          value={this.state.content}
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
          onEditorChange={this.handleChange}
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default TemplateHtmlEditor;

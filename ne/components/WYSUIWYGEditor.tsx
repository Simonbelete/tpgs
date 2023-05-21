"use client";

/* eslint-disable react/display-name */
import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

const WYSUIWYGEditor = React.forwardRef((props, ref) => (
  <Editor
    apiKey="gl0uom3ood9zrhu2447frhxisrjxh2fajwgmwem7n6b4pcig"
    onInit={(evt, editor) => (ref.current = editor)}
    initialValue="<p>This is the initial content of the editor.</p>"
    init={{
      height: 500,
      menubar: false,
      plugins: [
        "advlist autolink lists link image charmap print preview anchor",
        "searchreplace visualblocks code fullscreen",
        "insertdatetime media table paste code help wordcount",
      ],
      toolbar:
        "undo redo | blocks | " +
        "bold italic forecolor | alignleft aligncenter " +
        "alignright alignjustify | bullist numlist outdent indent | " +
        "removeformat | help",
      content_style:
        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
    }}
  />
));

export default WYSUIWYGEditor;

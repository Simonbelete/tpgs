"use client";

/* eslint-disable react/display-name */
import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

const WYSUIWYGEditor = React.forwardRef(
  (props: { initialValue?: string }, ref) => (
    <Editor
      apiKey="75afnwchpu80g0vxl77hookuo0arhm7rj4v0wy8il1urmo3t"
      onInit={(evt, editor) => (ref.current = editor)}
      initialValue={props.initialValue == null ? "" : props.initialValue}
      init={{
        height: 500,
        menubar: true,
        plugins: [
          "image",
          "lists advlist numlist bullist",
          "anchor",
          "charmap",
          "emoticons",
          "fullscreen",
          "insertdatetime",
          "media",
          "pagebreak",
          "preview",
          "quickbars",
        ],
        toolbar:
          "undo redo | blocks | bold italic | alignleft aligncentre alignright alignjustify | indent outdent | bullist numlist",
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",
      }}
    />
  )
);

export default WYSUIWYGEditor;

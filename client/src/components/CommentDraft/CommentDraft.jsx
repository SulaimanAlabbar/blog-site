import React from "react";
import ReactQuill from "react-quill";
import "../../app/css/quill.bubble.css";

export default function CommentDraft(props) {
  return (
    <ReactQuill
      value={props.draft}
      onChange={props.handleChange}
      theme="bubble"
      modules={{
        toolbar: {
          container: [
            [
              "bold",
              "italic",
              "underline",
              "strike",
              { script: "sub" },
              { script: "super" }
            ],
            ["clean"]
          ]
        }
      }}
      formats={["bold", "italic", "underline", "strike", "script"]}
      placeholder="New comment..."
      className="Draft--container"
      ref={props.quillRef}
    />
  );
}

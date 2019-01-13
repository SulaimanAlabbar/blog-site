import React from "react";
import "./Button.css";

export default function Button(props) {
  return (
    <div
      className="Button--container"
      style={{ width: props.width }}
      onClick={props.onClick}
    >
      {props.text}
    </div>
  );
}

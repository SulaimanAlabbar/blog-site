import React from "react";

export default function UserPanelButton(props) {
  return (
    <div className="UserPanelButton" onClick={() => props.onClick()}>
      {props.text}
    </div>
  );
}

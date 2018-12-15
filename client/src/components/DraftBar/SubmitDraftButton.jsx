import React from "react";

export default function SubmitDraftButton(props) {
  return (
    <div className="SubmitDraftButton" onClick={() => props.onClick()}>
      Submit Draft
    </div>
  );
}

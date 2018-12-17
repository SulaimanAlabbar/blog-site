import React from "react";
import Draft from "../../components/Draft";
import DraftBar from "../../components/DraftBar";
import HomeFromDraftButton from "../../components/HomeFromDraftButton";
import "./style.css";

export default function index() {
  return (
    <div className="DraftPage--container pt-page-scaleUpDown">
      <div className="DraftPage--DraftBar">
        <DraftBar />
      </div>
      <div className="DraftPage--Draft">
        <Draft />
      </div>
      <HomeFromDraftButton />
    </div>
  );
}

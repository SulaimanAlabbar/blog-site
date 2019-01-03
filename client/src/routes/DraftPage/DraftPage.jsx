import React from "react";
import ArticleDraft from "../../components/ArticleDraft";
import ArticleDraftBar from "../../components/ArticleDraftBar";
import HomeFromDraftButton from "../../components/HomeFromDraftButton";
import "./DraftPage.css";

export default function DraftPage() {
  return (
    <div className="DraftPage--container pt-page-scaleUpDown">
      <div className="DraftPage--DraftBar">
        <ArticleDraftBar />
      </div>
      <div className="DraftPage--Draft">
        <ArticleDraft />
      </div>
      <HomeFromDraftButton />
    </div>
  );
}

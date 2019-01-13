import React from "react";
import { Link, withRouter } from "react-router-dom";
import ArticleDraft from "../../components/ArticleDraft";
import ArticleDraftBar from "../../components/ArticleDraftBar";
import Button from "../../components/Button";
import "./DraftPage.css";

function DraftPage() {
  return (
    <div className="DraftPage--container pt-page-scaleUpDown">
      <div className="DraftPage--DraftBar">
        <ArticleDraftBar />
      </div>
      <div className="DraftPage--Draft">
        <ArticleDraft />
      </div>
      <div className="DraftPage--HomeButton">
        <Link to="/">
          <Button text="Return To Home" width="170px" />
        </Link>
      </div>
    </div>
  );
}

export default withRouter(DraftPage);

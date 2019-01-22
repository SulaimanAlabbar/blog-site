import React from "react";
import { connect } from "react-redux";
import { Link, Redirect, withRouter } from "react-router-dom";
import ArticleDraft from "../../components/ArticleDraft";
import ArticleDraftBar from "../../components/ArticleDraftBar";
import Button from "../../components/Button";
import * as actionCreators from "../../util/actionCreators";
import "./DraftPage.css";

function DraftPage({ goHome, gotoHome }) {
  if (goHome) {
    gotoHome(false);
    return <Redirect to="/" />;
  }

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

const mapStateToProps = state => ({
  goHome: state.gotoHome
});

const mapDispatchToProps = actionCreators;

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(DraftPage)
);

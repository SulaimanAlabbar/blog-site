import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import * as actionCreators from "../../util/actionCreators";
import Button from "../Button";
import "./NewArticleButton.css";

function NewArticleButton({ role }) {
  const hidden = role === "owner" || role === "contributor" ? "" : "hidden";

  return (
    <div className={`NewArticleButton--container ${hidden}`}>
      <Link to="/articleDraft">
        <Button width="170px" text="Create New Article" />
      </Link>
    </div>
  );
}

const mapStateToProps = state => ({
  role: state.role
});

const mapDispatchToProps = actionCreators;

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NewArticleButton)
);

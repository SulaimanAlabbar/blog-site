import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../util/actionCreators";
import DraftTitleInput from "./DraftTitleInput";
import SubmitDraftButton from "./SubmitDraftButton";
import "./style.css";

class index extends Component {
  handleClick() {
    this.props.submitDraft(true);
  }

  render() {
    return (
      <div className="DraftBar--container">
        <h2 className="DraftBar--articleTitle">Article Title: </h2>
        <DraftTitleInput />
        <SubmitDraftButton onClick={() => this.handleClick()} />
      </div>
    );
  }
}

const mapDispatchToProps = actionCreators;

export default connect(
  null,
  mapDispatchToProps
)(index);

import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../util/actionCreators";
import CommentDraft from "./CommentDraft";
import "./style.css";

export default class index extends Component {
  render() {
    return (
      <div className="CommentDraft--container">
        <CommentDraft />
      </div>
    );
  }
}

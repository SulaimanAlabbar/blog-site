import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../util/actionCreators";
import "./style.css";

class index extends Component {
  handleClick = () => {
    this.props.setPage("MainPage");
  };

  render() {
    return (
      <div className="container--HomeFromDraftButton">
        <div className="HomeFromDraftButton" onClick={() => this.handleClick()}>
          Return To Home
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = actionCreators;

export default connect(
  null,
  mapDispatchToProps
)(index);

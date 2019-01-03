import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../util/actionCreators";
import "./style.css";

class index extends Component {
  handleClick = () => {
    this.props.setPage("DraftPage");
  };

  render() {
    const hidden =
      this.props.role === "owner" || this.props.role === "contributor"
        ? ""
        : "hidden";
    return (
      <div className={`NewArticleButton--container ${hidden}`}>
        <div className="NewArticleButton" onClick={this.handleClick}>
          Create New Article
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  role: state.role
});

const mapDispatchToProps = actionCreators;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(index);

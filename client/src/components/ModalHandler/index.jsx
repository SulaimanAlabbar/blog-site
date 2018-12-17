import React, { Component } from "react";
import { connect } from "react-redux";
import LoginModal from "../LoginModal";
import SubmitDraftModal from "../SubmitDraftModal";

class index extends Component {
  render() {
    const { visibleModal } = this.props;

    if (visibleModal === "login") return <LoginModal />;
    else if (visibleModal === "submit") return <SubmitDraftModal />;
    else return <></>;
  }
}

const mapStateToProps = state => ({
  visibleModal: state.visibleModal
});

export default connect(
  mapStateToProps,
  null
)(index);

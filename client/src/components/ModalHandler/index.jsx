import React, { Component } from "react";
import { connect } from "react-redux";
import LoginModal from "../LoginModal";
import RegistrationModal from "../RegistrationModal";
import SubmitDraftModal from "../SubmitDraftModal";

class index extends Component {
  render() {
    const { visibleModal } = this.props;

    if (visibleModal === "login") return <LoginModal />;
    if (visibleModal === "register") return <RegistrationModal />;
    if (visibleModal === "submit") return <SubmitDraftModal />;
    return <></>;
  }
}

const mapStateToProps = state => ({
  visibleModal: state.visibleModal
});

export default connect(
  mapStateToProps,
  null
)(index);

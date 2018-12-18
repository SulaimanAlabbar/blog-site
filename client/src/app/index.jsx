import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../util/actionCreators";
import MainPage from "../routes/MainPage";
import DraftPage from "../routes/DraftPage";
import ArticlePage from "../routes/ArticlePage";
import ModalHandler from "../components/ModalHandler";
import "./css/style.css";
import "./css/animations.css";
import "./css/editorStyles.css";

class App extends Component {
  render() {
    const { currentPage } = this.props;

    if (currentPage === "MainPage")
      return (
        <>
          <MainPage />
          <ModalHandler />
        </>
      );
    else if (currentPage === "DraftPage") {
      return (
        <>
          <DraftPage />
          <ModalHandler />
        </>
      );
    } else if (currentPage === "ArticlePage") {
      return (
        <>
          <ArticlePage />
          <ModalHandler />
        </>
      );
    }
  }
}

const mapStateToProps = state => ({
  role: state.role,
  currentPage: state.currentPage
});

const mapDispatchToProps = actionCreators;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

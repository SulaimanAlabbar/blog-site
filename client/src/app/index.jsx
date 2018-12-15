import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../modules/actionCreators";
import Main from "../pages/main";
import ArticleCreation from "../pages/articleCreation";
import ModalHandler from "../components/ModalHandler";
import "./css/style.css";
import "./css/animations.css";

class App extends Component {
  render() {
    const { currentPage } = this.props;

    if (currentPage === "main")
      return (
        <>
          <Main />
          <ModalHandler />
        </>
      );
    else if (currentPage === "articleCreation") {
      return (
        <>
          <ArticleCreation />
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

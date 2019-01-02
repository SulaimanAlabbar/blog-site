import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../util/actionCreators";
import MainPage from "../routes/MainPage";
import DraftPage from "../routes/DraftPage";
import ArticlePage from "../routes/ArticlePage";
import ModalHandler from "../components/ModalHandler";
import "./css/style.css";
import "./css/animations.css";
import { withRouter, Switch, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route
          path="/"
          exact
          render={() => (
            <>
              <MainPage />
              <ModalHandler />
            </>
          )}
        />
        <Route
          path="/:articleId"
          exact
          render={() => (
            <>
              <ArticlePage />
              <ModalHandler />
            </>
          )}
        />
        <Route
          path="/articleDraft"
          exact
          render={() => (
            <>
              <DraftPage />
              <ModalHandler />
            </>
          )}
        />
      </Switch>
    );
  }
}

const mapStateToProps = state => ({
  role: state.role,
  currentPage: state.currentPage
});

const mapDispatchToProps = actionCreators;

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);

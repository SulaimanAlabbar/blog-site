import React from "react";
// import React, { Component } from "react";
// import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";
// import * as actionCreators from "../util/actionCreators";
import MainPage from "../routes/MainPage";
import DraftPage from "../routes/DraftPage";
import ModalHandler from "../components/ModalHandler";
import "./css/App.css";
import "./css/animations.css";

function App() {
  return (
    <Switch>
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
      <>
        <MainPage />
        <ModalHandler />
      </>
    </Switch>
  );
}

// const mapStateToProps = state => ({
//   role: state.role,
//   currentPage: state.currentPage
// });

// const mapDispatchToProps = actionCreators;

// export default withRouter(
//   connect(
//     mapStateToProps,
//     mapDispatchToProps
//   )(App)
// );
export default withRouter(App);

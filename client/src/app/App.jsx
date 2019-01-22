import React from "react";
import { withRouter, Route, Switch } from "react-router-dom";
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

export default withRouter(App);

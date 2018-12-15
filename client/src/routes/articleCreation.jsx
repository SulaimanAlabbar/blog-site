import React, { Component } from "react";
import SearchPanel from "../components/SearchPanel";
import Description from "../components/Description";
import Header from "../components/Header";
import SocialMedia from "../components/SocialMedia";
import UserPanel from "../components/UserPanel";
import Draft from "../components/Draft";
import DraftBar from "../components/DraftBar";
export default class main extends Component {
  render() {
    return (
      <div className="articleCreation--container">
        <div className="articleCreation--header">
          <Header />
        </div>
        <div className="articleCreation--userPanel">
          <UserPanel />
        </div>
        <div className="articleCreation--socialPanel">
          <SocialMedia />
        </div>
        <div className="articleCreation--draftBar">
          <DraftBar />
        </div>
        <div className="articleCreation--draft">
          <Draft />
        </div>
        <div className="articleCreation--searchPanel">
          <SearchPanel />
        </div>
        <div className="articleCreation--description">
          <Description />
        </div>
        <div className="articleCreation--archive">archive</div>
        <div className="articleCreation--pagination">pagination</div>
      </div>
    );
  }
}

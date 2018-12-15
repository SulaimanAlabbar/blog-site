import React, { Component } from "react";
import SearchPanel from "../components/SearchPanel";
import Description from "../components/Description";
import Header from "../components/Header";
import SocialMedia from "../components/SocialMedia";
import UserPanel from "../components/UserPanel";
export default class main extends Component {
  render() {
    return (
      <div className="mainPage--container">
        <div className="mainPage--header">
          <Header />
        </div>
        <div className="mainPage--userPanel">
          <UserPanel />
        </div>
        <div className="mainPage--socialPanel">
          <SocialMedia />
        </div>
        <div className="mainPage--articles">articles</div>
        <div className="mainPage--searchPanel">
          <SearchPanel />
        </div>
        <div className="mainPage--description">
          <Description />
        </div>
        <div className="mainPage--archive">archive</div>
        <div className="mainPag--pagination">pagination</div>
      </div>
    );
  }
}

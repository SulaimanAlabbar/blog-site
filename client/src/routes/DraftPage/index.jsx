import React, { Component } from "react";
import SearchPanel from "../../components/SearchPanel";
import Description from "../../components/Description";
import Header from "../../components/Header";
import SocialMedia from "../../components/SocialMedia";
import UserPanel from "../../components/UserPanel";
import Draft from "../../components/Draft";
import DraftBar from "../../components/DraftBar";
import "./style.css";

export default class main extends Component {
  render() {
    return (
      <div className="DraftPage--container pt-page-scaleUpDown">
        <div className="DraftPage--Header">
          <Header />
        </div>
        <div className="DraftPage--UserPanel">
          <UserPanel />
        </div>
        <div className="DraftPage--SocialPanel">
          <SocialMedia />
        </div>
        <div className="DraftPage--DraftBar">
          <DraftBar />
        </div>
        <div className="DraftPage--Draft">
          <Draft />
        </div>
        <div className="DraftPage--SearchPanel">
          <SearchPanel />
        </div>
        <div className="DraftPage--Description">
          <Description />
        </div>
        <div className="DraftPage--Archive">archive</div>
        <div className="DraftPage--Pagination">pagination</div>
      </div>
    );
  }
}

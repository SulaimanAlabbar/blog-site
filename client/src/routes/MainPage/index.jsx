import React, { Component } from "react";
import SearchPanel from "../../components/SearchPanel";
import Description from "../../components/Description";
import Header from "../../components/Header";
import SocialMedia from "../../components/SocialMedia";
import UserPanel from "../../components/UserPanel";
import NewArticleButton from "../../components/NewArticleButton";
import Articles from "../../components/Articles";
import PagesBar from "../../components/PagesBar";
import "./style.css";

export default class main extends Component {
  render() {
    return (
      <div className="MainPage--container pt-page-scaleUpDown">
        <div className="MainPage--Header">
          <Header />
        </div>
        <div className="MainPage--UserPanel">
          <UserPanel />
        </div>
        <div className="MainPage--SocialPanel">
          <SocialMedia />
        </div>
        <div className="MainPage--Articles">
          <Articles />
        </div>
        <div className="MainPage--SearchPanel">
          <SearchPanel />
        </div>
        <div className="MainPage--Description">
          <Description />
        </div>
        <div className="MainPage--Archive">archive</div>
        <div className="MainPage--Pagination">
          <PagesBar />
        </div>
        <NewArticleButton />
      </div>
    );
  }
}

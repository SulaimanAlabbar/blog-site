import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../util/actionCreators";
import { withRouter } from "react-router";
import SearchPanel from "../../components/SearchPanel";
import Description from "../../components/Description";
import Header from "../../components/Header";
import SocialMedia from "../../components/SocialMedia";
import UserPanel from "../../components/UserPanel";
import NewArticleButton from "../../components/NewArticleButton";
import Article from "../../components/Article";
import Comments from "../../components/Comments";
import CommentDraft from "../../components/CommentDraft";
import "./style.css";

class index extends Component {
  render() {
    const hideCommentDraft = this.props.role === "guest";
    return (
      <div
        className={`ArticlePage--container${
          hideCommentDraft ? "--hideCommentDraft" : ""
        } pt-page-scaleUpDown`}
      >
        <div className="ArticlePage--Header">
          <Header />
        </div>
        <div className="ArticlePage--UserPanel">
          <UserPanel />
        </div>
        <div className="ArticlePage--SocialPanel">
          <SocialMedia />
        </div>
        <div className="ArticlePage--Article">
          <Article articleId={this.props.match.params.articleId} />
        </div>
        <div className="ArticlePage--SearchPanel">
          <SearchPanel />
        </div>
        <div className="ArticlePage--Description">
          <Description />
        </div>
        <div className="ArticlePage--Archive">archive</div>
        <div className="ArticlePage--Comments">
          <Comments />
        </div>
        <div
          className={`ArticlePage--CommentDraft${
            hideCommentDraft ? "--hideCommentDraft" : ""
          }`}
        >
          <CommentDraft />
        </div>
        <NewArticleButton />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  role: state.role
});

const mapDispatchToProps = actionCreators;

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(index)
);

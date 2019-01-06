import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, withRouter } from "react-router-dom";
import * as actionCreators from "../../util/actionCreators";
import SearchPanel from "../../components/SearchPanel";
import Description from "../../components/Description";
import Header from "../../components/Header";
import SocialMedia from "../../components/SocialMedia";
import UserPanel from "../../components/UserPanel";
import NewArticleButton from "../../components/NewArticleButton";
import Articles from "../../components/Articles";
import PagesBar from "../../components/PagesBar";
import Article from "../../components/Article";
import Comments from "../../components/Comments";
import CommentDraft from "../../components/CommentDraft";
import "./MainPage.css";
import "./ArticlePage.css";

function MainPage({ location, role }) {
  const hideCommentDraft = role === "guest";
  let page;

  if (location.pathname === "/") page = "MainPage";
  else if (location.pathname === "/0" || location.pathname === "/1")
    return <Redirect to="/" />;

  if (new RegExp("^/[0-9]*$").test(location.pathname)) page = "MainPage";
  else if (new RegExp("^/article/[0-9]*$").test(location.pathname))
    page = "ArticlePage";
  else page = "invalid";

  // console.log(page);

  // if (page === "invalid" && ) return <Redirect to="/" />;

  return (
    <div
      className={`${page}--container${
        page === "ArticlePage" && hideCommentDraft ? "--hideCommentDraft" : ""
      } pt-page-scaleUpDown`}
    >
      <div className={`${page}--Header`}>
        <Header />
      </div>
      <div className={`${page}--UserPanel`}>
        <UserPanel />
      </div>
      <div className={`${page}--SocialPanel`}>
        <SocialMedia />
      </div>
      <Route
        key="notPaged"
        exact
        path="/"
        render={() => (
          <div className={`${page}--Articles`}>
            <Articles pageNum={false} />
          </div>
        )}
      />
      <Route
        key="paged"
        exact
        path="/:pageNum"
        render={props => (
          <div className={`${page}--Articles`}>
            <Articles pageNum={props.match.params.pageNum} />
          </div>
        )}
      />
      <Route
        exact
        path="/article/:articleId"
        render={props => (
          <div className={`${page}--Article`}>
            <Article articleId={props.match.params.articleId} />
          </div>
        )}
      />
      <div className={`${page}--SearchPanel`}>
        <SearchPanel />
      </div>
      <div className={`${page}--Description`}>
        <Description />
      </div>
      <div className={`${page}--Archive`}>archive</div>
      <Route
        exact
        path="/article/:articleId"
        render={() => (
          <div className="ArticlePage--Comments">
            <Comments />
          </div>
        )}
      />
      <Route
        exact
        path="/article/:articleId"
        render={() => (
          <div
            className={`ArticlePage--CommentDraft${
              hideCommentDraft ? "--hideCommentDraft" : ""
            }`}
          >
            <CommentDraft />
          </div>
        )}
      />
      <Route
        exact
        path="/"
        render={() => (
          <div className={`${page}--Pagination`}>
            <PagesBar />
          </div>
        )}
      />
      <Route
        exact
        path="/:pageNum"
        render={() => (
          <div className={`${page}--Pagination`}>
            <PagesBar />
          </div>
        )}
      />
      <NewArticleButton />
    </div>
  );
}

const mapStateToProps = state => ({
  role: state.role
});

const mapDispatchToProps = actionCreators;

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MainPage)
);

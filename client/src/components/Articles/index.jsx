import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect, Link } from "react-router-dom";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";
import * as actionCreators from "../../util/actionCreators";
import Loader from "../Loader";
import "./style.css";

class index extends Component {
  isMounted = false;

  state = {
    loaded: false,
    redirectToMainPage: false
  };

  componentDidMount = async () => {
    this.isMounted = true;
    try {
      const { pageNum } = this.props;
      const page = typeof pageNum === "boolean" ? 0 : (Number(pageNum) - 1) * 5;
      const articles = await axios.get(`/api/articles/${page}`);

      if (articles.data) {
        this.props.setArticles(articles.data);
        this.setState({
          loaded: true
        });
      } else {
        this.setState({
          loaded: true,
          redirectToMainPage: true
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  componentWillUnmount = () => {
    this.isMounted = false;
  };

  render() {
    const { loaded, redirectToMainPage } = this.state;
    const { articles } = this.props;

    if (!loaded)
      return (
        <div className="container--loader--big">
          <Loader />
        </div>
      );
    if (redirectToMainPage) {
      return <Redirect to="/" />;
    }
    return (
      <div className="Articles--container">
        <ul className="Articles--ArticleList">
          {articles.map((article, i) => (
            <li className="Articles--Article--container" key={i}>
              <div className="Articles--Article--header">
                <Link to={`/article/${article.article_id}`}>
                  <h1 className="Articles--Article--title">
                    {article.article_title}
                  </h1>
                </Link>
                <h5 className="Articles--Article--author--date">
                  By {article.author_name} on{" "}
                  {new Date(article.article_created).toLocaleDateString()}
                </h5>
              </div>
              <div className="Articles--Article--body">
                {ReactHtmlParser(
                  new QuillDeltaToHtmlConverter(
                    article.article_content.ops
                  ).convert()
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  articles: state.articles
});

const mapDispatchToProps = actionCreators;

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(index)
);

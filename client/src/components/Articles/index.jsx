import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../util/actionCreators";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import ReactHtmlParser from "react-html-parser";
import axios from "axios";
import Loader from "../Loader";
import "./style.css";

class index extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      articles: []
    };
  }

  componentDidMount = async () => {
    try {
      const articlesInfo = await axios.get("/api/articles/0");

      if (articlesInfo.data) {
        this.props.setArticles(articlesInfo.data);

        this.setState({
          loaded: true
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  onArticleClick = async articleId => {
    try {
      // const article = await axios.get(`/api/article/${articleId}`);
      // this.props.setCurrentArticle(article.data);
      // this.props.setPage("ArticlePage");
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { loaded } = this.state;
    const { articles } = this.props;

    if (!loaded)
      return (
        <div className="container--loader--big">
          <Loader />
        </div>
      );
    else
      return (
        <div className="Articles--container">
          <ul className="Articles--ArticleList">
            {articles.map((article, index) => (
              <li className="Articles--Article--container" key={index}>
                <div className="Articles--Article--header">
                  <h1
                    className="Articles--Article--title"
                    onClick={() => this.onArticleClick(article.article_id)}
                  >
                    {article.article_title}
                  </h1>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(index);

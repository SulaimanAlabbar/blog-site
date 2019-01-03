import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import axios from "axios";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import ReactHtmlParser from "react-html-parser";
import * as actionCreators from "../../util/actionCreators";
import Loader from "../Loader";
import "./style.css";

class index extends Component {
  isMounted = false;

  state = {
    loaded: false,
    falseArticleId: false
  };

  componentDidMount = async () => {
    this.isMounted = true;
    (function smoothscroll() {
      const currentScroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - currentScroll / 5);
      }
    })();

    try {
      const article = await axios.get(`/api/article/${this.props.articleId}`);
      this.props.setCurrentArticle(article.data);

      if (article.data) {
        this.setState({
          loaded: true
        });
      } else {
        this.setState({
          loaded: true,
          falseArticleId: true
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
    const { loaded, falseArticleId } = this.state;
    const { currentArticle } = this.props;

    if (!loaded)
      return (
        <div className="container--loader--big">
          <Loader />
        </div>
      );
    if (falseArticleId) {
      return <Redirect to="/" />;
    } return (
        <div className="Article--container">
          <div className="Article--Article--header">
            <h1 className="Article--Article--title">
              {currentArticle.article_title}
            </h1>
            <h5 className="Article--Article--author--date">
              By {currentArticle.author_name} on{" "}
              {new Date(currentArticle.article_created).toLocaleDateString()}
            </h5>
          </div>
          <div className="Article--Article--body">
            {ReactHtmlParser(
              new QuillDeltaToHtmlConverter(
                currentArticle.article_content.ops
              ).convert()
            )}
          </div>
        </div>
      );
  }
}
const mapStateToProps = state => ({
  currentArticle: state.currentArticle
});

const mapDispatchToProps = actionCreators;

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(index)
);

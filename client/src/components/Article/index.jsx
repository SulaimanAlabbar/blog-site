import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../util/actionCreators";
// import draftToHtml from "draftjs-to-html";
import ReactHtmlParser from "react-html-parser";
import axios from "axios";
import Loader from "../Loader";
import "./style.css";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";

class index extends Component {
  state = {
    loaded: false,
    article: null
  };

  componentDidMount = async () => {
    (function smoothscroll() {
      const currentScroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - currentScroll / 5);
      }
    })();

    try {
      console.log("asd", this.props.articleId);
      const article = await axios.get(`/api/article/${this.props.articleId}`);
      //this.props.setCurrentArticle(article.data);
      //this.props.setPage("ArticlePage");

      console.log(article.data);
      if (!article.data) {
        this.setState({
          loaded: true,
          article: article.data
        });
      } else console.log("NO SUCH ARTICLE");
      //redirect?
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { loaded, article } = this.state;
    const { currentArticle } = this.props;

    if (!loaded)
      return (
        <div className="container--loader--big">
          <Loader />
        </div>
      );
    else
      return (
        <div className="Article--container">
          <div className="Article--Article--header">
            <h1 className="Article--Article--title">{article.article_title}</h1>
            <h5 className="Article--Article--author--date">
              By {article.author_name} on{" "}
              {new Date(article.article_created).toLocaleDateString()}
            </h5>
          </div>
          <div className="Article--Article--body">
            {ReactHtmlParser(
              new QuillDeltaToHtmlConverter(
                article.article_content.ops
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(index);

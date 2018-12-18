import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../util/actionCreators";
import draftToHtml from "draftjs-to-html";
import ReactHtmlParser from "react-html-parser";
import axios from "axios";
import Loader from "../Loader";
import "./style.css";

class index extends Component {
  componentDidMount = () => {
    (function smoothscroll() {
      const currentScroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - currentScroll / 5);
      }
    })();
  };

  render() {
    const { currentArticle } = this.props;
    return (
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
          {ReactHtmlParser(draftToHtml(currentArticle.article_content))}
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

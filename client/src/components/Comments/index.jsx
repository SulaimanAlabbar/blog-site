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
      comments: []
    };
  }

  componentDidMount = async () => {
    // console.log(this.props.articleId);
    // try {
    //   const comments = await axios.get(
    //     `/api/comments/${this.props.articleId}-${0}`
    //   );
    //   if (comments.data) {
    //     //this.props.setArticles(articlesInfo.data);
    //     this.setState({
    //       loaded: true,
    //       comments: comments.data
    //     });
    //   } else {
    //     this.setState({
    //       loaded: true
    //     });
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
  };

  render() {
    const { loaded, comments } = this.state;
    if (!loaded)
      return (
        <div className="container--loader--big">
          <Loader />
        </div>
      );
    else
      return (
        <div className="Comments--container">
          <ul className="Comments--CommentsList">
            {comments.map((comment, index) => (
              <li className="Comments--Comment--container" key={index}>
                <div className="Comments--Comment--header">
                  <img
                    src={comment.author_avatar}
                    alt="userAvatar"
                    className="Comments--Comment--avatar"
                  />
                  <h5 className="Comments--Comment--author--date">
                    By {comment.author_name} on{" "}
                    {new Date(comment.comment_created).toLocaleString()}
                  </h5>
                </div>
                <div className="Comments--Comment--body">
                  {ReactHtmlParser(
                    new QuillDeltaToHtmlConverter(
                      JSON.parse(comment.comment_content).ops
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
  articleId: state.currentArticle.article_id
});

const mapDispatchToProps = actionCreators;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(index);

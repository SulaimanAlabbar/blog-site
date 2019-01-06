import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import ReactHtmlParser from "react-html-parser";
import * as actionCreators from "../../util/actionCreators";
import Loader from "../Loader";
import "./Comments.css";

class Comments extends Component {
  _mounted = false;

  state = {
    loaded: false
  };

  componentDidMount = () => {
    this._mounted = true;
  };

  componentWillUnmount = () => {
    this._mounted = false;
    this.props.setComments([]);
  };

  componentDidUpdate = async prevProps => {
    if (
      this.props.currentArticle !== null &&
      this.props.currentArticle !== prevProps.currentArticle
    ) {
      try {
        const comments = await axios.get(
          `/api/comments/${this.props.currentArticle.article_id}-${0}`
        );

        if (!this._mounted) return;

        if (comments.data) {
          this.props.setComments(comments.data);
          this.setState({
            loaded: true
          });
        } else {
          this.setState({
            loaded: true
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  render() {
    const { loaded } = this.state;
    const { comments } = this.props;
    if (!loaded)
      return (
        <div className="container--loader--big">
          <Loader />
        </div>
      );
    return (
      <div className="Comments--container">
        <ul className="Comments--CommentsList">
          {comments.map((comment, i) => (
            <li className="Comments--Comment--container" key={i}>
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
  currentArticle: state.currentArticle,
  comments: state.comments
});

const mapDispatchToProps = actionCreators;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comments);

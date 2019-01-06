import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import * as actionCreators from "../../util/actionCreators";
import CommentEditor from "./CommentEditor";
import Button from "../Button";
import "./CommentDraft.css";

class CommentDraft extends Component {
  _mounted = false;

  constructor() {
    super();
    this.state = { text: "" };
    this.quillRef = React.createRef();
  }

  componentDidMount = () => {
    this._mounted = true;
  };

  componentWillUnmount = () => {
    this._mounted = false;
  };

  handleDraftChange = value => {
    if (!this._mounted) return;
    this.setState({ text: value });
  };

  submitComment = async () => {
    try {
      const commentSubmitted = await axios.post("/api/submitComment", {
        authorId: this.props.authorId,
        articleId: this.props.currentArticle.article_id,
        comment: this.quillRef.current.getEditor().getContents()
      });

      if (!this._mounted) return;

      if (!commentSubmitted.data) {
        // console.log("Do something here")
      } else {
        this.setState({ text: "" });
        const comments = await axios.get(
          `/api/comments/${this.props.currentArticle.article_id}-${0}`
        );

        if (!this._mounted) return;

        if (comments.data) {
          this.props.setComments(comments.data);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <div className="CommentDraft--container">
        <h2 className="CommentDraft--header">Leave a comment</h2>
        <div className="CommentDraft--CommentDraft">
          <CommentEditor
            draft={this.state.text}
            handleChange={this.handleDraftChange}
            quillRef={this.quillRef}
          />
        </div>
        <div className="CommentDraft--SubmitComment">
          <div className="SubmitCommentButton">
            <Button
              text="Submit Comment"
              width="170px"
              onClick={this.submitComment}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authorId: state.id,
  currentArticle: state.currentArticle
});

const mapDispatchToProps = actionCreators;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentDraft);

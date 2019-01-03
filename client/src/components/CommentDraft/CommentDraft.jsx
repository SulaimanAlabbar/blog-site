import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import * as actionCreators from "../../util/actionCreators";
import CommentEditor from "./CommentEditor";
import "./CommentDraft.css";

class CommentDraft extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "" };
    this.quillRef = React.createRef();
  }

  handleDraftChange = value => {
    this.setState({ text: value });
  };

  submitComment = async () => {
    try {
      const commentSubmitted = await axios.post("/api/submitComment", {
        authorId: this.props.authorId,
        articleId: this.props.currentArticle.articleId,
        comment: this.quillRef.current.getEditor().getContents()
      });

      if (!commentSubmitted.data) {
        // console.log("Do something here")
      } else {
        this.setState({ text: "" });
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
          <button
            type="button"
            className="SubmitCommentButton"
            onClick={this.submitComment}
          >
            Submit Comment
          </button>
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

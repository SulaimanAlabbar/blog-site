import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import * as actionCreators from "../../util/actionCreators";
import CommentDraft from "./CommentDraft";
import "./style.css";

class index extends Component {
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
        articleId: this.props.articleId,
        comment: this.quillRef.current.getEditor().getContents()
      });

      if (!commentSubmitted.data) {
        //console.log("Don something here")
        console.log("FAILED");
      } else {
        this.setState({ text: "" });
        //Scroll to top here?
        console.log("SUCCEEDED");
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
          <CommentDraft
            draft={this.state.text}
            handleChange={this.handleDraftChange}
            quillRef={this.quillRef}
          />
        </div>
        <div className="CommentDraft--SubmitComment">
          <button
            className="SubmitCommentButton"
            onClick={() => this.submitComment()}
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
  articleId: state.currentArticle.article_id
});

const mapDispatchToProps = actionCreators;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(index);

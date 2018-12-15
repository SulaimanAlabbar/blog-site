import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../util/actionCreators";
// import { EditorState, convertToRaw, ContentState } from "draft-js";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
// import draftToHtml from "draftjs-to-html";
// import htmlToDraft from "html-to-draftjs";
import axios from "axios";
import "./style.css";
import "./editorStyles.css";

class index extends Component {
  constructor() {
    super();

    this.state = {
      editorState: EditorState.createEmpty()
    };
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
  }

  componentDidUpdate = () => {
    if (this.props.submittingDraft) {
      // handle submit

      try {
        const response = axios.post("/api/submitDraft", {
          draft: "haha"
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  onEditorStateChange(editorState) {
    this.setState({
      editorState
    });
  }

  render() {
    const { editorState } = this.state;
    return (
      <div className="Draft--container">
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  submittingDraft: state.submittingDraft
});

const mapDispatchToProps = actionCreators;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(index);

//  <textarea
//           disabled
//           value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
//     />

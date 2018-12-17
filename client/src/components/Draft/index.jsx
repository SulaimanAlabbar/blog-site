import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../util/actionCreators";
import { convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "./style.css";
import "./editorStyles.css";

const content = {
  entityMap: {},
  blocks: [
    {
      key: "637gr",
      text: "Initialized from content state.",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {}
    }
  ]
};

class index extends Component {
  constructor() {
    super();
    const contentState = convertFromRaw(content);
    this.state = {
      contentState
    };
    this.onContentStateChange = this.onContentStateChange.bind(this);
  }

  componentDidUpdate = () => {
    if (this.props.submittingDraft) {
      this.props.setVisibleModal("submit");
      this.props.setDraftContent(this.state.contentState);
    }
  };

  onContentStateChange(contentState) {
    this.setState({
      contentState
    });
  }

  render() {
    return (
      <div className="Draft--container">
        <Editor
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onContentStateChange={this.onContentStateChange}
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

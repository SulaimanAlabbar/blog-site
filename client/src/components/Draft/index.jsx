import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../util/actionCreators";
import ReactQuill from "react-quill";
import "./style.css";
import "../../app/css/quill.snow.css";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "" };
    this.handleChange = this.handleChange.bind(this);
    this.quillRef = React.createRef();
  }

  componentDidMount = () => {
    // this.quillRef.current.getEditor().setContents(avc);
  };

  componentDidUpdate = () => {
    if (this.props.submittingDraft) {
      this.props.setVisibleModal("submit");
      this.props.setDraftContent(
        this.quillRef.current.getEditor().getContents()
      );
    }
  };

  modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        [
          { align: [] },
          { direction: "rtl" },
          { indent: "-1" },
          { indent: "+1" }
        ],
        [
          "bold",
          "italic",
          "underline",
          "strike",
          { script: "sub" },
          { script: "super" }
        ],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ color: [] }, { background: [] }],
        ["link", "image", "video"],
        ["clean"]
      ]
    }
  };

  formats = [
    "header",
    "align",
    "direction",
    "bold",
    "italic",
    "underline",
    "strike",
    "script",
    "blockquote",
    "code-block",
    "list",
    "bullet",
    "color",
    "background",
    "indent",
    "link",
    "image",
    "video"
  ];

  handleChange(value) {
    this.setState({ text: value });
  }

  render() {
    return (
      <ReactQuill
        value={this.state.text}
        onChange={this.handleChange}
        theme="snow"
        modules={this.modules}
        formats={this.formats}
        placeholder="New article..."
        className="Draft--container"
        ref={this.quillRef}
      />
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

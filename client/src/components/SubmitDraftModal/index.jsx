import React, { Component } from "react";
import { connect } from "react-redux";
import Loader from "../Loader";
import axios from "axios";
import * as actionCreators from "../../util/actionCreators";
import "./style.css";

class index extends Component {
  constructor() {
    super();
    this.state = {
      modalClosed: false,
      loaded: false,
      submitSuccess: false,
      submitFail: false
    };
  }

  componentDidMount = async () => {
    const { id, draftTitle, draftContent } = this.props;
    try {
      const submitInfo = await axios.post("/api/submitDraft", {
        authorId: id,
        articleTitle: draftTitle,
        articleContent: draftContent
      });

      this.setState(
        {
          loaded: true,
          submitFail: submitInfo.data === false ? true : this.state.submitFail,
          submitSuccess:
            submitInfo.data !== false ? true : this.state.submitSuccess
        },
        () => {
          setTimeout(() => {
            this.setState(
              {
                modalClosed: true
              },
              () => {
                setTimeout(() => {
                  this.props.setVisibleModal("");
                  this.props.setDraftTitle("");
                  this.props.setDraftContent("");
                  this.props.submitDraft(false);
                  if (submitInfo.data !== false) this.props.setPage("MainPage");
                }, 400);
              }
            );
          }, 1000);
        }
      );
    } catch (error) {
      console.error(error);
      this.setState(
        {
          loaded: true,
          submitFail: true
        },
        () => {
          setTimeout(() => {
            this.setState(
              {
                modalClosed: true
              },
              () => {
                setTimeout(() => {
                  this.props.setVisibleModal("");
                  this.props.setDraftTitle("");
                  this.props.setDraftContent("");
                  this.props.submitDraft(false);
                }, 400);
              }
            );
          }, 1000);
        }
      );
    }
  };

  render() {
    const { loaded, submitSuccess } = this.state;
    const modalClosed = this.state.modalClosed ? "--close" : "";
    const modalSuccess = this.state.submitSuccess ? "modalSuccess" : "";
    const modalFail = this.state.submitFail ? "modalFail" : "";

    return (
      <>
        <div
          className={`LoginModal--modal${modalClosed} ${modalSuccess} ${modalFail}`}
        >
          {loaded ? (
            submitSuccess ? (
              <h2>Draft Submitted</h2>
            ) : (
              <h2>Couldn't Submit Draft</h2>
            )
          ) : (
            <>
              <h2 className="SubmitDraftModal--loading--header">
                Submitting Draft
              </h2>
              <div className="container--loader--big SubmitDraftModal--loading--loader">
                <Loader />
              </div>
            </>
          )}
        </div>
        <div className={`LoginModal--shade${modalClosed}`} />
      </>
    );
  }
}

const mapDispatchToProps = actionCreators;

const mapStateToProps = state => ({
  id: state.id,
  draftTitle: state.draftTitle,
  draftContent: state.draftContent
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(index);

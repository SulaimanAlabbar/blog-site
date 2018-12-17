import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../util/actionCreators";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./style.css";

class index extends Component {
  render() {
    const titleSchema = Yup.object().shape({
      title: Yup.string()
        .min(3)
        .max(120)
        .required("Article Title is required")
    });

    return (
      <Formik
        initialValues={{ title: "" }}
        validationSchema={titleSchema}
        onSubmit={title => {
          this.props.setDraftTitle(title.title);
          this.props.submitDraft(true);
        }}
        render={() => (
          <Form className="DraftBar--container">
            <Field
              name="title"
              placeholder="Article Title"
              type="text"
              maxLength="120"
              className="DraftTitleInput"
            />

            <ErrorMessage
              name="title"
              component="div"
              className="field-error DraftBar--error"
            />
            <button type="submit" className="SubmitDraftButton">
              Submit Draft
            </button>
          </Form>
        )}
      />
    );
  }
}

const mapDispatchToProps = actionCreators;

export default connect(
  null,
  mapDispatchToProps
)(index);

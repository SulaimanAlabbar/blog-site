import React from "react";
import { connect } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import * as actionCreators from "../../util/actionCreators";
import Button from "../Button";
import "./ArticleDraftBar.css";

function ArticleDraftBar({ setDraftTitle, submitDraft }) {
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
        setDraftTitle(title.title);
        submitDraft(true);
      }}
      render={formProps => (
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
          <div className="SubmitDraftButton">
            <Button
              text="Submit Draft"
              width="170px"
              onClick={formProps.submitForm}
            />
          </div>
        </Form>
      )}
    />
  );
}

const mapDispatchToProps = actionCreators;

export default connect(
  null,
  mapDispatchToProps
)(ArticleDraftBar);

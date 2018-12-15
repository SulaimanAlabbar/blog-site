import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// import { Debug } from "./Debug";

export default class LoginForm extends Component {
  render() {
    const { loginFail } = this.props;

    const LoginSchema = Yup.object().shape({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required")
    });

    return (
      <div className="LoginForm--container">
        <div className="LoginForm--header">
          <h1 className="LoginForm--header--header">Login</h1>
          {loginFail && (
            <p className="LoginForm--header--loginFail">
              Incorrect username or password
            </p>
          )}
        </div>
        <Formik
          initialValues={{ username: "", password: "", remember: false }}
          validationSchema={LoginSchema}
          onSubmit={values => {
            this.props.onSubmit(values);
          }}
          render={() => (
            <Form className="LoginForm--form">
              <div className="LoginForm--form--top">
                <div className="LoginForm--form--inputLabel">
                  <label htmlFor="username" className="LoginForm--label">
                    Username
                  </label>
                  <Field
                    name="username"
                    placeholder="username"
                    type="text"
                    className="LoginForm--input"
                  />
                </div>
                <div className="LoginForm--form--error">
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="field-error"
                  />
                </div>
              </div>
              <div className="LoginForm--form--middle">
                <div className="LoginForm--form--inputLabel">
                  <label htmlFor="password" className="LoginForm--label pwslab">
                    Password
                  </label>
                  <Field
                    name="password"
                    placeholder="password"
                    type="password"
                    className="LoginForm--input"
                  />
                </div>
                <div className="LoginForm--form--error">
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="field-error"
                  />
                </div>
              </div>
              <div className="LoginForm--form--middle2">
                <Field
                  name="remember"
                  type="checkbox"
                  value="remeber"
                  className="LoginForm--checkbox"
                />
                <label htmlFor="remember" className="LoginForm--label rmblab">
                  Remember me
                </label>
              </div>
              <div className="LoginForm--form--bottom">
                <button type="submit" className="LoginForm--button">
                  Login
                </button>
              </div>
            </Form>
          )}
        />
      </div>
    );
  }
}

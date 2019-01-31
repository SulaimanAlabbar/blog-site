import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import countries from "./countries";

export default function RegistrationForm({
  email,
  username,
  dateOfBirth,
  country,
  usernameTaken,
  emailTaken,
  onSubmit
}) {
  const RegistrationSchema = Yup.object().shape({
    email: Yup.string()
      .email()
      .required("Email is required"),
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .max(20)
      .required("Username is required"),
    password: Yup.string()
      .min(6)
      .max(30)
      .matches(/[a-z]/, "Password must have atleast one lowercase letter")
      .matches(/[A-Z]/, "Password must have atleast one uppercase letter")
      .matches(/\d+/, "Password must have atleast one number")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .min(6)
      .max(30)
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Password is required"),
    dateOfBirth: Yup.date()
      .max(
        new Date(new Date().setFullYear(new Date().getFullYear() - 13)),
        "You must be atleast 13 years old"
      )
      .required("Date of Birth is required"),
    country: Yup.string()
      .notOneOf(["country", null], "You must pick a country")
      .required(),
    termsOfServices: Yup.mixed()
      .oneOf([true], "You must agree to the terms of services")
      .required()
  });

  return (
    <div className="RegistrationForm--container">
      <h1 className="RegistrationForm--header">Register</h1>

      <Formik
        initialValues={{
          email,
          username,
          password: "",
          confirmPassword: "",
          dateOfBirth,
          country,
          termsOfServices: false
        }}
        validationSchema={RegistrationSchema}
        onSubmit={values => {
          onSubmit(values);
        }}
        render={() => (
          <Form className="RegistrationForm--form--container">
            <ErrorMessage
              name="email"
              component="div"
              className="RegistrationForm--form--error"
            />
            <ErrorMessage
              name="username"
              component="div"
              className="RegistrationForm--form--error"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="RegistrationForm--form--error"
            />
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="RegistrationForm--form--error"
            />
            <ErrorMessage
              name="dateOfBirth"
              component="div"
              className="RegistrationForm--form--error"
            />
            <ErrorMessage
              name="country"
              component="div"
              className="RegistrationForm--form--error"
            />
            <ErrorMessage
              name="termsOfServices"
              component="div"
              className="RegistrationForm--form--error"
            />
            {usernameTaken && (
              <div className="RegistrationForm--form--error">
                Username already taken
              </div>
            )}
            {emailTaken && (
              <div className="RegistrationForm--form--error">
                Email already being used
              </div>
            )}
            <ul className="RegistrationForm--form">
              <li className="RegistrationForm--form--row">
                <label htmlFor="email">Email:</label>
                <Field name="email" placeholder="Email" type="text" />
              </li>

              <li className="RegistrationForm--form--row">
                <label htmlFor="username">Username:</label>
                <Field
                  name="username"
                  placeholder="Username"
                  type="text"
                  maxLength="20"
                />
              </li>
              <li className="RegistrationForm--form--row">
                <label htmlFor="password">Password:</label>
                <Field
                  name="password"
                  placeholder="Password"
                  type="password"
                  maxLength="30"
                />
              </li>
              <li className="RegistrationForm--form--row">
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <Field
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  type="password"
                  maxLength="30"
                />
              </li>
              <li className="RegistrationForm--form--row">
                <label htmlFor="dateOfBirth">Date of Birth:</label>
                <Field
                  name="dateOfBirth"
                  placeholder="Date of Birth"
                  type="date"
                  min="1920-01-01"
                />
              </li>
              <li className="RegistrationForm--form--row">
                <label htmlFor="country">Country:</label>
                <Field name="country" placeholder="Country" component="select">
                  {[
                    <option key="default" disabled="disabled" value="country">
                      Country
                    </option>,
                    countries.map(c => (
                      <option value={c} key={c}>
                        {c}
                      </option>
                    ))
                  ]}
                </Field>
              </li>
              <li className="RegistrationForm--form--row">
                <Field
                  name="termsOfServices"
                  placeholder="Terms of Services"
                  defaultValue={false}
                  type="checkbox"
                />
                <label htmlFor="termsOfServices">
                  I agree to the terms of services
                </label>
              </li>
              <li className="RegistrationForm--form--row">
                <button type="submit">Submit</button>
              </li>
            </ul>
          </Form>
        )}
      />
    </div>
  );
}

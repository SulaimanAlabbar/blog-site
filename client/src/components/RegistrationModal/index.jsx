import React, { Component } from "react";
import { connect } from "react-redux";
import RegistrationForm from "./RegistrationForm";
import Loader from "../Loader";
import axios from "axios";
import * as actionCreators from "../../util/actionCreators";
import "./style.css";

class index extends Component {
  constructor() {
    super();
    this.state = {
      modalClosed: false,
      loaded: true,
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      dateOfBirth: "",
      country: "country",
      termsOfServices: false,
      RegistrationFail: false,
      RegistrationSuccess: false,
      usernameTaken: false,
      emailTaken: false
    };
    this.onShadeClick = this.onShadeClick.bind(this);
    this.formSubmitHandler = this.formSubmitHandler.bind(this);
  }

  onShadeClick() {
    this.setState(
      {
        modalClosed: true
      },
      () => {
        setTimeout(() => {
          this.props.setVisibleModal("");
        }, 400);
      }
    );
  }

  formSubmitHandler = async values => {
    this.setState(
      {
        loaded: false,
        email: values.email,
        username: values.username,
        password: values.password,
        confirmPassword: values.confirmPassword,
        dateOfBirth: values.dateOfBirth,
        country: values.country,
        termsOfServices: values.termsOfServices
      },
      async () => {
        try {
          const registerInfo = await axios.post("/api/register", {
            email: this.state.email,
            username: this.state.username,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            dateOfBirth: this.state.dateOfBirth,
            country: this.state.country,
            termsOfServices: this.state.termsOfServices
          });

          if (typeof registerInfo.data !== "boolean") {
            this.setState({
              loaded: true,
              usernameTaken: registerInfo.data.username,
              emailTaken: registerInfo.data.email
            });
          } else {
            console.log(registerInfo.data);
            this.setState(
              {
                loaded: true,
                RegistrationSuccess: true
              },
              () => {
                setTimeout(() => {
                  this.onShadeClick();
                }, 600);
              }
            );
          }
        } catch (error) {
          console.error(error);
        }
      }
    );
  };

  render() {
    const {
      loaded,
      email,
      username,
      dateOfBirth,
      country,
      RegistrationSuccess,
      usernameTaken,
      emailTaken
    } = this.state;
    const modalClosed = this.state.modalClosed ? "--close" : "";
    const modalSuccess = this.state.RegistrationSuccess ? "modalSuccess" : "";

    return (
      <>
        <div
          className={`RegistrationModal--modal${modalClosed} ${modalSuccess}`}
        >
          {loaded ? (
            RegistrationSuccess ? (
              <h1 className="RegistrationSuccess">Register Success</h1>
            ) : (
              <RegistrationForm
                onSubmit={this.formSubmitHandler}
                email={email}
                username={username}
                dateOfBirth={dateOfBirth}
                country={country}
                usernameTaken={usernameTaken}
                emailTaken={emailTaken}
              />
            )
          ) : (
            <div className="container--loader--big">
              <Loader />
            </div>
          )}
        </div>
        <div
          className={`RegistrationModal--shade${modalClosed}`}
          onClick={() => this.onShadeClick()}
        />
      </>
    );
  }
}

const mapDispatchToProps = actionCreators;

export default connect(
  null,
  mapDispatchToProps
)(index);

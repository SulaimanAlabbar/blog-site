/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import RegistrationForm from "./RegistrationForm";
import Loader from "../Loader";
import * as actionCreators from "../../util/actionCreators";
import "./style.css";

class index extends Component {
  isMounted = false;

  state = {
    modalClosed: false,
    loaded: true,
    email: "",
    username: "",
    dateOfBirth: "",
    country: "country",
    RegistrationSuccess: false,
    usernameTaken: false,
    emailTaken: false
  };

  componentDidMount = () => {
    this.isMounted = true;
  };

  componentWillUnmount = () => {
    this.isMounted = false;
  };

  onShadeClick = () => {
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
  };

  formSubmitHandler = async values => {
    this.setState(
      {
        loaded: false,
        email: values.email,
        username: values.username,
        dateOfBirth: values.dateOfBirth,
        country: values.country
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

    if (loaded)
      return (
        <>
          <div
            className={`RegistrationModal--modal${modalClosed} ${modalSuccess}`}
          >
            <div className="container--loader--big">
              <Loader />
            </div>
          </div>
          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
          <div
            className={`RegistrationModal--shade${modalClosed}`}
            onClick={this.onShadeClick}
          />
        </>
      );

    if (RegistrationSuccess)
      return (
        <>
          <div
            className={`RegistrationModal--modal${modalClosed} ${modalSuccess}`}
          >
            <h1 className="RegistrationSuccess">Register Success</h1>
          </div>
          <div
            className={`RegistrationModal--shade${modalClosed}`}
            onClick={this.onShadeClick}
          />
        </>
      );
    return (
      <>
        <div
          className={`RegistrationModal--modal${modalClosed} ${modalSuccess}`}
        >
          <RegistrationForm
            onSubmit={this.formSubmitHandler}
            email={email}
            username={username}
            dateOfBirth={dateOfBirth}
            country={country}
            usernameTaken={usernameTaken}
            emailTaken={emailTaken}
          />
        </div>
        <div
          className={`RegistrationModal--shade${modalClosed}`}
          onClick={this.onShadeClick}
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

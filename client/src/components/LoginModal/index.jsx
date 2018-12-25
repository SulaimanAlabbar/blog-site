import React, { Component } from "react";
import { connect } from "react-redux";
import LoginForm from "./LoginForm";
import Loader from "../Loader";
import LoginSuccess from "./LoginSuccess";
import axios from "axios";
import * as actionCreators from "../../util/actionCreators";
import "./style.css";

class index extends Component {
  constructor() {
    super();
    this.state = {
      modalClosed: false,
      loaded: true,
      username: "",
      password: "",
      remember: false,
      loginFail: false,
      loginSuccess: false
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
        username: values.username,
        password: values.password,
        remember: values.remember
      },
      async () => {
        try {
          const loginInfo = await axios.post("/api/login", {
            username: this.state.username,
            password: this.state.password
          });

          console.log(loginInfo.data)

          if (loginInfo.data === false) {
            this.setState({
              loaded: true,
              loginFail: true
            });
          } else {
            this.setState(
              {
                loaded: true,
                loginSuccess: true
              },
              () => {
                setTimeout(() => {
                  this.onShadeClick();
                  this.props.setLoginInfo(loginInfo.data);
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
    const { loaded, loginFail, loginSuccess } = this.state;
    const modalClosed = this.state.modalClosed ? "--close" : "";
    const modalSuccess = this.state.loginSuccess ? "modalSuccess" : "";

    return (
      <>
        <div className={`LoginModal--modal${modalClosed} ${modalSuccess}`}>
          {loaded ? (
            loginSuccess ? (
              <LoginSuccess />
            ) : (
              <LoginForm
                onSubmit={this.formSubmitHandler}
                loginFail={loginFail}
              />
            )
          ) : (
            <div className="container--loader--big">
              <Loader />
            </div>
          )}
        </div>
        <div
          className={`LoginModal--shade${modalClosed}`}
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

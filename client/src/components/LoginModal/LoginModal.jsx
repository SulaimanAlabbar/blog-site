import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import LoginForm from "./LoginForm";
import Loader from "../Loader";
import * as actionCreators from "../../util/actionCreators";
import "./LoginModal.css";

class LoginModal extends Component {
  _mounted = false;

  state = {
    modalClosed: false,
    loaded: true,
    username: "",
    password: "",
    loginFail: false,
    loginSuccess: false
  };

  componentDidMount = () => {
    this._mounted = true;
  };

  componentWillUnmount = () => {
    this._mounted = false;
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
        username: values.username,
        password: values.password
      },
      async () => {
        try {
          const loginInfo = await axios.post(process.env.REACT_APP_LOGIN, {
            username: this.state.username,
            password: this.state.password
          });

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

    if (!loaded)
      return (
        <>
          <div className={`LoginModal--modal${modalClosed} ${modalSuccess}`}>
            <div className="container--loader--big">
              <Loader />
            </div>
          </div>
          <div
            className={`LoginModal--shade${modalClosed}`}
            onClick={this.onShadeClick}
          />
        </>
      );

    if (loginSuccess)
      return (
        <>
          <div className={`LoginModal--modal${modalClosed} ${modalSuccess}`}>
            <h1 className="LoginSuccess">Login Success</h1>
          </div>
          <div
            className={`LoginModal--shade${modalClosed}`}
            onClick={this.onShadeClick}
          />
        </>
      );

    return (
      <>
        <div className={`LoginModal--modal${modalClosed} ${modalSuccess}`}>
          <LoginForm onSubmit={this.formSubmitHandler} loginFail={loginFail} />
        </div>
        <div
          className={`LoginModal--shade${modalClosed}`}
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
)(LoginModal);

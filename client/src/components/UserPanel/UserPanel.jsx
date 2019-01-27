/* eslint-disable global-require */
import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Button from "../Button";
import * as actionCreators from "../../util/actionCreators";
import "./UserPanel.css";

class UserPanel extends Component {
  _mounted = false;

  state = {
    closed: false
  };

  componentDidMount = async () => {
    this._mounted = true;
  };

  componentWillUnmount = () => {
    this._mounted = false;
  };

  handleLogin = () => {
    this.props.setVisibleModal("login");
  };

  handleRegister = () => {
    this.props.setVisibleModal("register");
  };

  handleLogout = () => {
    this.setState(
      {
        closed: true
      },
      () => {
        setTimeout(() => {
          this.setState(
            {
              closed: false
            },
            () => {
              this.props.setLoginInfo({
                id: null,
                name: null,
                email: null,
                avatar: null,
                role: "guest"
              });
            }
          );
        }, 1000);
      }
    );

    try {
      axios.post(process.env.REACT_APP_LOGOUT);
    } catch (error) {
      console.error(error);
    }
  };

  handleSettings = () => {};

  render() {
    const { role, name, avatar } = this.props;
    const closed = this.state.closed ? "--close" : "";

    if (role === "guest") {
      return (
        <div className="UserPanel--container">
          <Button text="Login" width="100px" onClick={this.handleLogin} />
          <Button text="Register" width="100px" onClick={this.handleRegister} />
        </div>
      );
    }
    return (
      <div className="UserPanel--logged--container">
        <div className={`UserPanel--logged--avatar${closed}`}>
          <img
            src={
              avatar !== "Default Avatar Image URL"
                ? avatar
                : require("../../app/images/defaultAvatar.png")
            }
            alt="avatar"
            className="UserPanelAvatar"
          />
        </div>
        <div className="UserPanel--logged--buttons--name">
          <div className={`UserPanel--logged--buttons${closed}`}>
            <Button text="Logout" width="100px" onClick={this.handleLogout} />
            <Button
              text="Settings"
              width="100px"
              onClick={this.handleSettings}
            />
          </div>
          <h2 className={`UserPanel--logged--name${closed}`}>{name}</h2>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  role: state.role,
  name: state.name,
  avatar: state.avatar
});

const mapDispatchToProps = actionCreators;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPanel);

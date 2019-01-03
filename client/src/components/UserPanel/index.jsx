import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import UserPanelButton from "./UserPanelButton";
import UserPanelAvatar from "./UserPanelAvatar";
import * as actionCreators from "../../util/actionCreators";
import "./style.css";

class index extends Component {
  isMounted = false;

  state = {
    closed: false
  };

  componentDidMount = async () => {
    this.isMounted = true;
  };

  componentWillUnmount = () => {
    this.isMounted = false;
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
                joined: null,
                role: "guest"
              });
            }
          );
        }, 1000);
      }
    );

    try {
      axios.get("/api/logout");
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
          <UserPanelButton text="Login" onClick={this.handleLogin} />
          <UserPanelButton text="Register" onClick={this.handleRegister} />
        </div>
      );
    }
    return (
      <div className="UserPanel--logged--container">
        <div className={`UserPanel--logged--avatar${closed}`}>
          <UserPanelAvatar avatar={avatar} />
        </div>
        <div className="UserPanel--logged--buttons--name">
          <div className={`UserPanel--logged--buttons${closed}`}>
            <UserPanelButton text="Logout" onClick={this.handleLogout} />
            <UserPanelButton text="Settings" onClick={this.handleSettings} />
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
)(index);

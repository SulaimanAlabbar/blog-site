import React, { Component } from "react";
import { connect } from "react-redux";
import UserPanelButton from "./UserPanelButton";
import * as actionCreators from "../../modules/actionCreators";
class index extends Component {
  constructor() {
    super();

    this.state = {};
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  componentDidMount = async () => {};

  handleLogin() {
    console.log("LOGIN");
    this.props.setVisibleModal("login");
  }
  handleRegister() {
    console.log("REGISTER");
    console.log(this.props.permissions);
  }

  render() {
    const { permissions } = this.props;

    if (permissions === "guest") {
      return (
        <div className="UserPanel--container">
          <UserPanelButton text="Login" onClick={() => this.handleLogin()} />
          <UserPanelButton
            text="Register"
            onClick={() => this.handleRegister()}
          />
        </div>
      );
    } else return <div>userpan</div>;
  }
}
const mapStateToProps = state => ({
  permissions: state.permissions
});

const mapDispatchToProps = actionCreators;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(index);

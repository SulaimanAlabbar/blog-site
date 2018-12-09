import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../modules/actionCreators";
class App extends Component {
  render() {
    console.log(this);
    this.props.setSomeAction("abc");
    return <div>Hello</div>;
  }
}

const mapStateToProps = state => ({
  permissions: state.permissions,
  currentPage: state.currentPage
});

const mapDispatchToProps = actionCreators;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

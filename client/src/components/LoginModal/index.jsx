import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../modules/actionCreators";
class index extends Component {
  constructor() {
    super();
    this.state = {
      modalClosed: false
    };
    this.onShadeClick = this.onShadeClick.bind(this);
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

  render() {
    const modalClosed = this.state.modalClosed ? "--close" : "";
    return (
      <div className="LoginModal--container">
        <div className={`LoginModal--modal${modalClosed}`} />
        <div
          className={`LoginModal--shade${modalClosed}`}
          onClick={() => this.onShadeClick()}
        />
      </div>
    );
  }
}

const mapDispatchToProps = actionCreators;

export default connect(
  null,
  mapDispatchToProps
)(index);

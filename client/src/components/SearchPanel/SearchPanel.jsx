import React, { Component } from "react";
import "./SearchPanel.css";

export default class SearchPanel extends Component {
  state = {
    inputValue: ""
  };

  handleClick = () => {
    this.setState({
      inputValue: ""
    });
  };

  onInputChange = e => {
    if (e.key === "Enter") {
      this.setState({
        inputValue: ""
      });
    } else {
      this.setState({
        inputValue: e.target.value
      });
    }
  };

  render() {
    return (
      <div className="SearchPanel--container">
        <input
          type="text"
          className="SearchInput"
          value={this.state.inputValue}
          onChange={this.onInputChange}
          placeholder="Search Articles"
        />
        <button
          type="button"
          className="SearchButton"
          onClick={this.handleClick}
        />
      </div>
    );
  }
}

import React, { Component } from "react";
import SearchInput from "./SearchInput";
import SearchButton from "./SearchButton";
export default class index extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: ""
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  onButtonClick() {
    this.setState({
      inputValue: ""
    });
  }

  onInputChange(e) {
    if (e.key === "Enter") {
      this.setState({
        inputValue: ""
      });
    } else {
      this.setState({
        inputValue: e.target.value
      });
    }
  }

  render() {
    return (
      <div className="SearchPanel--container">
        <SearchInput
          onChange={this.onInputChange}
          value={this.state.inputValue}
          placeholder="Search Articles"
        />
        <SearchButton onClick={() => this.onButtonClick()} />
      </div>
    );
  }
}

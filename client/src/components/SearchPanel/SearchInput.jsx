import React from "react";

export default function SearchInput(props) {
  return (
    <input
      type="text"
      className="SearchInput"
      value={props.value}
      onChange={props.onChange}
      onKeyPress={props.onChange}
      placeholder={props.placeholder}
    />
  );
}

import React from "react";

export default function SearchButton(props) {
  return <button className="SearchButton" onClick={() => props.onClick()} />;
}

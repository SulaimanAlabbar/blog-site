import React from "react";

export default function Description(props) {
  return (
    <div className="Description--container">
      <div className="Description--top">
        <h2 className="Description--name">{props.name}</h2>
        <img className="Description--avatar" src={props.avatar} alt="avatar" />
      </div>
      <p className="Description--description">{props.description}</p>
    </div>
  );
}

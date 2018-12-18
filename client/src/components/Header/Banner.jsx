import React from "react";

export default function Banner(props) {
  return (
    <div className="Banner--container">
      <img src={props.image} alt="bannerImage" className="Banner--image" />
    </div>
  );
}

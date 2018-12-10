import React from "react";

export default function SocialMediaIcon(props) {
  return (
    <li className="SocialMediaIcon--container">
      <a href={props.link} className="SocialMediaIcon--anchor">
        <img
          src={props.image}
          alt="socialMedia"
          className="SocialMediaIcon--image"
        />
      </a>
    </li>
  );
}

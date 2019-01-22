import React from "react";
import "./SocialMedia.css";
import SocialMediaIcon from "./SocialMediaIcon";
import Facebook from "./icons/facebook.svg";
import Twitter from "./icons/twitter.svg";
import Youtube from "./icons/youtube.svg";
import Reddit from "./icons/reddit.svg";
import Linkedin from "./icons/linkedin.svg";
import Discord from "./icons/discord.svg";

export default function SocialMedia() {
  return (
    <ul className="SocialMedia--container">
      <SocialMediaIcon image={Facebook} link="https://www.facebook.com/" />
      <SocialMediaIcon image={Twitter} link="https://twitter.com/" />
      <SocialMediaIcon image={Youtube} link="https://www.youtube.com/" />
      <SocialMediaIcon image={Reddit} link="https://www.reddit.com/" />
      <SocialMediaIcon image={Linkedin} link="https://www.linkedin.com/" />
      <SocialMediaIcon image={Discord} link="https://discordapp.com/" />
    </ul>
  );
}

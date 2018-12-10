import React, { Component } from "react";
import SocialMediaIcon from "./SocialMediaIcon";
import Facebook from "../../assets/facebook.svg";
import Twitter from "../../assets/twitter.svg";
import Youtube from "../../assets/youtube.svg";
import Reddit from "../../assets/reddit.svg";
import Linkedin from "../../assets/linkedin.svg";
import Discord from "../../assets/discord.svg";

export default class index extends Component {
  render() {
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
}

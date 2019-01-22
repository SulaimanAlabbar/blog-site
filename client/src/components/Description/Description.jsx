/* eslint-disable global-require */
import React, { Component } from "react";
import axios from "axios";
import Loader from "../Loader";
import "./Description.css";

export default class Description extends Component {
  state = {
    loaded: false,
    name: "",
    avatar: "",
    description: ""
  };

  componentDidMount = async () => {
    this._mounted = true;
    try {
      const blogInfo = await axios.get(process.env.REACT_APP_BLOG_INFO);
      this.setState({
        loaded: true,
        name: blogInfo.data.name,
        avatar: blogInfo.data.avatar,
        description: blogInfo.data.description
      });
    } catch (error) {
      console.error(error);
    }
  };

  componentWillUnmount = () => {
    this._mounted = false;
  };

  render() {
    const { loaded, name, avatar, description } = this.state;
    if (!loaded)
      return (
        <div className="container--loader--big">
          <Loader />
        </div>
      );
    return (
      <div className="Description--container">
        <div className="Description--top">
          <h2 className="Description--name">{name}</h2>
          <img
            className="Description--avatar"
            src={
              avatar !== "Default Avatar Image URL"
                ? avatar
                : require("../../app/images/defaultAvatar.png")
            }
            alt="avatar"
          />
        </div>
        <p className="Description--description">{description}</p>
      </div>
    );
  }
}

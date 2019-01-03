import React, { Component } from "react";
import axios from "axios";
import Loader from "../Loader";
import Description from "./Description";
import "./style.css";

export default class index extends Component {
  state = {
    loaded: false,
    name: "",
    avatar: "",
    description: ""
  };

  componentDidMount = async () => {
    this.isMounted = true;
    try {
      const blogInfo = await axios.get("/api/blogInfo");
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
    this.isMounted = false;
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
      <Description name={name} avatar={avatar} description={description} />
    );
  }
}

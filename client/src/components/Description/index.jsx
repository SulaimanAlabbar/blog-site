import React, { Component } from "react";
import Loader from "../Loader";
import axios from "axios";
import Description from "./Description";
export default class index extends Component {
  constructor() {
    super();

    this.state = {
      loaded: false,
      name: "",
      avatar: "",
      description: ""
    };
  }

  componentDidMount = async () => {
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

  render() {
    const { loaded, name, avatar, description } = this.state;
    if (!loaded)
      return (
        <div className="container--loader--big">
          <Loader />
        </div>
      );
    else
      return (
        <Description name={name} avatar={avatar} description={description} />
      );
  }
}

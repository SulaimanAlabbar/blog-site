import React, { Component } from "react";
import Loader from "../Loader";
import axios from "axios";
import Banner from "./Banner";
import "./style.css";

export default class index extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      bannerImage: "",
      bannerText: ""
    };
  }

  componentDidMount = async () => {
    try {
      const blogInfo = await axios.get("/api/blogInfo");
      this.setState({
        loaded: true,
        bannerImage: blogInfo.data.banner_image,
        bannerText: blogInfo.data.banner_text
      });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { loaded, bannerImage } = this.state;
    if (!loaded)
      return (
        <div className="container--loader--big">
          <Loader />
        </div>
      );
    else return <Banner image={bannerImage} />;
  }
}

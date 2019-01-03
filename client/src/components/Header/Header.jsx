import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader";
import Banner from "./Banner";
import "./Header.css";

class Header extends Component {
  _mounted = false;

  state = {
    loaded: false,
    bannerImage: ""
    // bannerText: ""
  };

  componentDidMount = async () => {
    this._mounted = true;
    try {
      const blogInfo = await axios.get("/api/blogInfo");
      this.setState({
        loaded: true,
        bannerImage: blogInfo.data.banner_image
        // bannerText: blogInfo.data.banner_text
      });
    } catch (error) {
      console.error(error);
    }
  };

  componentWillUnmount = () => {
    this._mounted = false;
  };

  render() {
    const { loaded, bannerImage } = this.state;
    if (!loaded)
      return (
        <div className="container--loader--big">
          <Loader />
        </div>
      );

    return (
      <Link to="/">
        <Banner image={bannerImage} />
      </Link>
    );
  }
}

export default withRouter(Header);
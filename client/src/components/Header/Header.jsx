import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader";
import "./Header.css";

class Header extends Component {
  _mounted = false;

  state = {
    loaded: false,
    bannerText: ""
  };

  componentDidMount = async () => {
    this._mounted = true;
    try {
      const blogInfo = await axios.get(process.env.REACT_APP_BLOG_INFO);
      this.setState({
        loaded: true,
        bannerText: blogInfo.data.banner_text
      });
    } catch (error) {
      console.error(error);
    }
  };

  componentWillUnmount = () => {
    this._mounted = false;
  };

  render() {
    const { loaded, bannerText } = this.state;
    if (!loaded)
      return (
        <div className="container--loader--big">
          <Loader />
        </div>
      );

    return (
      <Link to="/">
        <div className="Banner--container">
          <h1 className="Banner--header">{bannerText}</h1>
        </div>
      </Link>
    );
  }
}

export default withRouter(Header);

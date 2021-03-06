import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import axios from "axios";
import uuidv4 from "uuid/v4";
import * as actionCreators from "../../util/actionCreators";
import "./style.css";

class PagesBar extends Component {
  _mounted = false;

  componentDidMount = async () => {
    this._mounted = true;
    const numOfArticles = await axios.get(
      process.env.REACT_APP_NUM_OF_ARTICLES
    );
    this.props.setNumOfArticles(numOfArticles.data);
  };

  componentWillUnmount = () => {
    this._mounted = false;
  };

  clickHandler = async page => {
    (function smoothscroll() {
      const currentScroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - currentScroll / 5);
      }
    })();

    try {
      const articles = await axios.get(
        process.env.REACT_APP_ARTICLES + page * 5
      );
      this.props.setArticles(articles.data);
    } catch (error) {
      console.error(error);
    }
  };

  clickHandlerTwo = () => {
    console.log("PAGE POPUP");
  };

  render() {
    const { numOfArticles } = this.props;
    const numOfPages =
      Math.floor(numOfArticles / 5) + (numOfArticles % 5 === 0 ? 0 : 1);
    let pagePopFlag = false;

    return (
      <div className="PagesBar--container">
        <ul className="PagesList--container">
          {/* eslint-disable-next-line */}
          {new Array(numOfPages).fill(0).map((page, index) => {
            if (index <= 9 || index === numOfPages - 1)
              return (
                <NavLink
                  to={`/${index + 1}`}
                  className="PageButton"
                  key={uuidv4()}
                  onClick={() => this.clickHandler(index)}
                >
                  {index + 1}
                </NavLink>
              );
            if (!pagePopFlag) {
              pagePopFlag = !pagePopFlag;
              return (
                <li
                  className="PageButton"
                  key="popup"
                  onClick={this.clickHandlerTwo}
                >
                  ...
                </li>
              );
            }
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  numOfArticles: state.numOfArticles
});

const mapDispatchToProps = actionCreators;

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PagesBar)
);

import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import uuidv4 from "uuid/v4";
import Loader from "../Loader";
import "./PinnedArticles.css";

class PinnedArticles extends Component {
  state = {
    loaded: false,
    pinnedArticles: null
  };

  componentDidMount = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_PINNED_ARTICLES);

      if (response) {
        this.setState({
          loaded: true,
          pinnedArticles: response.data
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { loaded, pinnedArticles } = this.state;

    if (!loaded) return <Loader />;

    return (
      <div className="PinnedArticles--container">
        <h3 className="PinnedArticles--header">Pinned Articles </h3>
        <ul className="PinnedArticles--articleList">
          {pinnedArticles.map(article => (
            <li key={uuidv4()}>
              <Link
                to={`/article/${article.article_id}`}
                className="PinnedArticles--article"
              >
                {article.article_title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default withRouter(PinnedArticles);

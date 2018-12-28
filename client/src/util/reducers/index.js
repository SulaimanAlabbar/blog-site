import {
  SET_VISIBLE_MODAL,
  SET_LOGIN_INFO,
  SUBMIT_DRAFT,
  SET_PAGE,
  SET_DRAFT_TITLE,
  SET_DRAFT_CONTENT,
  SET_COMMENT_DRAFT_CONTENT,
  SET_NUM_ARTICLES,
  SET_ARTICLES,
  SET_CURRENT_ARTICLE
} from "../actions";

const initialState = {
  currentPage: "MainPage",
  role: "guest",
  visibleModal: "",
  loggedIn: false,
  submittingDraft: false,
  submittingCommentDraft: false,
  numOfArticles: 0,
  articles: [],
  comments: [],
  currentArticle: ""
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_VISIBLE_MODAL:
      return {
        ...state,
        visibleModal: payload
      };
    case SET_LOGIN_INFO:
      return {
        ...state,
        id: payload.id,
        name: payload.name,
        email: payload.email,
        avatar: payload.avatar,
        joined: payload.joined,
        role: payload.role,
        loggedIn: true
      };

    case SUBMIT_DRAFT:
      return {
        ...state,
        submittingDraft: payload
      };

    case SET_PAGE:
      return {
        ...state,
        currentPage: payload
      };

    case SET_DRAFT_TITLE:
      return {
        ...state,
        draftTitle: payload
      };

    case SET_DRAFT_CONTENT:
      return {
        ...state,
        draftContent: payload
      };

    case SET_COMMENT_DRAFT_CONTENT:
      return {
        ...state,
        draftContent: payload
      };

    case SET_NUM_ARTICLES:
      return {
        ...state,
        numOfArticles: payload
      };

    case SET_ARTICLES:
      return {
        ...state,
        articles: payload
      };

    case SET_CURRENT_ARTICLE:
      return {
        ...state,
        currentArticle: payload
      };

    default:
      return state;
  }
};

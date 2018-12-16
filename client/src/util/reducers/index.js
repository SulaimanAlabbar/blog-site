import {
  SET_VISIBLE_MODAL,
  SET_LOGIN_INFO,
  SUBMIT_DRAFT,
  SET_PAGE
} from "../actions";

const initialState = {
  currentPage: "MainPage",
  role: "owner",
  visibleModal: "",
  loggedIn: false,
  submittingDraft: false
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

    default:
      return state;
  }
};
import {
  SET_VISIBLE_MODAL,
  SET_LOGIN_INFO,
  SUBMIT_DRAFT,
  SET_PAGE
} from "../actions";

export const setVisibleModal = modal => ({
  type: SET_VISIBLE_MODAL,
  payload: modal
});

export const setLoginInfo = loginInfo => ({
  type: SET_LOGIN_INFO,
  payload: loginInfo
});

export const submitDraft = submit => ({
  type: SUBMIT_DRAFT,
  payload: submit
});

export const setPage = page => ({
  type: SET_PAGE,
  payload: page
});

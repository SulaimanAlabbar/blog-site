import { SET_VISIBLE_MODAL, SET_LOGIN_INFO } from "../actions";

export const setVisibleModal = modal => ({
  type: SET_VISIBLE_MODAL,
  payload: modal
});

export const setLoginInfo = loginInfo => ({
  type: SET_LOGIN_INFO,
  payload: loginInfo
});

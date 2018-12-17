import {
  SET_VISIBLE_MODAL,
  SET_LOGIN_INFO,
  SUBMIT_DRAFT,
  SET_PAGE,
  SET_DRAFT_TITLE,
  SET_DRAFT_CONTENT,
  SET_NUM_ARTICLES,
  SET_ARTICLES
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

export const setDraftTitle = draftTitle => ({
  type: SET_DRAFT_TITLE,
  payload: draftTitle
});

export const setDraftContent = draftContent => ({
  type: SET_DRAFT_CONTENT,
  payload: draftContent
});

export const setNumOfArticles = numOfArticles => ({
  type: SET_NUM_ARTICLES,
  payload: numOfArticles
});

export const setArticles = articles => ({
  type: SET_ARTICLES,
  payload: articles
});

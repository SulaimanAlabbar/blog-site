import { SET_VISIBLE_MODAL } from "../actions";

const initialState = {
  currentPage: "main",
  permissions: "guest",
  visibleModal: ""
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_VISIBLE_MODAL:
      return {
        ...state,
        visibleModal: payload
      };

    default:
      return state;
  }
};

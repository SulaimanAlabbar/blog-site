import { SOMEACTION } from "../actions";

const initialState = {
  currentPage: "main",
  permissions: "guest"
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SOMEACTION:
      console.log("111");
      return {
        ...state,
        someAction: payload,
        anotherAction: payload,
        thirdAction: payload
      };

    default:
      return state;
  }
};

import { SOMEACTION } from "../actions";

export const setSomeAction = something => ({
  type: SOMEACTION,
  payload: something
});

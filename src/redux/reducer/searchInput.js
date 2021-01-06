import { INPUT_CHANGE, RESET_INPUT } from "../constant";

const initialState = "";

export const inputText = (state = initialState, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return action.text;
    case RESET_INPUT:
      return initialState;
    default:
      return state
  }
} 
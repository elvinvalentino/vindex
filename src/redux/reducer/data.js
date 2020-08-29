import { GET_DATA } from "../constant";

const initialState = [];

export const data = (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA:
      return action.data;
    default:
      return state;
  }
}
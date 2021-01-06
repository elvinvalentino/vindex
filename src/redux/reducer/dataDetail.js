import { FETCH_DETAIL_SUCCESS, FETCH_DETAIL_PENDING, FETCH_DETAIL_ERROR } from "../constant";

const initialState = {
  pokemon: {},
  pending: true,
  error: null
}

export const dataDetail = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DETAIL_PENDING:
      return {
        ...state,
        pending: true
      };
    case FETCH_DETAIL_SUCCESS:
      return {
        ...state,
        pending: false,
        pokemon: action.data,
        error: null
      };
    case FETCH_DETAIL_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      }
    default:
      return state;
  }
}
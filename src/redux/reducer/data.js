import {
  FETCH_PENDING,
  FETCH_SUCCESS,
  FETCH_ERROR,
  FETCH_MORE,
  RESET_LIMIT
} from "../constant";

const initialState = {
  pokemons: [],
  pending: true,
  error: null,
  limit: 24
}

export const data = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PENDING:
      return {
        ...state,
        pending: true,
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
        pokemons: action.data
      }
    case FETCH_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      }
    case FETCH_MORE:
      return {
        ...state,
        limit: state.limit + 24
      }
    case RESET_LIMIT:
      return {
        ...state,
        limit: initialState.limit
      }
    default:
      return state;
  }
}
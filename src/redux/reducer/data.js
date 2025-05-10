import {
  FETCH_PENDING,
  FETCH_SUCCESS,
  FETCH_ERROR,
  FETCH_MORE,
  RESET_LIMIT,
  FETCH_MORE_PENDING,
  FETCH_MORE_ERROR,
  FETCH_MORE_SUCCESS,
} from '../constant';

const initialState = {
  pokemons: [],
  pending: true,
  morePending: false,
  error: null,
  moreError: null,
  limit: 24,
  offset: 0,
};

export const data = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PENDING:
      return {
        ...state,
        pending: true,
      };
    case FETCH_MORE_PENDING:
      return {
        ...state,
        morePending: true,
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
        pokemons: action.data,
      };
    case FETCH_MORE_SUCCESS:
      return {
        ...state,
        offset: state.offset + state.limit,
        morePending: false,
        moreError: null,
        pokemons: [...state.pokemons, ...action.data],
      };
    case FETCH_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case FETCH_MORE_ERROR:
      return {
        ...state,
        morePending: false,
        moreError: action.error,
      };
    case FETCH_MORE:
      return {
        ...state,
        limit: state.limit + 24,
      };
    case RESET_LIMIT:
      return {
        ...state,
        limit: initialState.limit,
      };
    default:
      return state;
  }
};

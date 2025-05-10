import {
  FETCH_PENDING,
  FETCH_SUCCESS,
  FETCH_ERROR,
  RESET_LIMIT,
  FETCH_DETAIL_PENDING,
  FETCH_DETAIL_SUCCESS,
  FETCH_DETAIL_ERROR,
  INPUT_CHANGE,
  RESET_INPUT,
  FETCH_MORE_SUCCESS,
  FETCH_MORE_PENDING,
  FETCH_MORE_ERROR,
} from '../constant';
import axios from '../../axios';
import store from '../store';

export const fetchPending = () => ({ type: FETCH_PENDING });
export const fetchMorePending = () => ({ type: FETCH_MORE_PENDING });

export const fetchSuccess = data => ({
  type: FETCH_SUCCESS,
  data,
});

export const fetchMoreSuccess = data => ({
  type: FETCH_MORE_SUCCESS,
  data,
});
export const fetchError = err => ({
  type: FETCH_ERROR,
  error: err,
});
export const fetchMoreError = err => ({
  type: FETCH_MORE_ERROR,
  error: err,
});
export const resetLimit = () => ({ type: RESET_LIMIT });
export const fetchMore = () => {
  return dispatch => {
    dispatch(fetchMorePending());
    const limit = store.getState().dataFetch.limit;
    const offset = store.getState().dataFetch.offset;
    axios
      .get(`pokemon?limit=24&offset=${limit + offset}`)
      .then(({ data }) => {
        dispatch(fetchMoreSuccess(data.results));
      })
      .catch(err => {
        dispatch(fetchMoreError(err));
      });
  };
};
export const fetchData = () => {
  return dispatch => {
    dispatch(fetchPending());
    axios
      .get(`pokemon?limit=24`)
      .then(({ data }) => {
        dispatch(fetchSuccess(data.results));
      })
      .catch(err => {
        dispatch(fetchError(err));
      });
  };
};

export const fetchDetailPending = () => ({ type: FETCH_DETAIL_PENDING });
export const fetchDetailSuccess = data => ({
  type: FETCH_DETAIL_SUCCESS,
  data,
});
export const fetchDetailError = err => ({
  type: FETCH_DETAIL_ERROR,
  error: err,
});
export const fetchDataDetail = query => {
  return dispatch => {
    dispatch(fetchDetailPending());
    axios
      .get(`pokemon/${query}`)
      .then(({ data }) => {
        dispatch(resetInput());
        dispatch(fetchDetailSuccess(data));
      })
      .catch(err => {
        dispatch(fetchDetailError(err));
      });
  };
};

export const inputChange = text => ({
  type: INPUT_CHANGE,
  text,
});
export const resetInput = () => ({ type: RESET_INPUT });

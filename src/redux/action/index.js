import {
  FETCH_PENDING,
  FETCH_SUCCESS,
  FETCH_ERROR,
  FETCH_MORE,
  RESET_LIMIT,
  FETCH_DETAIL_PENDING,
  FETCH_DETAIL_SUCCESS,
  FETCH_DETAIL_ERROR,
  INPUT_CHANGE,
  RESET_INPUT
} from "../constant";
import axios from "../../axios";

export const fetchPending = () => ({ type: FETCH_PENDING });
export const fetchSuccess = data => ({
  type: FETCH_SUCCESS,
  data
});
export const fetchError = err => ({
  type: FETCH_ERROR,
  error: err
});
export const resetLimit = () => ({ type: RESET_LIMIT });
export const fetchMore = () => ({ type: FETCH_MORE });
export const fetchData = () => {
  return dispatch => {
    dispatch(fetchPending());
    axios.get(`pokemon?limit=1050`)
      .then(({ data }) => {
        dispatch(fetchSuccess(data));
      })
      .catch(err => {
        dispatch(fetchError(err));
      });
  }
}

export const fetchDetailPending = () => ({ type: FETCH_DETAIL_PENDING });
export const fetchDetailSuccess = data => ({
  type: FETCH_DETAIL_SUCCESS,
  data
});
export const fetchDetailError = err => ({
  type: FETCH_DETAIL_ERROR,
  error: err
});
export const fetchDataDetail = query => {
  return dispatch => {
    dispatch(fetchDetailPending());
    axios.get(`pokemon/${query}`)
      .then(({ data }) => {
        dispatch(resetInput());
        dispatch(fetchDetailSuccess(data));
      })
      .catch(err => {
        dispatch(fetchDetailError(err));
      });
  }
}

export const inputChange = text => ({
  type: INPUT_CHANGE,
  text
});
export const resetInput = () => ({ type: RESET_INPUT });
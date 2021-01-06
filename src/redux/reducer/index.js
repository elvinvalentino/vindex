import { combineReducers } from "redux";
import { data } from "./data";
import { dataDetail } from "./dataDetail";
import { inputText } from "./searchInput";

export default combineReducers({
  dataFetch: data,
  dataFetchDetail: dataDetail,
  searchInputText: inputText
});
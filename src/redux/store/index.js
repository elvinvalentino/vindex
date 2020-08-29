import { createStore, compose } from "redux";
import Reducer from "../reducer";

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(Reducer, storeEnhancers());

export default store;
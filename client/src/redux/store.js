import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
// import logger from "redux-logger";
import userReducer from "./reducer";

const store = createStore(userReducer, applyMiddleware(thunk));

export default store;

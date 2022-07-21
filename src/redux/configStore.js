import {legacy_createStore as createStore, combineReducers, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import magazine from "./modules/magazine";

const middlewares = [thunk];                                
const rootReducer = combineReducers({ magazine });
const enhancer = applyMiddleware(...middlewares);           

const store = createStore(rootReducer, enhancer);           

export default store;
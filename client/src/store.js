import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk"
import ReducerFile from "./Reducer/ReducerFile";

const store = createStore(
    ReducerFile,
    compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() || compose));

export default store
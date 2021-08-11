import { createStore, applyMiddleware } from "redux";
import reducer from "./reducers";
import createSagaMiddleware from 'redux-saga';
import reposSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(reposSaga);

export default store;
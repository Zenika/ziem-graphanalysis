
import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(
  applyMiddleware(
  ),
);

const store = createStore(rootReducer, enhancers);

export default store;
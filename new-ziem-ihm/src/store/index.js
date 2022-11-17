
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import rootReducer from '../reducers';

const composeEnhancers = composeWithDevTools({});
const enhancers = composeEnhancers(
  applyMiddleware(
  ),
);

const store = createStore(rootReducer, enhancers);

export default store;
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import reducer from './reducer';
import loading from './loading';

const rootReducer = combineReducers({
  reducer,
  router,
  loading
});

export default rootReducer;

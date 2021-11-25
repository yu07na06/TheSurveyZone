import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import submitReducer from './submitReducer';
import chartReducer, { mainViewSaga } from './chartReducer';
import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({
    loginReducer,
    submitReducer,
    chartReducer,
});

export function* rootSaga() {
    yield all([mainViewSaga()]);
}
  
  
export default rootReducer;
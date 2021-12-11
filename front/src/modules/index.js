import { combineReducers } from 'redux';
import submitReducer from './submitReducer';
import chartReducer, { mainViewSaga } from './chartReducer';
import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({
    submitReducer,
    chartReducer,
});

export function* rootSaga() {
    yield all([mainViewSaga()]);
}
 
export default rootReducer;
import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import submitReducer from './submitReducer';

const rootReducer = combineReducers({
    loginReducer,
    submitReducer,
});
  
export default rootReducer;
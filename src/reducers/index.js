import { combineReducers } from 'redux';
import bufferReducer from './bufferReducer';


export default combineReducers({
  buffer: bufferReducer
});
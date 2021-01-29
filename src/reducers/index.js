import { combineReducers } from 'redux';
import brewery from './brewery';
import user from './user';

export default combineReducers({
    brewery,
    user
})
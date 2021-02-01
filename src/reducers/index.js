import { combineReducers } from 'redux';
import location from './location';
import user from './user';

export default combineReducers({
    location,
    user
})
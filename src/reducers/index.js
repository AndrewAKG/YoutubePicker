// importing needed modules and reducers
import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import SearchReducer from './SearchReducer';
import VideosReducer from './VideosReducer';

// exporting all reducers to the store
export default combineReducers({
    auth: AuthReducer,
    search: SearchReducer,
    videos : VideosReducer
});
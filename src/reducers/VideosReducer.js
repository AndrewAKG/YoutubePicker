// importing needed Action Types
import { SEARCH_YOUTUBE_SUCCESS, USER_FAVOURITES_FETCH } from '../actions/Types';

// reducer initial state
const INITIAL_STATE = {}

// exporting required state according to specific action type 
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case SEARCH_YOUTUBE_SUCCESS:
            return action.payload;

        case USER_FAVOURITES_FETCH:
            return action.payload;
            
        default:
            return state;
    }

}
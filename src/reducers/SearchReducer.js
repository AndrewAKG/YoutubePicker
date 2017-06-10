// importing needed Action Types
import {
    SEARCH_WORD_CHANGED,
    SEARCH_YOUTUBE,
    SEARCH_YOUTUBE_FAIL,
    ADD_FAVOURITE_SUCCESS,
    ADD_FAVOURITE_FAIL,
    INITIATING_STATE,
    REMOVE_FAVOURITE_SUCCESS
} from '../actions/Types';

// reducer initial state
const INITIAL_STATE = {
    searchWord: '',
    error: '',
    loading: false,
    youtubeView : false
};

// exporting required state according to specific action type
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case INITIATING_STATE:
            return INITIAL_STATE;

        case SEARCH_WORD_CHANGED:
            return { ...state, searchWord: action.payload };

        case SEARCH_YOUTUBE:
            return { ...state, searchWord: action.payload, loading: true , youtubeView: true };

        case SEARCH_YOUTUBE_FAIL:
            return { ...state, error: action.payload, loading: false };

        case ADD_FAVOURITE_SUCCESS:
            return { ...state, error: 'Added_Successfully' };

        case ADD_FAVOURITE_FAIL:
            return { ...state, error: 'Adding_Failed' };

        case REMOVE_FAVOURITE_SUCCESS:
            return { ...state, error: 'Removed_Successfully'};
            
        default:
            return state;
    }
};

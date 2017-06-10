// importing needed modules
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';

// importing Action Types
import {
    SEARCH_WORD_CHANGED,
    SEARCH_YOUTUBE,
    SEARCH_YOUTUBE_SUCCESS,
    SEARCH_YOUTUBE_FAIL,
    ADD_FAVOURITE_SUCCESS,
    ADD_FAVOURITE_FAIL,
    INITIATING_STATE,
    USER_FAVOURITES_FETCH,
    REMOVE_FAVOURITE_SUCCESS,
    USER_FAVOURITES_FETCH_LOADING
} from './Types';

var searchWord = "";

// Action handling search word input change
export const searchWordChanged = (text) => {
    searchWord = text;
    return {
        type: SEARCH_WORD_CHANGED,
        payload: text
    };
};

// Action handling Initializing state to Initial State 
export const InitiatingState = () => {
    return {
        type: INITIATING_STATE
    }
}

// Action handling youtube search after user press search button
export const searchYoutube = (text) => {
    return (dispatch) => {
        dispatch({ type: SEARCH_YOUTUBE, payload: text });

        // request sent to youtube api to get the videos required upon search word 
        axios.get("https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q="
            + searchWord + "&key=AIzaSyAVAyFauq8GWIRqm9dkmbkRNXdt0BzBFJw")
            .then(response => {
                var videoArray = response.data.items;
                console.log(videoArray);
                dispatch({ type: SEARCH_YOUTUBE_SUCCESS, payload: videoArray });
            })
            .catch(error => {
                dispatch({ type: SEARCH_YOUTUBE_FAIL, payload: error.message });
            })

        Actions.youtubeList();

    }
}

// Action handling Addition of a specific video to user favourites
export const AddingToFavourites = ({ snippet, id }) => {
    
    // fetching current user
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        // request sent to firebase server to add specific video to database
        firebase.database().ref(`/users/${currentUser.uid}/favourites`)
            .push({ snippet, id })
            .then(() => {
                dispatch({ type: ADD_FAVOURITE_SUCCESS });
            })
            .catch((error) => {
                dispatch({ type: ADD_FAVOURITE_FAIL, payload: error.message });
            })
    }
}

// Action handling favourite videos fetching of specific user
export const userFavouritesFetch = () => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        dispatch({ type: USER_FAVOURITES_FETCH_LOADING });

        // request sent to firebase server to fetch specific user favourites
        firebase.database().ref(`/users/${currentUser.uid}/favourites`).on('value', snapshot => {
            dispatch({ type: USER_FAVOURITES_FETCH, payload: snapshot.val() })
        });

    };
};

// Action handling removing specific video from user favourite videos
export const FavouriteDelete = ({ uid }) => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/favourites/${uid}`)
            .remove()
            .then(() => {
                dispatch({ type: REMOVE_FAVOURITE_SUCCESS });
            });
    };
};
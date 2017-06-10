// importing needed modules
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

// importing needed Action Types
import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    SIGNUP_USER,
    SIGNUP_USER_SUCCESS,
    SIGNUP_USER_FAIL,
    SIGNOUT_USER,
    USER_NAVIGATION
} from './Types';

// Action handling email input change
export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
};

// Action handling password input change
export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
};

// Action handling user navigation between login and signup scenes
export const userNavigate = () => {
    return {
        type: USER_NAVIGATION
    };
};

// Action handling user login
export const loginUser = ({ email, password }) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_USER });

        // sending request to firebase server
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => loginUserSuccess(dispatch, user))
            .catch(() => {
                loginUserFail(dispatch);
            });
    };
};

// Action handling user sign up
export const signUpUser = ({ email, password }) => {
    return (dispatch) => {
        dispatch({ type: SIGNUP_USER });

        // sending request to firebase server
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => signUpUserSuccess(dispatch))
            .catch(() => {
                signUpUserFail(dispatch);
            })
    };
};

// Action handling user logout
export const signOutUser = () => {
    return (dispatch) => {
        dispatch({ type: SIGNOUT_USER });

        // sending request to server and navigating to login view
        firebase.auth().signOut()
            .then(() => {
            Actions.auth({ type: 'reset' });
            })
    };
};

// function handling user login fail
const loginUserFail = (dispatch) => {
    dispatch({
        type: LOGIN_USER_FAIL
    });
};

// function handling user login succes
const loginUserSuccess = (dispatch, user) => {
    dispatch({ type: LOGIN_USER_SUCCESS, payload: user });
    Actions.main();
};

// function handling user sign up success
const signUpUserSuccess = (dispatch) => {
    dispatch({ type: SIGNUP_USER_SUCCESS });
};

// function handling user sign up fail
const signUpUserFail = (dispatch) => {
    dispatch({ type: SIGNUP_USER_FAIL });
};
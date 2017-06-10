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
} from '../actions/Types';

// reducer initial state
const INITIAL_STATE = {
    email: '',
    password: '',
    user: null,
    error: '',
    loading: false
};

// exporting required state according to specific action type
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case EMAIL_CHANGED:
            return { ...state, email: action.payload, error: '' };

        case PASSWORD_CHANGED:
            return { ...state, password: action.payload, error: '' };

        case LOGIN_USER:
            return { ...state, loading: true, error: '' };

        case SIGNUP_USER:
            return { ...state, loading: true, error: '' };

        case LOGIN_USER_SUCCESS:
            return { ...state, ...INITIAL_STATE, user: action.payload };

        case LOGIN_USER_FAIL:
            return { ...state, error: 'Login_Failed', password: '', loading: false };

        case SIGNUP_USER_SUCCESS:
            return { ...state, ...INITIAL_STATE, error: 'success' };

        case SIGNUP_USER_FAIL:
            return { ...state, error: 'SignUp_Failed', password: '', loading: false };

        case SIGNOUT_USER:
            return INITIAL_STATE;

        case USER_NAVIGATION:
            return INITIAL_STATE; 

        default:
            return state;
    }
}
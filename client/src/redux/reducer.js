import { notification } from 'antd';
import { AUTHENTICATE_USER, LOGOUT_USER, SAVE_DETAILS, SIGNUP_USER_SUCCESS, USER_FAILURE, USER_REQUEST } from "./types";

const openNotification = (type, title) => {
    notification[type]({
        message: title
    });
};

const initialState = {
    loading: false,
    user: {},
    error: '',
    authToken: '',
    details: {}
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case USER_FAILURE:{
            console.log(state);
            openNotification('error', action.payload)
                return {
                    ...state,
                    loading: false,
                    error: action.payload
                }
            }
        case SIGNUP_USER_SUCCESS:{
                openNotification('success','Successfully Signed Up!')
                return {
                    ...state,
                    loading: false
                }
            }
        case AUTHENTICATE_USER:
            return {
                ...state,
                loading: false,
                user: action.payload.user,
                authToken: action.payload.token
            }
        case SAVE_DETAILS:
            return {
                ...state,
                loading: false,
                details: action.payload.user
            }
        case LOGOUT_USER: {
            localStorage.clear();
            openNotification('success', 'Successfully Logged out!')
            return {
                ...initialState
            }
        }
        default: return state
    }
}

export default userReducer;

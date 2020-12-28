import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart=()=> {
    return{
        type:actionTypes.AUTH_START
    };
};

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: authData
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        payload: error
    };
};

export const logout = () => {
    // localStorage.removeItem('token');
    // localStorage.removeItem('expirationDate');
    // localStorage.removeItem('id');
    return{
        type: actionTypes.AUTH_INITIATE_LOGOUT
    };
}

export const logoutSucceed = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return {
        type: actionTypes.AUTH_CHECK_TIMEOUT,
        payload: expirationTime
    };
}

export const auth = (email, password, isSignUp) => {
    return{
        type: actionTypes.AUTH_USER,
        payload: {
            email: email,
            password: password,
            isSignUp: isSignUp
        }
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT,
        payload: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        }else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate > new Date()){
                const userId = localStorage.getItem('id');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }else{
                dispatch(logout());
            }
        }
    }
};
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
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('id');
    return{
        type: actionTypes.AUTH_LOGOUT
    };
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(()=>{
            dispatch(logout());
        }, expirationTime * 1000)
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email:email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD9LDw8VjZLU8iMbHpVGU_mBfF8ORBwm04';
        if (!isSignUp) url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD9LDw8VjZLU8iMbHpVGU_mBfF8ORBwm04';
        axios.post(url, authData)
            .then(res=>{
                const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000)
                localStorage.setItem('token',res.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('id', res.data.localId);
                dispatch(authSuccess({token: res.data.idToken, userId: res.data.localId}));
                dispatch(checkAuthTimeout(res.data.expiresIn));
            })
            .catch(err=>{
                dispatch(authFail(err.response.data.error));
            })
    };
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
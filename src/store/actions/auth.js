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
                dispatch(authSuccess({token: res.data.idToken, userId: res.data.localId}));
            })
            .catch(err=>{
                dispatch(authFail(err.response.data.error));
            })
    };
};

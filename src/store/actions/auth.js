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

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email:email,
            password: password,
            returnSecureToken: true
        }
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD9LDw8VjZLU8iMbHpVGU_mBfF8ORBwm04', authData)
            .then(res=>{
                console.log(res);
                dispatch(authSuccess(res.data));
            })
            .catch(err=>{
                console.log(err);
                dispatch(authFail(err));
            })
    };
};

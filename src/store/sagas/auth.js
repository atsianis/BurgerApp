import { put } from 'reduc-saga/effects';
import * as actionTypes from '../actions/actionTypes';

function* logout(action) {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('id');
    yield put({
        type: actionTypes.AUTH_LOGOUT
    })
}
import { put } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as actions from '../actions/index';

export function* logoutSaga(action) {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('id');
    // same as dispatching
    yield put(actions.logoutSucceed())
}

export function* checkAuthTimeoutSaga(action) {
    // the equivelant of setTimeout in sagas
    yield (action.payload * 1000);
    yield put(actions.logout());
}
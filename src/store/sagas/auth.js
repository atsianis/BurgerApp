import { put, delay } from "redux-saga/effects";
import axios from "axios";

import * as actions from "../actions/index";

export function* logoutSaga(action) {
  yield localStorage.removeItem("token");
  yield localStorage.removeItem("expirationDate");
  yield localStorage.removeItem("id");
  // same as dispatching
  yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  // the equivelant of setTimeout in sagas
  yield delay(action.payload * 1000);
  yield put(actions.logout());
}

export function* authUserSaga(action) {
  yield put(actions.authStart());
  const authData = {
    email: action.payload.email,
    password: action.payload.password,
    returnSecureToken: true,
  };
  let url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD9LDw8VjZLU8iMbHpVGU_mBfF8ORBwm04";
  if (!action.payload.isSignUp)
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD9LDw8VjZLU8iMbHpVGU_mBfF8ORBwm04";
  // yield pauses and waits for the Promise returned to resolve and then continuous
  try {
    const res = yield axios.post(url, authData);

    const expirationDate = new Date(
      new Date().getTime() + res.data.expiresIn * 1000
    );
    localStorage.setItem("token", res.data.idToken);
    localStorage.setItem("expirationDate", expirationDate);
    localStorage.setItem("id", res.data.localId);
    yield put(
      actions.authSuccess({ token: res.data.idToken, userId: res.data.localId })
    );
    yield put(actions.checkAuthTimeout(res.data.expiresIn));
  } catch (err) {
    yield put(actions.authFail(err.response.data.error));
  }
}

export function* authCheckStateSaga(action) {
    const token = localStorage.getItem('token');
        if (!token) {
            yield put(actions.logout());
        }else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate > new Date()){
                const userId = localStorage.getItem('id');
                yield put(actions.authSuccess({token: token, userId: userId}));
                yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }else{
                yield put(actions.logout());
            }
        }
}

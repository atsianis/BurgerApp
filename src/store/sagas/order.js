import { put } from "redux-saga/effects";
import axios from "../../axios-orders";
import * as actions from "../actions/index";

export function* purchaseBurgerSaga(action) {
  yield put(actions.purchaseBurgerStart());
  try {
    const res = yield axios.post("/orders.json?auth=" + action.payload.token, action.payload.orderData);
    yield put(actions.purchaseBurgerSuccess(res.data.name, action.payload.orderData));
  } catch (err) {
    yield put(actions.purchaseBurgerFail(err));
  }
  
}

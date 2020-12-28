import { put } from "redux-saga/effects";
import axios from "../../axios-orders";
import * as actions from "../actions/index";

export function* purchaseBurgerSaga(action) {
  yield put(actions.purchaseBurgerStart());
  try {
    const res = yield axios.post(
      "/orders.json?auth=" + action.payload.token,
      action.payload.orderData
    );
    yield put(
      actions.purchaseBurgerSuccess(res.data.name, action.payload.orderData)
    );
  } catch (err) {
    yield put(actions.purchaseBurgerFail(err));
  }
}

export function* fetchOrdersSaga(action) {
  yield put(actions.fetchOrdersStart());
  const queryParams = "?auth=" + action.payload.token + '&orderBy="userId"&equalTo="' + action.payload.userId + '"';
  try {
    const res = yield axios.get("/orders.json" + queryParams);
    const fetchedOrders = [];
    for (let key in res.data) {
      console.log(key);
      fetchedOrders.push({
        ...res.data[key],
        id: key,
      });
    }
    yield put(actions.fetchOrdersSuccess(fetchedOrders));
  } catch (error) {
    yield put(actions.fetchOrdersFail(error));
  }
}

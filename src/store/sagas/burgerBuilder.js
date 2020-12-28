import { put } from "redux-saga/effects";
import axios from "axios";

import * as actions from "../actions/index";

export function* initIngredientsSaga(action) {
  try {
    const res = yield axios.get(
      "https://burgerapp-fd190-default-rtdb.firebaseio.com/ingredients.json"
    );
    yield put(actions.setIngredients(res.data));
  } catch (error) {
    yield put(actions.fetchIngredientsFailed());
  }
}
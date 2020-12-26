import * as actiontypes from "../actions/actionTypes";
import updateObject from "../utility";

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.3,
  meat: 1.1,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actiontypes.ADD_INGREDIENT:
      const updatedIngredient = {
        [action.payload]: state.ingredients[action.payload] + 1,
      };
      const updatedIngredients = updateObject(
        state.ingredients,
        updatedIngredient
      );
      return updateObject(state, {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.payload],
        building: true
      });
    case actiontypes.REMOVE_INGREDIENT:
      const updatedIng = {
        [action.payload]: state.ingredients[action.payload] - 1,
      };
      const updatedIngs = updateObject(state.ingredients, updatedIng);
      return updateObject(state, {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.payload],
        building: true
      });
    case actiontypes.SET_INGREDIENTS:
      return updateObject(state, {
        ingredients: {
          salad: action.payload.salad,
          bacon: action.payload.bacon,
          cheese: action.payload.cheese,
          meat: action.payload.meat,
        },
        totalPrice: 4,
        building: false,
        error: false,
      });
    case actiontypes.FETCH_INGREDIENTS_FAILED:
      return updateObject(state, {error: true})
    default:
      return state;
  }
};

export default reducer;

import axios from "../../axios-orders";
import * as actionTypes from './actionTypes';

export const addIngredient = (ingName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        payload: ingName
    }
};

export const removeIngredient = (ingName) => {
    return {
        type:actionTypes.REMOVE_INGREDIENT,
        payload: ingName    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('https://burgerapp-fd190-default-rtdb.firebaseio.com/ingredients.json')
      .then(response=> {
        dispatch(setIngredients(response.data));
      })
      .catch(error=>{
        dispatch(fetchIngredientsFailed());
        });
  }
}
  

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        payload:ingredients
    };
};

export const fetchIngredientsFailed =() => {
    return{
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}
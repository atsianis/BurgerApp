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
        payload: ingName    
    }
}

export const initIngredients = () => {
    return{
        type: actionTypes.INIT_INGREDIENTS
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
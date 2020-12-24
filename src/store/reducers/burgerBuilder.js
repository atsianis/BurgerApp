import * as actiontypes from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error:false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.3,
    meat: 1.1,
  };

const reducer = (state=initialState, action)=>{
    switch(action.type){
        case actiontypes.ADD_INGREDIENT:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.payload]: state.ingredients[action.payload] +1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.payload]
            };
        case actiontypes.REMOVE_INGREDIENT:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.payload]: state.ingredients[action.payload] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.payload]
            };
        case actiontypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    salad: action.payload.salad,
                    bacon: action.payload.bacon,
                    cheese: action.payload.cheese,
                    meat: action.payload.meat
                },
                totalPrice: 4,
                error: false
            };
        case actiontypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error:true
            }
        default:
            return state;
    }
}

export default reducer;
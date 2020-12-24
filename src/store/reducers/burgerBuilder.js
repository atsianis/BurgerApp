import * as actiontypes from '../actions/actionsTypes';

const initialState = {
    ingredients: {
        salad:0,
        bacon:0,
        cheese:0,
        meat:0
    },
    totalPrice: 4
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
        default:
            return state;
    }
}

export default reducer;
import * as actiontypes from './actions';

const initialState = {
    ingredients: {
        salad:0,
        bacon:0,
        cheese:0,
        meat:0
    },
    totalPrice: 4
};

const reducer = (state=initialState, action)=>{
    switch(action.type){
        case actiontypes.ADD_INGREDIENT:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.payload]: state.ingredients[action.payload] +1
                }
            };
        case actiontypes.REMOVE_INGREDIENT:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.payload]: state.ingredients[action.payload] - 1
                }
            };
        default:
            return state;
    }
}

export default reducer;
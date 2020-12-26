import * as actionTypes from '../actions/actionTypes';
import updateObject from '../utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: null
}

const reducer = (state=initialState, action) => {
    switch(action.type){
        case actionTypes.AUTH_START:
            return updateObject(state, {error: null, loading: true});
        case actionTypes.AUTH_SUCCESS:
            return updateObject(state, {token: action.payload.token, userId: action.payload.userId, error: null, loading: false});
        case actionTypes.AUTH_FAIL:
            return updateObject(state, {error: action.payload.message, loading: action.payload.loading});
        default:
            return state;
    }
};

export default reducer;
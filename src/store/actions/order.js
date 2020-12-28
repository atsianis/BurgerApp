import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        payload:{
            orderId: id,
            orderData: orderData
        }
        
    };
};

export const purchaseBurgerFail = (error) => {
    return  {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        payload: {
            error: error
        }
    };
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData,token) => {
    return {
        type: actionTypes.PURCHASE_BURGER,
        payload: {
            token: token,
            orderData: orderData
        }
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        payload: orders
    }
}

export const fetchOrdersFail =(error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        payload: error
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        const queryParams = '?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"';
        axios.get('/orders.json?auth=' + queryParams)
            .then( res=>{
                console.log(res);
                const fetchedOrders = [];
                for (let key in res.data) {
                    console.log(key);
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    })
                }
                dispatch(fetchOrdersSuccess(fetchedOrders));
            })
            .catch( err =>{
                dispatch(fetchOrdersFail(err));
            });
    };

    }

import * as type  from '../constants/constants-actions';
import update from 'react-addons-update';

const initialState = {
    orders: [],
    ab:{}
};

export default function collectionReducer(state = initialState, action){
    switch(action.type){
        case type.ADD_ORDER:
        {
            const orders = update(state.orders, {$push : [action.payload]});
            return Object.assign({}, state, { orders });
        }
        case type.UPDATE_ORDER:
        {
            const itemToUpdate = state.orders.findIndex(item => item.orderid.toString() === action.payload.orderid.toString());
            const orders = update(state.orders, {$splice: [[itemToUpdate, 1, action.payload]]});
            return Object.assign({}, state, { orders });
        }
        case type.REMOVE_ORDER:
        {
            const itemToRemove = state.orders.findIndex(item => item.orderid.toString() === action.payload.orderid.toString());
            const orders = update(state.orders, {$splice: [[itemToRemove, 1,]]});
            return Object.assign({}, state, { orders });
        }
        case type.SAVE_ORDER:
        {
            console.log(action.payload);
            const ordersToremove = action.payload;
            let orders = state.orders;

            ordersToremove.forEach(ele => {
                let itemToRemove = state.orders.findIndex(item => item.orderid.toString() === ele.orderid.toString());
                orders = update(state.orders, {$splice: [[itemToRemove, 1,]]});
            });
            return Object.assign({}, state, { orders });
        }
        default: return state;
    }
}


import {REMOVE_ORDER} from '../constants/constants-actions';

export default function updateOrder(payload){
    return{
        type: REMOVE_ORDER,
        payload
    }
}
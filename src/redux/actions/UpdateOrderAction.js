import {UPDATE_ORDER} from '../constants/constants-actions';

export default function updateOrder(payload){
    return{
        type: UPDATE_ORDER,
        payload
    }
}
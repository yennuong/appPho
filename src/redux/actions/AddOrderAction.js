import {ADD_ORDER} from '../constants/constants-actions';

export default function addOrder(payload){
    return{
        type: ADD_ORDER,
        payload
    }
}
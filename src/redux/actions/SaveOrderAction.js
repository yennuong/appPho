import {SAVE_ORDER} from '../constants/constants-actions';

export default function saveOrder(payload){
    return{
        type: SAVE_ORDER,
        payload
    }
}
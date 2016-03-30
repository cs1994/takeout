/**
 * Created by caoshuai on 2016/3/23.
 */

import {FETCH_QRCODE,CHANGE_QRCODE} from "../../actions/qrCode/actions.js"

export function manageCode(state=[],action){
    switch (action.type){
        case FETCH_QRCODE:
            return action.list
        case CHANGE_QRCODE:
            return [...state.slice(0, action.index),
                Object.assign({},state[action.index],{url:action.url}),
                ...state.slice(action.index + 1)
            ]
        default:
            return state;
    }
}
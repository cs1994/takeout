/**
 * Created by caoshuai on 2016/3/25.
 */

import { combineReducers } from 'redux'
import {Fetch_ALL_CLASSIFY,GET_LABELS,GET_ALL_ADS,GET_ADS_BYCATEANDLABEL,GET_AD_DETAIL,DELETE_ADS,
    GET_AD_PAGES} from '../../actions/FloorAds/actions.js'

export function floorAds(state = {}, action) {
    switch (action.type) {
        case Fetch_ALL_CLASSIFY:
            return Object.assign({}, state, {
                classifyList:action.list
            });
        case GET_LABELS:
            return Object.assign({}, state, {
                labelList:state.classifyList[action.index].categoryLabelAds
            });
        case GET_ALL_ADS:
            return Object.assign({}, state, {
                adList:action.data
            });
        case GET_ADS_BYCATEANDLABEL:
            return Object.assign({}, state, {
                adList:action.list
            });
        case GET_AD_DETAIL:
            return Object.assign({}, state, {
                adDetail:action.data
            });
        case DELETE_ADS:
            return Object.assign({}, state, {
                adList:[...state.adList.slice(0,action.index),
                ...state.adList.slice(action.index+1)]
            });
        case GET_AD_PAGES:
            return Object.assign({}, state, {
                adPage:action.page
            });
        default:
            return state
    }
}

/**
 * Created by caoshuai on 2016/3/30.
 */

import { combineReducers } from 'redux'
import {ADD_RECOMMEND, FETCH_RECOMMEND,DELETE_RECOMMEND,UPDATE_RECOMMEND,CHANGE_RECOMMEND_ORDER} from '../../actions/recommend/actions.js'

export function manageRecommend(state = {}, action) {
    switch (action.type) {
        case FETCH_RECOMMEND:
            return Object.assign({}, state, {
                recommendList:action.list
            });
        case ADD_RECOMMEND:
            return Object.assign({}, state, {
                recommendList: [...state.recommendList,{id:action.id,name:action.data.name,
                    order:action.data.order,url:action.data.url}]})
        case DELETE_RECOMMEND:
            return Object.assign({}, state, {
                recommendList:[...state.recommendList.slice(0,action.index),
                ...state.recommendList.slice(action.index+1)]
            });
        case UPDATE_RECOMMEND:
            return Object.assign({},state,{
                recommendList:[...state.recommendList.slice(0,action.index),
                    {id:action.id,name:action.data.name,
                        order:action.data.order,url:action.data.url},
                    ...state.recommendList.slice(action.index+1)]
        })
        case CHANGE_RECOMMEND_ORDER:
            return Object.assign({}, state, {
                recommendList:[
                    ...state.recommendList.slice(0, action.index-1),
                    Object.assign({},state.recommendList[action.index],{order:state.recommendList[action.index-1].order}),
                    Object.assign({},state.recommendList[action.index-1],{order:state.recommendList[action.index].order}),
                    ...state.recommendList.slice(action.index + 1)
                ]
            });
        default:
            return state
    }
}
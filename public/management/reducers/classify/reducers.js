/**
 * Created by caoshuai on 2016/3/23.
 */

import { combineReducers } from 'redux'
import {FETCH_CLASSIFY,GET_NOW_CLASSIFY,ADD_LABEL,DELETE_LABEL,
    ADD_BRAND,DELETE_BRAND,UPDATE_LABEL,UPDATE_BRAND,FETCH_CLASSIFY_DETAIL,ADD_CLASSIFY,
    DELETE_CLASSIFY} from '../../actions/classify/actions.js'

export function classifyList(state = {}, action) {
    switch (action.type) {
        case FETCH_CLASSIFY:
            return Object.assign({}, state, {
                classifyList:action.list
            });
        case GET_NOW_CLASSIFY:
            return Object.assign({}, state, {
                nowClassify:state.classifyList[action.index]?state.classifyList[action.index]:{}
            });
        //case FETCH_ALL_FIRST_CLASSIFY:
        //    return Object.assign({}, state, {
        //        firstClassify:action.list
        //    });
        case ADD_LABEL:
            return Object.assign({}, state, {
                nowClassify:Object.assign({},state.nowClassify,{categoryLabelAds:[
                    ...state.nowClassify.categoryLabelAds,{id:action.id,
                    name:action.data.name,order:action.data.order}
                ]})
            });
        case DELETE_LABEL:
            return Object.assign({}, state, {
                nowClassify:Object.assign({},state.nowClassify,{categoryLabelAds:[
                    ...state.nowClassify.categoryLabelAds.slice(0,action.index),
                    ...state.nowClassify.categoryLabelAds.slice(action.index+1)
                ]})
            });
        case ADD_BRAND:
            return Object.assign({}, state, {
                nowClassify:Object.assign({},state.nowClassify,{categorySType:[
                    ...state.nowClassify.categorySType,{id: action.id,
                        sTypeName:action.data.name,sOrder:action.data.order,sUrl:action.data.url}
                ]})
            });
        case DELETE_BRAND:
            return Object.assign({}, state, {
                nowClassify:Object.assign({},state.nowClassify,{categorySType:[
                    ...state.nowClassify.categorySType.slice(0,action.index),
                    ...state.nowClassify.categorySType.slice(action.index+1)
                ]})
            });
        case UPDATE_LABEL:
            return Object.assign({}, state, {
            nowClassify:Object.assign({},state.nowClassify,{categoryLabelAds:[
                ...state.nowClassify.categoryLabelAds.slice(0,action.index),
                Object.assign({},state.nowClassify.categoryLabelAds[action.index],
                    {name:action.data.name,order:action.data.order}),
                ...state.nowClassify.categoryLabelAds.slice(action.index+1)
            ]})
        });
        case UPDATE_BRAND:
            return Object.assign({}, state, {
                nowClassify:Object.assign({},state.nowClassify,{categorySType:[
                    ...state.nowClassify.categorySType.slice(0,action.index),
                    Object.assign({},state.nowClassify.categorySType[action.index],
                        {sTypeName:action.data.name,sOrder:action.data.order,sUrl:action.data.url}),
                    ...state.nowClassify.categorySType.slice(action.index+1)
                ]})
            });
        //case ADD_CLASSIFY:
        //    return Object.assign({}, state, {
        //        classifyList:[...state.classifyList,
        //            {categoryId:state.classifyList[state.classifyList.length-1].categoryId+1,
        //                categoryName:action.nameCh,categoryEnglishName:action.nameEn,categoryOrder:action.data.order,
        //                categoryPic:action.data.pictureUrl,categorySType:[],categoryLabelAds:[]}
        //        ]
        //    });
        case DELETE_CLASSIFY:
            return Object.assign({}, state, {
                classifyList:[...state.classifyList.slice(0,action.index),
                    ...state.classifyList.slice(action.index+1)
                ]
            });
        case FETCH_CLASSIFY_DETAIL:
            return Object.assign({}, state, {
                classifyDetail:action.data
            });
        default:
            return state
    }
}
//function nowClassify(state={},action){
//    switch(action.type){
//        case GET_NOW_CLASSIFY:
//            return classifyList.classifyList[action.index]?classifyList.classifyList[action.index]:{};
//        case ADD_LABEL:
//            return Object.assign({}, state, {
//                categoryLabelAds:[...state.categoryLabelAds,
//                    {id:state.categoryLabelAds[state.categoryLabelAds.length-1],name:action.data.name,order:action.data.order}]
//            });
//        default:
//            return state
//    }
//}
//
//export const classify = combineReducers({
//    classifyList,
//    nowClassify
//});
//
//export default classify
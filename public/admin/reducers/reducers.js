/**
 * Created by caoshuai on 2016/4/10.
 */
import { combineReducers } from 'redux'
import { GET_STORE_ADMIN,ADD_STORE_ADMIN,CHANGE_STORE_ADMIN_STATE,GET_RESTAURANT_TAG,DELETE_STORE_ADMIN,
    ADD_RESTAURANT_TAG,UPDATE_RESTAURANT_TAG,DELETE_RESTAURANT_TAG} from '../actions/storeUser/actions.js'

function manageStorers(state = {}, action) {
    switch (action.type) {
        case GET_STORE_ADMIN:
            return Object.assign({}, state, {
            storeUserList:action.list
        });
        case ADD_STORE_ADMIN:
            return Object.assign({}, state, {
                storeUserList:[{id:action.id,email:action.data.email,nickName:action.data.email,
                headImg:"",state:1,userType:2,createTime:action.time},...state.storeUserList]
            });
        case CHANGE_STORE_ADMIN_STATE:
            return Object.assign({}, state, {
                storeUserList:[...state.storeUserList.slice(0,action.index),
                Object.assign({},state.storeUserList[action.index],{state:action.state}),
                    ...state.storeUserList.slice(action.index+1)
                ]
            });
        case DELETE_STORE_ADMIN:
            return Object.assign({}, state, {
                storeUserList:[...state.storeUserList.slice(0,action.index),
                    ...state.storeUserList.slice(action.index+1)]
            });
        case GET_RESTAURANT_TAG:
            return Object.assign({}, state, {
                resTags:action.list
            });
        case ADD_RESTAURANT_TAG:
            return Object.assign({}, state, {
                resTags:[{id:action.id,tagName:action.data.nameCh,englishName:action.data.nameEn,
                    order:action.data.index},...state.resTags]
            });
        case UPDATE_RESTAURANT_TAG:
            return Object.assign({}, state, {
                resTags:[...state.resTags.slice(0,action.index),
                    {id:state.resTags[action.index].id,tagName:action.data.nameCh,englishName:action.data.nameEn,
                    order:action.data.index},...state.resTags.slice(action.index+1)]
            });
        case DELETE_RESTAURANT_TAG:
            return Object.assign({}, state, {
                resTags:[...state.resTags.slice(0,action.index),
                   ...state.resTags.slice(action.index+1)]
            });
        //case GET_RESTAURANT_TAG_DETAIL:
        //    return Object.assign({}, state, {
        //        classifyDetail:state.resTags[index]
        //    });
        //case DELETE_SLIDER:
        //    return Object.assign({}, state, {
        //        sliderList:action.lists
        //    });
        //case CHANGE_SLIDER_ORDER:
        //    return Object.assign({}, state, {
        //        sliderList:[
        //            ...state.sliderList.slice(0, action.index-1),
        //            Object.assign({},state.sliderList[action.index],{order:state.sliderList[action.index-1].order}),
        //            Object.assign({},state.sliderList[action.index-1],{order:state.sliderList[action.index].order}),
        //            //state.sliderList[action.index],
        //            //state.sliderList[action.index-1],
        //            ...state.sliderList.slice(action.index + 1)
        //        ]
        //    });
        //case GET_SLIDER_DETAIL:
        //    return Object.assign({},state,{
        //        sliderDetail:action.detail
        //    })
        default:
            return state
    }
}
export const manageApp = combineReducers({
    manageStorers
});



export default manageApp
/**
 * Created by caoshuai on 2016/4/10.
 */
import { combineReducers } from 'redux'
import { GET_STORE_ADMIN,ADD_STORE_ADMIN,CHANGE_STORE_ADMIN_STATE,GET_RESTAURANT_TAG,DELETE_STORE_ADMIN,
    ADD_RESTAURANT_TAG,UPDATE_RESTAURANT_TAG,DELETE_RESTAURANT_TAG,GET_RESTAURANT_LIST} from '../actions/storeUser/actions.js'

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
       case GET_RESTAURANT_LIST:
           Object.assign({}, state, {
               resList:action.list
           });
        default:
            return state
    }
}
export const manageApp = combineReducers({
    manageStorers
});



export default manageApp
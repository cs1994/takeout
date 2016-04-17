/**
 * Created by caoshuai on 2016/4/10.
 */
import { combineReducers } from 'redux'
import { GET_STORE_ADMIN} from '../actions/storeUser/actions.js'

function manageStorers(state = {}, action) {
    switch (action.type) {
        case GET_STORE_ADMIN:
            return Object.assign({}, state, {
                storeUserList:action.lists
            });
        //case ADD_SLIDER:
        //    return Object.assign({}, state, {
        //        addSliderPic:action.item
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
    manageRestaurants
});



export default manageApp
/**
 * Created by jiye on 16/3/15.
 */
import { combineReducers } from 'redux'
import { ADD_SLIDER, FETCH_SLIDER,DELETE_SLIDER,CHANGE_SLIDER_ORDER,
    GET_SLIDER_DETAIL} from '../actions/restaurants/actions.js'

function restaurantList(state = [], action) {
    switch (action.type) {
        case FETCH_SLIDER:
            return Object.assign({}, state, {
                sliderList:action.lists
            });
        default:
            return state
    }
}
export const manageApp = combineReducers({
    restaurantList
});



export default manageApp
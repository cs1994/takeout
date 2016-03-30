/**
 * Created by jiye on 16/3/15.
 */
import { combineReducers } from 'redux'
import { ADD_SLIDER, FETCH_SLIDER,DELETE_SLIDER,CHANGE_SLIDER_ORDER,
    GET_SLIDER_DETAIL} from '../actions/sliders/action.js'
import {bulletin} from './bulletin/reducers.js'
import {manageCode} from './qrCode/reducers.js'
import {classifyList} from './classify/reducers.js'
import {floorAds} from './FloorAds/reducers.js'
import {manageRecommend} from './recommend/reducers.js'

function manageSlider(state = [], action) {
    switch (action.type) {
        case FETCH_SLIDER:
            return Object.assign({}, state, {
                sliderList:action.lists
            });
        case ADD_SLIDER:
            return Object.assign({}, state, {
                addSliderPic:action.item
            });
        case DELETE_SLIDER:
            return Object.assign({}, state, {
                sliderList:action.lists
            });
        case CHANGE_SLIDER_ORDER:
            return Object.assign({}, state, {
                sliderList:[
                    ...state.sliderList.slice(0, action.index-1),
                    Object.assign({},state.sliderList[action.index],{order:state.sliderList[action.index-1].order}),
                    Object.assign({},state.sliderList[action.index-1],{order:state.sliderList[action.index].order}),
                    //state.sliderList[action.index],
                    //state.sliderList[action.index-1],
                    ...state.sliderList.slice(action.index + 1)
                ]
            });
        case GET_SLIDER_DETAIL:
            return Object.assign({},state,{
                sliderDetail:action.detail
            })
        default:
            return state
    }
}
export const manageApp = combineReducers({
    manageSlider,
    bulletin,
    manageCode,
    classifyList,
    floorAds,
    manageRecommend
});



export default manageApp
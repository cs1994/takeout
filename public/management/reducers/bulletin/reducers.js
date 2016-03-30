/**
 * Created by caoshuai on 2016/3/20.
 */

import { combineReducers } from 'redux'
import { ADD_BULLETIN, FETCH_BULLETIN,DELETE_BULLETIN,CHANGE_BULLETIN_STATE,
    GET_BULLETIN_DETAIL,UPDATE_BULLETIN,FETCH_BULLETIN_PAGES} from '../../actions/bulletin/actions.js'

function manageBulletin(state = [], action) {
    switch (action.type) {
        case FETCH_BULLETIN:
            return action.lists;
        //case ADD_BULLETIN:
        //    return [...state, {id:state[state.length-1].id+1,title:action.data.title,
        //        summary:action.data.summary,author:action.data.author,time:action.time,updateTime:action.time,useable:1}];
        //case UPDATE_BULLETIN:
        //    return [...state.slice(0,action.index),
        //        Object.assign({},state[action.index],{title:action.data.title, summary:action.data.summary,
        //            author:action.data.author,updateTime:action.time}),
        //        ...state.slice(action.index + 1)
        //    ];
        case DELETE_BULLETIN:
            return[
                ...state.slice(0, action.index),
                ...state.slice(action.index + 1)
            ];
        case CHANGE_BULLETIN_STATE:
            return[...state.slice(0, action.index),
                Object.assign({},state[action.index],{useable:action.state ==1?2:1}),
                ...state.slice(action.index + 1)
            ]
        default:
            return state
    }
}
function bulletinDetail(state={},action){
    switch(action.type){
        case GET_BULLETIN_DETAIL:
            return action.detail;
        default:
            return state
    }
}
function bulletinPages(state=0,action){
    switch(action.type){
        case FETCH_BULLETIN_PAGES:
            return action.page;
        default:
            return state
    }
}

export const bulletin = combineReducers({
    manageBulletin,
    bulletinDetail,
    bulletinPages
});

export default bulletin
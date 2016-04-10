/**
 * Created by caoshuai on 2016/4/4.
 */

//import {url} from '../../javascripts/conf.js'
export const GET_STORELIST = 'GET_STORELIST';

export const GET_SLIDERLIST = 'GET_SLIDERLIST';
export const GET_PRODUCTLIST = 'GET_PRODUCTLIST';
export const GET_FOODLIST = 'GET_FOODLIST';
export const GET_ADLIST = 'GET_ADLIST';
export const GET_BULLETIN ='GET_BULLETIN';
export const REQUEST_LISTS = 'REQUEST_LISTS';
export const GET_ALL_BULLETIN = 'GET_ALL_BULLETIN';


function getStoreList(list) {
    return {
        type: GET_STORELIST,
        list:list
    }
}
function getSliderList(json) {
    return {
        type: GET_SLIDERLIST,
        lists:json.result
    }
}

function getProductList(json) {
    return {
        type: GET_PRODUCTLIST,
        lists:json
    }
}

function getFoodList(json) {
    return {
        type: GET_FOODLIST,
        lists:json
    }
}

function getAdList(json){

    return {
        type: GET_ADLIST,
        lists:json.result
    }
}
function getBulletin(json){
    return{
        type:GET_BULLETIN,
        lists:json.result
    }
}
function getAllBulletin(json){
    return{
        type:GET_ALL_BULLETIN,
        lists:json.result
    }
}
function requestLists(){
    return {
        type: REQUEST_LISTS
    }
}

function fetchALists() {
    return dispatch => {
        //console.log("start fetch");
        //return fetch('/facew/assemble/getassemble')
        //    .then( function(response){
        //        return response.json();
        //    }).then(function(json){
        //        //console.log("!!!!!!!!!!!!!!!!!!!!!!!!"+JSON.stringify(json));
        //        if(json.errCode ==0){
        //            dispatch(getAdList(json));
        //        }
        //    }).catch(e => console.log('error = ' + e));
    }
}





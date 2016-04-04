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
        console.log("start fetch");
        return fetch('/facew/assemble/getassemble')
            .then( function(response){
                return response.json();
            }).then(function(json){
                //console.log("!!!!!!!!!!!!!!!!!!!!!!!!"+JSON.stringify(json));
                if(json.errCode ==0){
                    dispatch(getAdList(json));
                }
            }).catch(e => console.log('error = ' + e));
    }
}

function fetchSLists() {
    return dispatch => {
        fetch('/facew/recommendation/get')
            .then(response=>response.json())
            .then(list=> {
                if(list.errCode ==0){
                    dispatch(getStoreList(list.result));}
            })
    }
}

function fetchPLists(){
    return dispatch=>{
        var productList =new Array(1);
        ajaxGet(url+'/bazaar/mallcategory/getCategories', function(res){
            dispatch(getProductList(res.class_1));
        });
    }
}
function fetchFoodLists(){
    return dispatch =>{
        //console.log("start fetchFoodLists");
        var foodList = [];
        ajaxGet(url+'/miami/customer/store/listForHome?sort=1', function(res){
            foodList.push(res);
            console.log("%%%%%%%%%%%" + JSON.stringify(foodList));
        });
        ///couponz/api/getStoreCouponList
        ajaxGet(url+'/miami/customer/store/listForHome?sort=1', function(res){
            foodList.push(res);
            console.log("%%%%%%%%%%%/couponz/api/getStoreCouponList" + JSON.stringify(foodList));
        });
        dispatch(getFoodList(foodList))
    }
}

function sliderList(){
    return dispatch=>{
        //console.log("start sliderLists");
        return fetch('/facew/carousel/get?picType=1')
            .then( function(response){
                return response.json();
            }).then(function(json){
                //console.log("sliderjson = "+JSON.stringify(json));
                if(json.errCode ==0){
                    dispatch(getSliderList(json));}
            }).catch(e => console.log('error = ' + e));
    }
}
function fetchBulletinLists(){
    return dispatch=>{
        //console.log("start fetchBulletinLists");
        return fetch('/facew/QuickNews/getFive')
            .then( function(response){
                return response.json();
            }).then(function(json){
                //console.log("bulletinlistjson = "+JSON.stringify(json));
                if(json.errCode ==0){
                    dispatch(getBulletin(json));}
            }).catch(e => console.log('fetchBulletinListsError = ' + e));
    }
}


function fetchLists(){
    return dispatch =>{
        dispatch(requestLists());
        dispatch(fetchALists());
        dispatch(fetchSLists());
        dispatch(fetchPLists());
        dispatch(fetchFoodLists());
        dispatch(sliderList());
        dispatch(fetchBulletinLists());
    }
}
function shouldFetchLists(state) {
    console.log("shouldFetchLists");
    const lists = state.getLists;
    console.log("lists = "+lists.storeList);
    if((!lists.storeList)||(!lists.productList)||(!lists.adverList))
        return true;
    else return lists.isFetching;
}
export function fetchListsIfNeeded() {
    return (dispatch, getState) => {
        if (shouldFetchLists(getState())) {
            console.log("fetchListsIfNeeded");
            return dispatch(fetchLists())
        }
    }
}




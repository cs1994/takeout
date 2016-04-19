/**
 * Created by caoshuai on 2016/4/16.
 */

export const GET_STORE_ADMIN = 'GET_STORE_ADMIN';
export const ADD_STORE_ADMIN = 'ADD_STORE_ADMIN';
export const CHANGE_STORE_ADMIN_STATE = 'CHANGE_STORE_ADMIN_STATE';
export const DELETE_STORE_ADMIN = 'DELETE_STORE_ADMIN';
export const GET_RESTAURANT_TAG = 'GET_RESTAURANT_TAG';
export const ADD_RESTAURANT_TAG = 'ADD_RESTAURANT_TAG';
export const UPDATE_RESTAURANT_TAG = 'UPDATE_RESTAURANT_TAG';
export const DELETE_RESTAURANT_TAG = 'DELETE_RESTAURANT_TAG';


function fetchStoreAdminList(list) {
    return {
        type: GET_STORE_ADMIN,
        list:list
    }
}
function addStoreAdmin(data,id,time){
    return{type: ADD_STORE_ADMIN,data:data,id:id,time:time}
}
function changeStoreAdminState(index,state){
    return{type:CHANGE_STORE_ADMIN_STATE,index:index,state:state}
}
function deleteStoreAdmin(index){
    return{type:DELETE_STORE_ADMIN,index:index}
}
function fetchClassifyList(list) {
    return {
        type: GET_RESTAURANT_TAG,
        list:list
    }
}
function addRestaurantTag(data,id){
    return{type:ADD_RESTAURANT_TAG,data:data,id:id}
}
function updateResTag(data,index){
    return{type:UPDATE_RESTAURANT_TAG,data:data,index:index}
}
function deleteResTag(index){
    return{type:DELETE_RESTAURANT_TAG,index:index}
}

export function fetchStoreAdminLists(page) {
    return dispatch => {
        return fetch('/admin/manager/u/list?page='+page,{
            credentials:'include'})
            .then( function(response){
                return response.json();
            }).then(function(json){
                //console.log("!!!!!!!!!!!!!!!!!!!!!!!!"+JSON.stringify(json));
                if(json.errCode ==0){
                    console.log("################### " +JSON.stringify(json.list))
                    dispatch(fetchStoreAdminList(json.list));
                }
            }).catch(e => console.log('error = ' + e));
    }
}
export const addRestaurantUsers =(data,self)=>{
    return dispatch => {
        return fetch('/admin/manager/u/add', {
            credentials:'include',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method:'POST',
            body:JSON.stringify(data)
        })
            .then( function(response){
                return response.json();
            }).then(function(json){
                //console.log("!!!!!!!!!!!!!!!!!!!!!!!!"+JSON.stringify(json));
                if(json.errCode ==0){
                    //console.log("################### " +JSON.stringify(json))
                    //dispatch(getAdList(json));
                    dispatch(addStoreAdmin(data,json.id,Date.parse(new Date())))
                    self.refs.addStoreUser.close();
                }
            }).catch(e => console.log('error = ' + e));
    }
}
export const changeResUserState=(id,index,state)=>{
    return dispatch => {
        return fetch('/admin/manager/u/state/change?id='+id+"&state="+state,{credentials:'include'})
            .then( function(response){
                return response.json();
            }).then(function(json){
                if(json.errCode ==0){
                    dispatch(changeStoreAdminState(index,state))
                }
            }).catch(e => console.log('error = ' + e));
    }
}
export const deleteResUser=(id,index)=>{
    return dispatch=>{
        return fetch('/admin/manager/u/delete?id='+id,{credentials:'include'})
            .then( function(response){
                return response.json();
            }).then(function(json){
                if(json.errCode ==0){
                    dispatch(deleteStoreAdmin(index));
                }
            }).catch(e => console.log('error = ' + e));
    }
}

export const fetchAllFoodClassify = ()=>{
    return dispatch => {
        return fetch('/admin/manager/classify/list',{
            credentials:'include'})
            .then( function(response){
                return response.json();
            }).then(function(json){
                //console.log("!!!!!!!!!!!!!!!!!!!!!!!!"+JSON.stringify(json));
                if(json.errCode ==0){
                    console.log("################### " +JSON.stringify(json.result))
                    dispatch(fetchClassifyList(json.result));
                }
            }).catch(e => console.log('error = ' + e));
    }
}
export const addFoodClassify =(data,self)=>{
    return dispatch => {
        return fetch('/admin/manager/classify/add', {
            credentials:'include',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method:'POST',
            body:JSON.stringify(data)
        })
            .then( function(response){
                return response.json();
            }).then(function(json){
                //console.log("!!!!!!!!!!!!!!!!!!!!!!!!"+JSON.stringify(json));
                if(json.errCode ==0){
                    //console.log("################### " +JSON.stringify(json))
                    dispatch(addRestaurantTag(data,json.id));
                    self.refs.addStoreClassify.close();
                }
            }).catch(e => console.log('error = ' + e));
    }
}

export const updateFoodClassify =(data,id,index,self)=>{
    return dispatch=>{
        return fetch('/admin/manager/classify/update?id='+id, {
            credentials:'include',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method:'POST',
            body:JSON.stringify(data)
        })
            .then( function(response){
                return response.json();
            }).then(function(json){
                //console.log("!!!!!!!!!!!!!!!!!!!!!!!!"+JSON.stringify(json));
                if(json.errCode ==0){
                    //console.log("################### " +JSON.stringify(json))
                    dispatch(updateResTag(data,index));
                    self.refs.addStoreClassify.close();
                }
            }).catch(e => console.log('error = ' + e));
    }
}
export const deleteFoodClassify=(id,index)=>{
    return dispatch=>{
        return fetch('/admin/manager/classify/delete?id='+id,{credentials:'include'})
            .then( function(response){
                return response.json();
            }).then(function(json){
                if(json.errCode ==0){
                    dispatch(deleteResTag(index));
                }
            }).catch(e => console.log('error = ' + e));
    }
}







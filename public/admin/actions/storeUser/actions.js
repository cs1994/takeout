/**
 * Created by caoshuai on 2016/4/16.
 */

export const GET_STORE_ADMIN = 'GET_STORE_ADMIN';
export const GET_RESTAURANT_TAG = 'GET_RESTAURANT_TAG';


function fetchStoreAdminList(list) {
    return {
        type: GET_STORE_ADMIN,
        list:list
    }
}
function fetchClassifyList(list) {
    return {
        type: GET_RESTAURANT_TAG,
        list:list
    }
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
                    self.refs.addStoreUser.close();
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
export const addFoodClassifys =(data,self)=>{
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
                    //dispatch(getAdList(json));
                    self.refs.addStoreClassify.close();
                }
            }).catch(e => console.log('error = ' + e));
    }
}






/**
 * Created by caoshuai on 2016/4/16.
 */

export const GET_STORE_ADMIN = 'GET_STORE_ADMIN';


function fetchStoreAdminList(list) {
    return {
        type: GET_STORE_ADMIN,
        list:list
    }
}
function getSliderList(json) {
    return {
        type: GET_SLIDERLIST,
        lists:json.result
    }
}


export function fetchStoreAdminLists() {
    return dispatch => {
        return fetch('/admin/manager/u/list')
            .then( function(response){
                return response.json();
            }).then(function(json){
                //console.log("!!!!!!!!!!!!!!!!!!!!!!!!"+JSON.stringify(json));
                if(json.errCode ==0){
                    console.log("################### " +JSON.stringify(json))
                    dispatch(fetchStoreAdminList(json));
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
                    //dispatch(getAdList(json));
                    self.refs.addStoreUser.close();
                }
            }).catch(e => console.log('error = ' + e));
    }
}





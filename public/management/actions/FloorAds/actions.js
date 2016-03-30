/**
 * Created by caoshuai on 2016/3/25.
 */

export const Fetch_ALL_CLASSIFY = "Fetch_ALL_CLASSIFY"
export const GET_LABELS = "GET_LABELS"
export const GET_ADS_BYCATEANDLABEL = "GET_ADS_BYCATEANDLABEL"
export const GET_ALL_ADS = "GET_ALL_ADS"
//export const ADD_ADS = "ADD_ADS"
export const UPDATE_ADS = "UPDATE_ADS"
export const DELETE_ADS = "DELETE_ADS"
export const GET_AD_DETAIL = "GET_AD_DETAIL"
export const GET_AD_PAGES = "GET_AD_PAGES"

const getAllAd=(data)=>{return{type:GET_ALL_ADS,data:data}}
const getAllClassify=(list)=>{return{type:Fetch_ALL_CLASSIFY,list:list}}
const getLabel = (index)=>{return{type:GET_LABELS,index:index}}
const getAdByCateAndLabel = (list)=>{return{type:GET_ADS_BYCATEANDLABEL,list:list}}
//const addAd =(data)=>{return{type:ADD_ADS,data:data}}
const updateAd =(data,index)=>{return{type:UPDATE_ADS,data:data,index:index}}
const deleteAd =(index)=>{return{type:DELETE_ADS,index:index}}
const getAdDetail=(data)=>{return{type:GET_AD_DETAIL,data:data}}
const getAdPage=(page)=>{return{type:GET_AD_PAGES,page:page}}

export const getAllAds=(page)=>{
    return (dispatch)=>{
        return fetch('/facew/advertisement/get?page='+page+"&contentNum=6")
            .then(response=>response.json())
            .then(function(json){
                if(json.errCode ==0){
                    //console.log("#######getAllAds " +JSON.stringify(json.result))
                    dispatch(getAllAd(json.result))
                }
            })
    }
}
export const getAllClassifys=()=>{
    return (dispatch)=>{
        return fetch('/facew/assemble/getCategoryAndLabel')
            .then(response=>response.json())
            .then(function(json){
                if(json.errCode ==0){
                    //console.log("#######getAllClassify " +JSON.stringify(json.result))
                    dispatch(getAllClassify(json.result))
                }
            })
    }
}
export const getLabels = (index)=>{
    return (dispatch)=>{
        console.log("getLabels " + index)
        dispatch(getLabel(index))
    }
}
export const getAdsByCateAndLabel=(cId,lId)=>{
    return (dispatch)=>{
        //console.log("@@@@@@@@@@@@@@@@getAdsByCateAndLabel " + cId + "#"+ lId)
        return fetch('/facew/assemble/getAdsByCateAndLabel?cId='+cId+'&lId='+lId)
            .then(response=>response.json())
            .then(function(json){
                //if(json.errCode ==0){
                const result = json.result?json.result:[]
                    //console.log("#######getAdsByCateAndLabel " +JSON.stringify(result))
                    dispatch(getAdByCateAndLabel(result))
                //}
            })
    }
}

export const addAds=(data)=>{
    return (dispatch)=>{
        ajaxPost("/facew/advertisement/add", data, function(res){
            //console.log("@@@@@@@addAds " + JSON.stringify(res));
            toastr.success("添加成功");
            //dispatch(addAd(data));
            location.href = "/facew/manage#/floorads";
        });
    }
}
export const deleteAds=(id,index)=>{
    return (dispatch)=>{
        return fetch('/facew/advertisement/delete?id='+id)
            .then(response=>response.json())
            .then(function(json){
                if(json.errCode ==0){
                dispatch(deleteAd(index))
                }
            })
    }
}
export const updateAds=(id,data,index)=>{
    return (dispatch)=>{
        //console.log("@@@@@@@updateAds##### " + JSON.stringify(data));
        ajaxJsonPost("/facew/advertisement/update", data, function(res){
            console.log("@@@@@@@updateAds " + JSON.stringify(res));
            toastr.success("更新成功");
            //dispatch(updateAd(data,index));
            location.href = "/facew/manage#/floorads";
        });
    }
}
export const getAdDetails=(id)=>{
    return (dispatch)=>{
        fetch('/facew/advertisement/getById?id='+id)
            .then(response=>response.json())
            .then(function(json){
                if(json.errCode ==0){
                    //console.log("#########getAdDetails"+JSON.stringify(json.result));
                    dispatch(getAdDetail(json.result))
                }
            })
    }
}
export const getAdPages=()=>{
    return (dispatch)=>{
        fetch('/facew/advertisement/pageNumGet?contentNum=6')
            .then(response=>response.json())
            .then(function(json){
                if(json.errCode ==0){
                    //console.log("#########getAdDetails"+JSON.stringify(json.result));
                    dispatch(getAdPage(json.result))
                }
            })
    }
}
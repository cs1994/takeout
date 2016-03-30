/**
 * Created by caoshuai on 2016/3/23.
 */

export const FETCH_CLASSIFY = 'FETCH_CLASSIFY';
export const GET_NOW_CLASSIFY = 'GET_NOW_CLASSIFY';
//export const FETCH_ALL_FIRST_CLASSIFY = 'FETCH_FIRST_CLASSIFY';
export const ADD_LABEL = 'ADD_LABEL';
export const DELETE_LABEL = 'DELETE_LABEL';
export const ADD_BRAND = 'ADD_BRAND';
export const DELETE_BRAND = 'DELETE_BRAND';
export const UPDATE_LABEL = 'UPDATE_LABEL';
export const UPDATE_BRAND = 'UPDATE_BRAND';
export const ADD_CLASSIFY = "ADD_CLASSIFY";
export const DELETE_CLASSIFY = "DELETE_CLASSIFY";
export const FETCH_CLASSIFY_DETAIL = 'FETCH_CLASSIFY_DETAIL';

const fetchClassify = (list)=>{return {type:FETCH_CLASSIFY,list:list}}
const getNowClassify =(index)=>{return{type:GET_NOW_CLASSIFY,index:index}}
//const getAllClassify = (list)=>{return{type:FETCH_ALL_FIRST_CLASSIFY,list:list}}
const addLabel = (data,id)=>{return {type:ADD_LABEL,data:data,id:id}}
const deleteLabel =(index)=>{return {type:DELETE_LABEL,index:index}}
const addBrand = (data,id)=>{return {type:ADD_BRAND,data:data,id:id}}
const deleteBrand = (index)=>{return {type:DELETE_BRAND,index:index}}
const updateLabel = (index,data)=>{return {type:UPDATE_LABEL,index:index,data:data}}
const updateBrand = (index,data)=>{return {type:UPDATE_BRAND,index:index,data:data}}
//const addClassify = (data,nameCh,nameEn)=>{return {type:ADD_CLASSIFY,data:data,nameCh:nameCh,nameEn:nameEn}}
const deleteClassify = (index)=>{return {type:DELETE_CLASSIFY,index:index}}
const getClassifyDetail =(data)=>{return{type:FETCH_CLASSIFY_DETAIL,data:data}}

export const fetchClassifys =()=>{
    return (dispatch)=>{
        return fetch('/facew/assemble/getCategoryAssem')
            .then(response=>response.json())
            .then(function(json){
                //console.log("fetchClassify##### " + JSON.stringify(json))
                if(json.errCode ==0){
                    dispatch(fetchClassify(json.result))
                }
            })
    }
}
export const getNowClassifys =(index)=>{
    return (dispatch)=>{
        return     dispatch(getNowClassify(index))
    }
}
//export const fetchAllFirstClassify =()=>{
//    return (dispatch)=>{
//        return fetch('/facew/ctegory/get')
//            .then(response=>response.json())
//            .then(function(json){
//                //console.log("fetchAllFirstClassify##### " + JSON.stringify(json))
//                if(json.errCode ==0){
//                    dispatch(getAllClassify(json.result))
//                }
//            })
//    }
//}

export const addLabels =(data)=>{
    return (dispatch)=>{
        ajaxPost("/facew/label/add",data,function(res){
            console.log("addLabels "+JSON.stringify(res))
            dispatch(addLabel(data,res.id));
            $("#myModalLabel").css({'display':"none"});
            //console.log("addLabels!! " + JSON.stringify(res))
        })
    }
}
export const deleteLabels =(id,index)=>{
   return (dispatch)=>{
       return fetch('/facew/label/delete?id='+id)
           .then(response=>response.json())
           .then(function(json){
               //console.log("fetchAllFirstClassify##### " + JSON.stringify(json))
               if(json.errCode ==0){
                   dispatch(deleteLabel(index))
               }
           })
   }
}
export const addBrands =(data)=>{
    return (dispatch)=>{
        ajaxPost("/facew/SpecificType/add",data,function(res){
            dispatch(addBrand(data,res.id))
            $("#myModalBrand").css({'display':"none"});
            //console.log("addLabels!! " + JSON.stringify(res))
        })
    }
}
export const deleteBrands =(id,index)=>{
    return (dispatch)=>{
        return fetch('/facew/SpecificType/delete?id='+id)
            .then(response=>response.json())
            .then(function(json){
                //console.log("fetchAllFirstClassify##### " + JSON.stringify(json))
                if(json.errCode ==0){
                    dispatch(deleteBrand(index))
                }
            })
    }
}
export const updateLabels =(id,data,index)=>{
    return (dispatch)=>{
        //dispatch(updateLabel(index,data));
        //console.log("################### " +JSON.stringify(data))
        //$("#myModalLabel").css({'display':"none"});
        ajaxPost("/facew/label/update?id="+id,data,function(res){
            dispatch(updateLabel(index,data));
            $("#myModalLabel").css({'display':"none"});
            toastr.success("修改成功");
            console.log("updateLabels " + JSON.stringify(res))
        })
    }
}
export const updateBrands =(id,data,index)=>{
    return (dispatch)=>{
        ajaxPost("/facew/SpecificType/update?id="+id,data,function(res){
            dispatch(updateBrand(index,data));
            $("#myModalBrand").css({'display':"none"});
            toastr.success("修改成功");
            //console.log("addLabels!! " + JSON.stringify(res))
        })
    }
}
export const addClassifys =(data)=>{
    return (dispatch)=>{
        ajaxPost("/facew/ctegory/add", data, function(res){
            console.log("@@@@@@@addClassify " + JSON.stringify(res));
            toastr.success("添加成功");
            //dispatch(addClassify(data,nameCh,nameEn));
            location.href = "/facew/manage#/classify";
        });
    }
}
export const deleteClassifys = (id,index)=>{
    return (dispatch)=>{
        return fetch('/facew/ctegory/delete?id='+id)
            .then(response=>response.json())
            .then(function(json){
                if(json.errCode ==0){
                    dispatch(deleteClassify(index))
                }
            })
    }
}
export const getClassifyDetails=(id)=>{
    return (dispatch)=>{
        return fetch('/facew/ctegory/getById?id='+id)
            .then(response=>response.json())
            .then(function(json){
                if(json.errCode ==0){
                    console.log("#######getClassifyDetails " +JSON.stringify(json))
                    dispatch(getClassifyDetail(json.result[0]))
                }
            })
    }
}
export const updateClassifys =(id,data)=>{
    return  (dispatch)=>{ajaxPost("/facew/ctegory/changeContent?id="+id, data, function(res){
        console.log("@@@@@@@updateClassify " + JSON.stringify(res));
        toastr.success("修改成功");
        //dispatch(addClassify(data,nameCh,nameEn));
        location.href = "/facew/manage#/classify";
    });}
}
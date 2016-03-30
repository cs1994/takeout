/**
 * Created by caoshuai on 2016/3/20.
 */
/*
 * action 类型
 */

export const ADD_BULLETIN = 'ADD_BULLETIN';
export const UPDATE_BULLETIN = 'UPDATE_BULLETIN';
export const FETCH_BULLETIN = 'FETCH_BULLETIN';
export const DELETE_BULLETIN ="DELETE_BULLETIN";
export const CHANGE_BULLETIN_STATE ="CHANGE_BULLETIN_STATE";
export const GET_BULLETIN_DETAIL ="GET_BULLETIN_DETAIL";
export const FETCH_BULLETIN_PAGES = "FETCH_BULLETIN_PAGES";
export const CHANGE_BULLETIN_PAGES = "CHANGE_BULLETIN_PAGES";

/*
 * action 创建函数
 */

function getNowFormatDate() {
    var date = new Date();
    var seperator = "/";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentDate = date.getFullYear() + seperator + month + seperator + strDate
    return currentDate;
}
const requestBulletins  =()=> {
    return { type: ADD_BULLETIN}
};
const receiveBulletin = (lists)=>{
    return {type:FETCH_BULLETIN,lists:lists.result }
};
const deleteBulletins = (index)=>{
    return {type: DELETE_BULLETIN,index:index}
};
//const addBulletins = (data,time)=>{
//    return{
//        type:ADD_BULLETIN,data:data,time:time}
//}
//const updateBulletins =(data,time,index) =>{
//    return{type:UPDATE_BULLETIN,data:data,time:time,index:index}
//}

const changeBulletinState = (index,state) =>{
    return{
        type:CHANGE_BULLETIN_STATE,index:index,state:state}
}
const getBulletinDetail =(detail) =>{
    return{type:GET_BULLETIN_DETAIL,detail:detail}
}
const getBulletinPage = (page)=>{
    //console.log("page##### " +page)
    return{type:FETCH_BULLETIN_PAGES,page:page}}
const changeBulletinPage = (page)=>{return{type:CHANGE_BULLETIN_PAGES,page:page}}

export const fetchBulletins= (page)=>{
    return (dispatch)=>{
        return fetch('/facew/QuickNews/getAll?page='+page+"&contentNum=2")
            .then(response=>response.json())
            .then(lists=>{
                if(lists.errCode ==0){
                    console.log("######Bulletins " + JSON.stringify(lists));
                    dispatch(receiveBulletin(lists))
                }
            })
    }
};
export const deleteBulletin=(id,index)=>{
    return (dispatch)=>{
        return fetch('/facew/QuickNews/delete?id='+id)
            .then(response=>response.json())
            .then(function(json){
                if(json.errCode ==0){
                    dispatch(deleteBulletins(index))
                }
            })
    }
};

export const addBulletin=(data)=>{
    return (dispatch)=>{
        //console.log("$$$$$$$$$$ " +JSON.stringify(data));
        ajaxPost("/facew/QuickNews/add", data, function(res){
            console.log("@@@@@@@addBulletin " + JSON.stringify(res));
            toastr.success("添加成功");
            //dispatch(addBulletins(data,getNowFormatDate()));
            location.href = "/facew/manage#/bulletin";
        });

    }
}
export const updateBulletin=(id,data,index)=>{
    return (dispatch)=>{
        //console.log("update@@@@@@@@@@@@@@@@@@@" + id)
        ajaxDataGet("/facew/QuickNews/update?id="+id, data, function(res){
            console.log("@@@@@@@addBulletin " + JSON.stringify(res));
            toastr.success("更新成功");
            //dispatch(updateBulletins(data,getNowFormatDate(),index));
            location.href = "/facew/manage#/bulletin";
        });
    }
}
export const changeBulletinStates = (id,state,i)=>{
    return (dispatch)=>{
        return fetch('/facew/QuickNews/changeUseable?id='+id+ "&useable=" + state)
            .then(response=>response.json())
            .then(function(json){
                console.log("changeBulletinStates " + JSON.stringify(json));
                if(json.errCode ==0){
                    dispatch(changeBulletinState(i,state));
                }
            })
    }
}
export const getBulletinDetails =(id)=>{
    return (dispatch)=>{
        return fetch("/facew/QuickNews/getById?id="+id)
            .then(response=>response.json())
            .then(function(json){
                console.log("getBulletinDetails " + JSON.stringify(json));
                if(json.errCode ==0){
                    dispatch(getBulletinDetail(json));
                }
            })
    }
}
export const getBulletinPages=()=>{
    return (dispatch)=>{
        return fetch("/facew/QuickNews/pageNumGet?contentNum=2")
                .then(response=>response.json())
                .then(function(json){
                    console.log("getBulletinPages " + JSON.stringify(json));
                    if(json.errCode ==0){
                        dispatch(getBulletinPage(parseInt(json.result)));
                    }
                })
    }
}
export const changeBulletinPages=()=>{
    return (dispatch)=>{

    }
}
/**
 * Created by caoshuai on 2016/3/30.
 */
export const ADD_RECOMMEND = 'ADD_RECOMMEND';
export const FETCH_RECOMMEND = 'FETCH_RECOMMEND';
export const DELETE_RECOMMEND ="DELETE_RECOMMEND";
export const UPDATE_RECOMMEND ="UPDATE_RECOMMEND";
export const CHANGE_RECOMMEND_ORDER ="CHANGE_RECOMMEND_ORDER";

/*
 * action 创建函数
 */

const addRecommends =(data,id)=> {
    return { type: ADD_RECOMMEND,data:data,id:id}
}
const receiveRecommend = (list)=>{
    return {type:FETCH_RECOMMEND,list:list }
}
const deleteRecommends = (index)=>{
    return {type: DELETE_RECOMMEND,index:index}
}
const updateRecommends =(data,index,id)=>{
    return{type:UPDATE_RECOMMEND,data:data,index:index,id:id}
}
const changeRecommendOrders = (index)=>{
    return{type:CHANGE_RECOMMEND_ORDER,index:index}
}

export const fetchRecommends= ()=>{
    return (dispatch)=>{
        return fetch('/facew/recommendation/get')
            .then(response=>response.json())
            .then(lists=>{
                //console.log("######recommendation " + JSON.stringify(lists));
                const list = lists.result == undefined ? []:lists.result
                dispatch(receiveRecommend(list))
                console.log("@@@@@@@@@@")
            })
    }
};
export const deleteRecommend=(id,index)=>{
    return (dispatch)=>{
        return fetch('/facew/recommendation/delete?id='+id)
            .then(response=>response.json())
            .then(function(json){
                if(json.errCode ==0){
                    dispatch(deleteRecommends(index))
                }
            })
    }
};
export const addRecommend=(data)=>{
    return (dispatch)=>{
        console.log("$$$$$$$$$$ " +JSON.stringify(data))
        ajaxPost("/facew/recommendation/add", data, function(res){
            toastr.success("添加成功");
            dispatch(addRecommends(data,res.id))
            $("#myModalStore").css({'display':"none"});
        });
    }
}
export const updateRecommend =(id,data,index)=>{
    return (dispatch)=>{
        console.log("!!!!!!!!!!!!!!!!!! @@@@@@@@@@@@ ")
        ajaxPost("/facew/carousel/updateWhole?id="+id, data, function(res){
            console.log("@@@@@@@SLIDER " + JSON.stringify(res));
            toastr.success("更新成功");
            dispatch(updateRecommends(data,index,id));
        });}
}
export const changeRecommendOrder =　(index,id,otherId) =>{
    return (dispatch) =>{
        return fetch('/facew/recommendation/update?id1='+id+ "&id2=" + otherId)
            .then(response=>response.json())
            .then(function(json){
                console.log("changeSliderOrders " + JSON.stringify(json));
                if(json.errCode ==0){
                    dispatch(changeRecommendOrders(index))
                }
            })
    }
}

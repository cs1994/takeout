/**
 * Created by jiye on 16/3/15.
 */
/*
 * action 类型
 */

export const ADD_SLIDER = 'ADD_SLIDER';
export const FETCH_SLIDER = 'FETCH_SLIDER';
export const DELETE_SLIDER ="DELETE_SLIDER";
export const CHANGE_SLIDER_ORDER ="CHANGE_SLIDER_ORDER";
export const GET_SLIDER_DETAIL ="GET_SLIDER_DETAIL";
/*
 * action 创建函数
 */

const requestSlider =()=> {
    return { type: ADD_SLIDER}
}
const receiveSlider = (lists)=>{
    return {type:FETCH_SLIDER,lists:lists.result }
}
const deleteSlider = (id)=>{
    return {type: DELETE_SLIDER,id:id}
}
const changeSliderOrder = (index)=>{
    return{type:CHANGE_SLIDER_ORDER,index:index}
}
const getSliderDetail =(detail)=>{
    return{type:GET_SLIDER_DETAIL,detail:detail}
}
export const fetchSliders= ()=>{
    return (dispatch)=>{
        return fetch('/facew/carousel/get?picType='+1)
            .then(response=>response.json())
            .then(lists=>{
                console.log("###### " + JSON.stringify(lists));
                dispatch(receiveSlider(lists))
            })
    }
};
export const deleteSliders=(id)=>{
    return (dispatch)=>{
        return fetch('/facew/carousel/delete?id='+id)
            .then(response=>response.json())
            .then(function(json){
                if(json.errCode ==0){
                    dispatch(fetchSliders())
                }
            })
    }
};
export const addSlider=(data)=>{
    return (dispatch)=>{
        console.log("$$$$$$$$$$ " +JSON.stringify(data))
        ajaxPost("/facew/carousel/add", data, function(res){
            //console.log("@@@@@@@ " + JSON.stringify(res));
            toastr.success("添加成功");
            //dispatch(fetchSliders());
            location.href = "#";
        });
        //return fetch('http://localhost:9000/facew/carousel/add',{method:'POST',body:data})
        //    .then(response=>response.json())
        //    .then(function(json){
        //        if(json.errcode ==0){
        //            console.log("@@@@@@@ " + JSON.stringify(json));
        //                toastr.success("添加成功");
        //                location.href = "#";
        //        }
        //    }
        //)
    }
}
export const updateSlider =(id,data,index)=>{
    return (dispatch)=>{
        console.log("!!!!!!!!!!!!!!!!!! @@@@@@@@@@@@ ")
        ajaxPost("/facew/carousel/updateWhole?id="+id, data, function(res){
        console.log("@@@@@@@SLIDER " + JSON.stringify(res));
        toastr.success("更新成功");
        //dispatch(fetchSliders());
        location.href = "#";
    });}
}
export const changeSliderOrders =　(index,id,otherId) =>{
    return (dispatch) =>{
        return fetch('/facew/carousel/update?id1='+id+ "&id2=" + otherId)
            .then(response=>response.json())
            .then(function(json){
                console.log("changeSliderOrders " + JSON.stringify(json));
                if(json.errCode ==0){
                    dispatch(changeSliderOrder(index))
                }
            })
    }
}
export const getSliderDetails = (id) =>{
    return(dispatch) =>{
        return fetch("/facew/carouselDetail/getById?id="+id)
            .then(response => response.json())
            .then(function(json){
                console.log("getSliderDETAIL " +JSON.stringify(json))
                if(json.errCode ==0){
                    dispatch(getSliderDetail(json.result))
                }
            })
    }
}
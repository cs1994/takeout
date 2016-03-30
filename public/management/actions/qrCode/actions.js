/**
 * Created by caoshuai on 2016/3/23.
 */

export const FETCH_QRCODE = 'FETCH_QRCODE';
export const CHANGE_QRCODE = 'CHANGE_QRCODE'


const fetchCode =(list)=>{
    return{type:FETCH_QRCODE,list:list}
}

const changeCode =(url,index)=>{
    return{type:CHANGE_QRCODE,url:url,index:index}
}

export const fetchCodes =()=>{
    return dispatch=>{
        return fetch('/facew/carousel/get?picType='+3)
            .then(response=>response.json())
            .then(list=>{
                console.log("######codeList " + JSON.stringify(list.result));
                dispatch(fetchCode(list.result))
            })
    }
}

//export const changeCodes =(id,url,index)=>{
//    return dispatch=>{
//        return fetch('/facew/carousel/updateWholeNew')
//            .then(response=>response.json())
//            .then(res=>{
//                console.log("###### " + JSON.stringify(res));
//                dispatch(changeCode(url,index))
//            })
//    }
//}
/**
 * Created by heben on 2015/12/12.
 */


function ajaxPost(url,postData,successFunc){
    $.ajax({
        url:url,
        dataType:'json',
        type:'POST',
        data:postData,
        success:function(data){
            var errCode=data.errCode;
            var msg=data.msg;
            if(errCode == 0){
                //alert("success");
                successFunc(data)
            }else{
                console.log("errCode = "+errCode+" msg = "+msg);
            }
        }.bind(this),
        error:function(xhr,status,err){
            // alert("error");
            console.log(xhr,status,err.toString());
            //toastr.error(err);
        }.bind(this)
    })
}

function ajaxJsonPost(url, postData, successFunc) {
    var sendData = JSON.stringify(postData);
    console.log("ajaxJsonPost: sendData=" + sendData);
    $.ajax({
        url: url,
        dataType: 'json',
        contentType: 'application/json',
        type: 'POST',
        data: sendData,
        success: function (data) {
            var errCode = data.errCode;
            var msg = data.msg;
            if (errCode != 0) {
                console.log('errCode=' + errCode + ', msg=' + msg);
                toastr.error(msg);
            } else {
                successFunc(data);
            }
        }.bind(this),
        error: function (xhr, status, err) {
            console.error(url, xhr, status, err.toString());
            //toastr.error(err);
        }.bind(this)
    });
}

function ajaxGet(url,successFunc){
    $.ajax({
        type:'GET',
        async: false,
        url:url,
        dataType : "jsonp",
        success:function(res){
            //res = JSON.parse(res);
            if(res.errCode == 0) successFunc(res);
            else {
                //toastr.error(res.errmsg);
                //Debugger.log("errcode: " + res.errcode + ", errmsg: " + res.errmsg);
            }

        }.bind(this),
        error:function(xhr,status,err){
            console.log("ajaxGet error ");
            console.log(xhr,status,err.toString());
        }.bind(this)
    })
}
function ajaxGetJson(url,successFunc){
    $.ajax({
        type:'GET',
        async: false,
        url:url,
        dataType : "json",
        success:function(res){
            //res = JSON.parse(res);
            if(res.errCode == 0) successFunc(res);
            else {
                //toastr.error(res.errmsg);
                //Debugger.log("errcode: " + res.errcode + ", errmsg: " + res.errmsg);
            }

        }.bind(this),
        error:function(xhr,status,err){
            console.log("ajaxGet error ");
            console.log(xhr,status,err.toString());
        }.bind(this)
    })
}


function ajaxDataGet(url,data,successFunc){
    $.ajax({
        url:url,
        dataType:'json',
        type:'POST',
        data:data,
        success:function(res){
            if(res.errCode == 0) successFunc(res);
            else {
                //toastr.error(res.errmsg);
                console.log("errcode: " + res.errCode + ", errmsg: " + res.errmsg);
            }

        }.bind(this),
        error:function(xhr,status,err){
            console.log(xhr,status,err.toString());
        }.bind(this)
    })
}
/**
 * Created by caoshuai on 2016/4/10.
 */

//邮箱验证
export const isEmail=(str) =>{
    //var emailPtr = /^[a-z0-9][a-z0-9._-]{2,}@neotel\.com\.cn$/i;
    var emailPtr = /^([a-zA-Z0-9]+[._-]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[._-]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    return emailPtr.test(str);
};

//强密码验证
export const isStrongPassword = (str)=> {
    var reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
    return reg.test(str);
};

export const timeFormat = (timeNum)=>{
    var format = function(time,format){
        var t = new Date(time);
        var tf = function(i){return (i < 10 ? '0' : '') + i};
        return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
            switch(a){
                case 'yyyy':
                    return tf(t.getFullYear());
                    break;
                case 'MM':
                    return tf(t.getMonth() + 1);
                    break;
                case 'mm':
                    return tf(t.getMinutes());
                    break;
                case 'dd':
                    return tf(t.getDate());
                    break;
                case 'HH':
                    return tf(t.getHours());
                    break;
                case 'ss':
                    return tf(t.getSeconds());
                    break;
            };
        });
    }

    return format(timeNum, 'yyyy-MM-dd HH:mm:ss');
};

export const isAllowedPic=(type, size)=>{
    var picTypes = { "image/jpeg": "", "image/jpg" : "", "image/png": "", "image/bmp": "", "image/gif": ""};
    return type.toLowerCase() in picTypes && size < 1024 * 1024; //pic size limited 1M
}

export function getFormJson(form) {
    var o = {};
    var a = $(form).serializeArray();
    //console.log(a);
    $.each(a, function () {
        if (o[this.name] !== undefined) {
            //console.log("无");
            //console.log(typeof(o[this.name]));

            if (!$.isArray(o[this.name])) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
}
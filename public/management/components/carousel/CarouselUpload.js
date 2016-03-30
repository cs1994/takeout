/**
 * Created by caoshuai on 2016/3/18.
 */
import { connect } from 'react-redux'
import React, { Component,PropTypes  } from 'react'
import {addSlider,getSliderDetails,updateSlider} from '../../actions/sliders/action.js'

export const picRoute = "http://10.1.29.250:30226/hestia/files/download/OnlyForTest/";

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

export function isAllowedPic(type, size){
    var picTypes = { "image/jpeg": "", "image/jpg" : "", "image/png": "", "image/bmp": "", "image/gif": ""};
    return type.toLowerCase() in picTypes && size < 1024 * 1024; //pic size limited 1M
}

export default class CarouselUpload extends Component {
    constructor(props) {
        super(props);
        this.handleClickSubmit= this.handleClickSubmit.bind(this);
    }
    componentWillMount(){
        //console.log("############## " + JSON.stringify(this.props.location.query));
        if(JSON.stringify(this.props.location.query) !="{}"){
            this.props.dispatch(getSliderDetails(this.props.location.query.cId))
        }
    }
    componentDidUpdate(){
        const {sliderDetail} = this.props;
        if(JSON.stringify(sliderDetail) != "{}"){
            //console.log("sliderDetail " + JSON.stringify(sliderDetail));
            $('#pic_url').attr("src", picRoute+sliderDetail.pictureUrl);
            $('#url').val(sliderDetail.url);
            $('#order').val(sliderDetail.order);
            $("#order").attr("disabled", true);
            $('#description').val(sliderDetail.description);
        }
    }
    handlePicFileChange(e){
        e.preventDefault();
        var files = $('#picURLInput')[0].files;
        var formData = new FormData();
        formData.append('imgFile', files[0]);
        if(files.length > 0 && isAllowedPic(files[0].type, files[0].size)){
            var url = "/facew/picture/upload";

            var success = function(res){
                //console.log(res);
                if(res.errCode == 0){
                    toastr.success("上传成功");
                    var newUrl = picRoute+res.result;
                    //this.setState({picUrl:res.result});
                    $('#pic_url').attr("src", newUrl);
                } else{
                    toastr.error(res.errmsg);
                }
            }.bind(this);

            $.ajax({
                url: url,
                type: 'POST',
                data: formData,
                processData: false,//用来回避jquery对formdata的默认序列化，XMLHttpRequest会对其进行正确处理
                contentType: false,//设为false才会获得正确的conten-Type
                async: true,
                success: success,
                error: function(xhr,status,err){
                    console.log(xhr,status,err.toString());
                    toastr.error(err);
                }

            });
        }
        else{
            toastr.warning("请选择大小在1M以内的图片文件!!");
        }
    }
    handleClickSubmit(evt){
        evt.preventDefault();
        var formData = getFormJson($('#newDishForm')[0]);
        var url = $('#pic_url').attr("src");
        formData.pictureUrl = url.substring(url.lastIndexOf('/')+1);
        //console.log("@@@@@@@@@@@@@@" + url.substring(url.lastIndexOf('/')+1));
        formData.pictype = 1;
        //formData.oe = 1000001;
        if(formData.pictureUrl == "" || formData.url == "" || formData.order== ""){
            toastr.warning("必填项有空");
            return false;
        }
        if(JSON.stringify(this.props.location.query) !="{}"){
            formData.order = 1;
            console.log("@@@@@@@@@@@@@@@@@@@@@ " +JSON.stringify(formData));
            this.props.dispatch(updateSlider(this.props.location.query.cId,formData,1));
        }
        else
        this.props.dispatch(addSlider(formData))
    }
    render() {
        //const cId = this.props.location.query.cId;
        //console.log("ccccid " +cId);
        return (
            <div className="pageheader">
                <h2>
                    <i className="fa fa-tachometer"></i> 轮播图管理
                </h2>
                    <div className="tile-header">
                        <p>新建轮播图</p>
                        <form id="newDishForm">
                            <fieldset>
                                <div className="form-group">
                                    <label for="logo_url">广告图片(必填)({"<"}1M)</label>
                                    <input type="file" id="picURLInput" onChange={this.handlePicFileChange}/>
                                    <img id="pic_url" src="" alt="" width="100" height="100"/>
                                    <p className="help-block"></p>
                                </div>
                                <div className="form-group">
                                    <label for="url"> 跳转链接(必填,外域网址填以http/https开头的绝对网址)</label>
                                    <input type="text" className="form-control" id="url"
                                           name="url" placeholder=""/>
                                    <p className="help-block"></p>

                                </div>
                                <div className="form-group">
                                    <label for="order"> 出现顺序(必选)</label>
                                    <select className="form-control" name="order" id="order">
                                        <option value=""></option>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                        <option value={6}>6</option>
                                        <option value={7}>7</option>
                                        <option value={8}>8</option>
                                        <option value={9}>9</option>
                                        <option value={10}>10</option>
                                    </select>
                                    <p className="help-block"></p>

                                </div>
                                <div className="form-group">
                                    <label for="description"> 文字</label>
                                    <input type="text" className="form-control" id="description"
                                           name="description" maxLength="100" placeholder=""/>
                                    <p className="help-block"></p>

                                </div>

                                <button type="submit" className="btn btn-success btn-block"
                                        onClick={this.handleClickSubmit}>提交</button>
                            </fieldset>
                        </form>

                    </div>

            </div>
        );
    }
}
CarouselUpload.propTypes = {
    //query:PropTypes.object.isRequired,
    sliderList:PropTypes.array.isRequired,
    sliderDetail:PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};

function getSliderList(state){
    return{
        sliderList: state.manageSlider.sliderList?state.manageSlider.sliderList:[],
        sliderDetail:state.manageSlider.sliderDetail?state.manageSlider.sliderDetail:{}
    }
}
export default connect(getSliderList)(CarouselUpload)
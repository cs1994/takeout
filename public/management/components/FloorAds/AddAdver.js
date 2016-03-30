/**
 * Created by caoshuai on 2016/3/23.
 */

import { connect } from 'react-redux'
import { Link } from 'react-router'
import React, { Component,PropTypes  } from 'react'
import {isAllowedPic,getFormJson,picRoute} from "../carousel/CarouselUpload.js"
import {addAds,getAllClassifys,getLabels,updateAds,getAdDetails} from '../../actions/FloorAds/actions.js'

const contextTypes =  {
    router: React.PropTypes.object
};
export default class AddAdver extends Component {
    constructor(props) {
        super(props);
        this.handleClickSubmit=this.handleClickSubmit.bind(this);
        this.createUE=this.createUE.bind(this);
        this.destroyUE=this.destroyUE.bind(this);
        this.handleClickFirstCat=this.handleClickFirstCat.bind(this);
        this.handlePicFileChange=this.handlePicFileChange.bind(this);
    }
    componentDidMount(){
        this.createUE();
    }
    componentWillUnmount(){
        this.destroyUE();
    }
    componentWillMount(){
        this.props.dispatch(getAllClassifys())
        //console.log("############## " + JSON.stringify(this.props.location.query));
        if(JSON.stringify(this.props.location.query) !="{}"){
            const query = this.props.location.query
            this.props.dispatch(getAdDetails(query.adId))
        }
    }
    componentDidUpdate(){
        const {adDetail} = this.props;
        if(JSON.stringify(adDetail) != "{}"){
            console.log("!!!!!!!!!!adDetail " + JSON.stringify(adDetail))
            $('#first_cat_name').val(adDetail.category);
            this.handleClickFirstCat();
            $('#second_cat_name').val(adDetail.label);
            $('#aUrl').val(adDetail.url);
            $('#index').val(adDetail.order);
            $('#pic_url').attr("src",picRoute+adDetail.pictureUrl);
            $('#text_1').html(adDetail.title);
            $('#text_2').html(adDetail.description);
            $('#text_3').html(adDetail.price);
        }
    }
    createUE(){
        const list = [1,2,3]
        $.map(list,function(l){
            var id="text_"+l
            UM.getEditor(id, {
                autoHeightEnabled: false,
                initialFrameHeight: 50,
                initialFrameWidth:900,
                imageMaxSize: 1024000,
                //toolbars: [
                //    [
                //        'undo', //撤销
                //        'redo', //重做
                //        'bold', //加粗
                //        'indent', //首行缩进
                //        'italic', //斜体
                //        'underline', //下划线
                //        'strikethrough', //删除线
                //        'fontborder', //字符边框
                //        'selectall', //全选
                //        'cleardoc', //清空文档
                //        'link', //超链接
                //        'justifyleft', //居左对齐
                //        'justifyright', //居右对齐
                //        'justifycenter', //居中对齐
                //        'justifyjustify', //两端对齐
                //        'forecolor', //字体颜色
                //        'backcolor', //背景色
                //        'lineheight', //行间距
                //        //'edittip ', //编辑提示
                //        //'customstyle', //自定义标题
                //        //'autotypeset', //自动排版
                //        'fontfamily', //字体
                //        'fontsize', //字号
                //        'touppercase', //字母大写
                //        'tolowercase', //字母小写
                //
                //    ]
                //
                //]
            });
        })
    }

    destroyUE(){
        const list = [1,2,3]
        $.map(list,function(l){
            var id="text_"+l
            UM.getEditor(id).destroy();
        })
    }
    handleClickFirstCat(){
        var id = $('#first_cat_name').val();
        if(id == "") return;
        const index =$('#first_cat_name').find("option:selected").attr('title');
        if(id !=-1&& id!=undefined) {
            //$('#second_cat_name').css({display: 'inline'});
            this.props.dispatch(getLabels(index))
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
    handleClickSubmit(e){
        e.preventDefault();
        const cId= $('#first_cat_name').val();
        const lId= $('#second_cat_name').val();
        var url = $('#pic_url').attr("src");
        const pictureUrl = url.substring(url.lastIndexOf('/')+1);
        var aUrl = $('#aUrl').val().trim();
        var index = $('#index').val();
        var content_1 = UM.getEditor("text_1").getContent();
        var content_2 = UM.getEditor("text_2").getContent();
        var content_3 = UM.getEditor("text_3").getContent();
        if(pictureUrl == "" || aUrl == "" || index == ""){
            toastr.warning("必填项有空,请检查");
            return;
        }
        var postData = {pictureUrl:pictureUrl,url:aUrl,title:content_1,description:content_2,price:content_3,
            category:parseInt(cId),label:parseInt(lId),specificType:0,order:parseInt(index)};
        if(JSON.stringify(this.props.location.query) !="{}"){
            const query = this.props.location.query
            var data = Object.assign({},postData,{id:parseInt(query.adId)})
            this.props.dispatch(updateAds(query.adId,data,query.index))
        }
        else this.props.dispatch(addAds(postData));
    }
    render() {
        const {classifyList,labelList}=this.props;
        return (
            <div style={{marginTop:"10px"}}>
                <h2 className="uploadButton">
                    <div className="btn btn-success" >
                        <i className="fa fa-plus"></i>
                        <Link to="/floorads">返回</Link>
                    </div>
                </h2>
                <form id="newDishForm">
                    <fieldset>
                        <div id="legend" className="">
                            <legend className="">{
                                //this.props.params.adId > -1
                                1==1    ? "修改广告位" : "新建广告位"}</legend>
                        </div>
                        <div className="form-group">
                            <label for="name_ch">所属分类(两级,必选)</label>
                            <div className="form-group">
                                <select className="form-control" name="first_cat_name" id="first_cat_name" onChange={this.handleClickFirstCat} style={{maxWidth: '10em',display: 'inline'}}>
                                    <option value="-1" data-toggle="tooltip" data-placement="top" title=""></option>
                                    { classifyList.map(function(s,i){
                                        return <option value={s.categoryId} data-toggle="tooltip" data-placement="top" title={i}>{s.categoryName}</option>;
                                    })}
                                </select>
                                &nbsp;&nbsp;
                                <select className="form-control" name="second_cat_name" id="second_cat_name" style={{maxWidth: '10em', display: 'inline'}}>
                                    <option value={-1} data-toggle="tooltip" data-placement="top" title=""></option>;
                                    {labelList.map(function(s){
                                        return <option value={s.id} data-toggle="tooltip" data-placement="top" title={s.name}>{s.name}</option>;
                                    })
                                    }
                                </select>
                            </div>
                            <p className="help-block"></p>

                        </div>
                        <div className="form-group">
                            <label for="logo_url">广告位图片(必填)({"<"}1M)</label>
                            <input type="file" id="picURLInput" onChange={this.handlePicFileChange}/>
                            <img id="pic_url" src="" alt="" width="100" height="100"/>
                            <p className="help-block">此图将作为店铺的Logo</p>
                        </div>
                        <div className="form-group">
                            <label for="aUrl"> 跳转链接(必填,外域网址填以http/https开头的绝对网址)</label>
                            <input type="text" className="form-control" id="aUrl"
                                   name="aUrl" placeholder=""/>
                            <p className="help-block"></p>

                        </div>
                        <div className="form-group">
                            <label for="index"> 放置位置</label>
                            <select className="form-control" name="index" id="index">
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                            </select>
                            <img src="/assets/images/pchomefloorad/number.jpg" style={{width: '100%', border: '1px solid #ccc', marginTop: '10px'}} width="" height="" alt=""/>
                            <p className="help-block">位置序号如图</p>

                        </div>
                        <div className="form-group">
                            <label for="content">名称(必填)</label>
                            <script id="text_1" className="ueditor" name="content" type="text/plain">
                            </script>
                            <p className="help-block"></p>
                        </div>
                        <div className="form-group">
                            <label for="content">描述(必填)</label>
                            <script id="text_2" className="ueditor" name="content" type="text/plain">
                            </script>
                            <p className="help-block"></p>
                        </div>
                        <div className="form-group">
                            <label for="content">价格(必填)</label>
                            <script id="text_3" className="ueditor" name="content" type="text/plain">
                            </script>
                            <p className="help-block"></p>
                        </div>

                        <button type="submit" className="btn btn-success btn-block"
                                onClick={this.handleClickSubmit}>提交</button>
                    </fieldset>
                </form>

            </div>
        );
    }
}
AddAdver.contextTypes = contextTypes;
AddAdver.propTypes = {
    bulletinList:PropTypes.array.isRequired,
    adDetail: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};

function getClassifyList(state){
    return{
        classifyList: state.floorAds.classifyList?state.floorAds.classifyList:[],
        labelList: state.floorAds.labelList?state.floorAds.labelList:[],
        adDetail:state.floorAds.adDetail?state.floorAds.adDetail:{}
    }
}
export default connect(getClassifyList)(AddAdver)
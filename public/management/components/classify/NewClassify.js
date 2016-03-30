/**
 * Created by caoshuai on 2016/3/23.
 */

import { connect } from 'react-redux'
import { Link } from 'react-router'
import React, { Component,PropTypes  } from 'react'
import {isAllowedPic,getFormJson,picRoute} from "../carousel/CarouselUpload.js"
import {getClassifyDetails,updateClassifys,addClassifys} from "../../actions/classify/actions.js"

const contextTypes =  {
    router: React.PropTypes.object
};
export default class NewClassify extends Component {
    constructor(props) {
        super(props);
        this.handleClickSubmit=this.handleClickSubmit.bind(this);
    }
    componentWillMount(){
        //console.log("############## " + JSON.stringify(this.props.location.query));
        if(JSON.stringify(this.props.location.query) !="{}"){
            this.props.dispatch(getClassifyDetails(this.props.location.query.classifyId))
        }
    }
    componentDidUpdate(){
        const {classifyDetail} = this.props;
        if(JSON.stringify(classifyDetail) != "{}"){
            console.log("classifyDetail " + JSON.stringify(classifyDetail));
            $('#coverImg').attr("src", picRoute+classifyDetail.pictureUrl);
            $('#nameCh').val(classifyDetail.name);
            $('#nameEn').val(classifyDetail.englishName);
            $('#index').val(classifyDetail.order)
        }
    }

    handlePicFileChange(e){
        e.preventDefault();
        var files = $('#coverInput')[0].files;
        var formData = new FormData();
        formData.append('imgFile', files[0]);
        if(files.length > 0 && isAllowedPic(files[0].type, files[0].size)){
            var url = "/facew/picture/upload";

            var success = function(res){
                //console.log(res);
                if(res.errCode == 0){
                    toastr.success("上传成功");
                    var newUrl = picRoute+res.result;
                    $('#coverImg').attr("src", newUrl);
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
        const nameCh = $('#nameCh').val().trim();
        const nameEn = $('#nameEn').val().trim();
        const index = $('#index').val().trim();
        const name = nameCh+"#"+nameEn;
        var url = $('#coverImg').attr("src");
        const pictureUrl = url.substring(url.lastIndexOf('/')+1);
        if(nameCh == "" || pictureUrl == ""){
            toastr.warning("必填项有空,请检查");
            return;
        }
        var postData = {name: name,pictureUrl: pictureUrl,order:index};
        console.log("############postData " +JSON.stringify(postData));
        console.log("############postData "+JSON.stringify(this.props.location.query));
        if(JSON.stringify(this.props.location.query) !="{}"){
            const query = this.props.location.query;
            this.props.dispatch(updateClassifys(query.classifyId,postData))
        }
        else {
            console.log("############" +JSON.stringify(postData));
            this.props.dispatch(addClassifys(postData));
            }
    }
    render() {
        return (
            <div style={{marginTop:"10px"}}>
                <h2 className="uploadButton">
                    <div className="btn btn-success" >
                        <i className="fa fa-plus"></i>
                        <Link to="/classify">返回</Link>
                    </div>
                </h2>
                <form id="newCateForm">
                    <fieldset>
                        <div id="legend" className="">
                            <legend className="">{"新建类别"}</legend>
                        </div>
                        <div className="form-group">
                            <label for="nameCh"> 中文名称(必填)</label>
                            <input type="text" className="form-control" id="nameCh"
                                   name="nameCh" maxLength="100" placeholder=""/>
                            <p className="help-block"></p>
                        </div>
                        <div className="form-group">
                            <label for="nameEn"> 英文名称</label>
                            <input type="text" className="form-control" id="nameEn"
                                   name="nameEn" maxLength="100" placeholder=""/>
                            <p className="help-block"></p>

                        </div>
                        <div className="form-group">
                            <label for="coverInput">cover图片(必填)({"<"}1M)</label>
                            <input type="file" id="coverInput" onChange={this.handlePicFileChange}/>
                            <img id="coverImg" src="" alt="" width="200" height="100" style={{border:"1px solid #eee"}}/>
                            <p className="help-block">分类的cover图片(如pc/手机二级分类列表每个类别的背景图),推荐尺寸1000px*350px</p>
                        </div>

                        <div className="form-group">
                            <label for="index">顺序</label>
                            <input type="number" className="form-control" id="index"
                                   name="index" maxLength="10" placeholder=""/>
                            <p className="help-block">用于排序,序号越小,排序越靠前;如不填index值默认为100,</p>

                        </div>
                        <button type="submit" className="btn btn-success btn-block"
                                onClick={this.handleClickSubmit}>提交</button>
                    </fieldset>
                </form>
            </div>
        );
    }
}
NewClassify.contextTypes = contextTypes;
NewClassify.propTypes = {
    classifyDetail:PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};

function getClassifyDetail(state){
    return{
        classifyDetail:state.classifyList.classifyDetail?state.classifyList.classifyDetail:{}
    }
}
export default connect(getClassifyDetail)(NewClassify)